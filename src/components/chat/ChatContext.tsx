// Importing necessary dependencies
import { ReactNode, createContext, useRef, useState, useEffect } from 'react';
import { useToast } from '../ui/use-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { trpc } from '@/app/_trpc/client';
import { INFINITE_QUERY_LIMIT } from '@/config/infinite-query';

// Defining the structure of the context value
type StreamResponse = {
  addMessage: () => void;
  message: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
};

// Creating the context with default values
export const ChatContext = createContext<StreamResponse>({
  addMessage: () => {},
  message: '',
  handleInputChange: () => {},
  isLoading: false,
});

// Interface for component props
interface Props {
  fileId: string;
  children: ReactNode;
}

// Component responsible for managing the chat context
export const ChatContextProvider = ({ fileId, children }: Props) => {
  // State for the current message being typed
  const [message, setMessage] = useState<string>('');
  // State to track loading status
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Accessing utility functions from trpc
  const utils = trpc.useContext();

  // Toast utility for displaying messages
  const { toast } = useToast();

  // Ref for storing the backup message
  const backupMessage = useRef('');

  // Query to get file upload status
  const { data: uploadStatusData, refetch: refetchUploadStatus } = useQuery({
    queryKey: ['getFileUploadStatus', fileId],
    refetchOnWindowFocus: false,
  });

  // Query to get file messages with infinite loading
  const { data: fileMessagesData, refetch: refetchFileMessages } = useQuery({
    queryKey: ['getFileMessages', { fileId, limit: INFINITE_QUERY_LIMIT }],
    refetchOnWindowFocus: false,
  });

  // Function to manually trigger file messages polling
  const pollFileMessages = () => {
    refetchFileMessages();
  };

  // Polling interval in milliseconds (e.g., 5000ms or 5 seconds)
  const pollingInterval = 10000;

  // Setting up the polling interval effect
  useEffect(() => {
    const pollingIntervalId = setInterval(pollFileMessages, pollingInterval);

    // Clearing the interval on component unmount
    return () => {
      clearInterval(pollingIntervalId);
    };
  }, []);

  // Mutation for sending a new message with polling
  const { mutate: sendMessageWithPolling } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      // Sending a POST request to the server
      const response = await fetch('/api/message', {
        method: 'POST',
        body: JSON.stringify({
          fileId,
          message,
        }),
      });

      // Handling errors
      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      return response.body;
    },
    onMutate: async ({ message }) => {
      // Storing the backup message and clearing the input field
      backupMessage.current = message;
      setMessage('');

      // Canceling the ongoing file messages query
      await utils.getFileMessages.cancel();

      // Retrieving the previous messages for UI update
      const previousMessages = utils.getFileMessages.getInfiniteData();

      // Updating the local state optimistically
      utils.getFileMessages.setInfiniteData(
        { fileId, limit: INFINITE_QUERY_LIMIT },
        (old) => {
          if (!old) {
            return {
              pages: [],
              pageParams: [],
            };
          }

          let newPages = [...old.pages];
          let latestPage = newPages[0]!;

          latestPage.messages = [
            {
              createdAt: new Date().toISOString(),
              id: crypto.randomUUID(),
              text: message,
              isUserMessage: true,
            },
            ...latestPage.messages,
          ];

          newPages[0] = latestPage;

          return {
            ...old,
            pages: newPages,
          };
        }
      );

      // Setting loading state
      setIsLoading(true);

      // Returning previous messages for potential rollback
      return {
        previousMessages:
          previousMessages?.pages.flatMap(
            (page) => page.messages
          ) ?? [],
      };
    },
    onSuccess: async (stream) => {
      // Handling successful message sending
      setIsLoading(false);

      // Displaying an error message if the stream is not available
      if (!stream) {
        return toast({
          title: 'There was a problem sending this message',
          description: 'Please refresh this page and try again',
          variant: 'destructive',
        });
      }

      // Reading the stream data
      const reader = stream.getReader();
      const decoder = new TextDecoder();

      let accResponse = '';

      // Function to append received messages to UI
      const appendMessagesToUI = (text: string) => {
        utils.getFileMessages.setInfiniteData(
          { fileId, limit: INFINITE_QUERY_LIMIT },
          (old) => {
            if (!old) return { pages: [], pageParams: [] };

            let isAiResponseCreated = old.pages.some(
              (page) =>
                page.messages.some(
                  (message) => message.id === 'ai-response'
                )
            );

            let updatedPages = old.pages.map((page) => {
              if (page === old.pages[0]) {
                let updatedMessages;

                if (!isAiResponseCreated) {
                  updatedMessages = [
                    {
                      createdAt: new Date().toISOString(),
                      id: 'ai-response',
                      text,
                      isUserMessage: false,
                    },
                    ...page.messages,
                  ];
                } else {
                  updatedMessages = page.messages.map(
                    (message) => {
                      if (message.id === 'ai-response') {
                        return {
                          ...message,
                          text,
                        };
                      }
                      return message;
                    }
                  );
                }

                return {
                  ...page,
                  messages: updatedMessages,
                };
              }

              return page;
            });

            return { ...old, pages: updatedPages };
          }
        );
      };

      // Function to read a chunk of data from the stream
      const readChunk = async () => {
        let done = false;

        while (!done) {
          const { value, done: isDone } = await reader.read();

          done = isDone;

          if (!done) {
            const chunkValue = decoder.decode(value);
            accResponse += chunkValue;
            console.log('Received chunk:', accResponse);

            appendMessagesToUI(accResponse);
          }
        }

        console.log('Stream reading completed.');
        // Handle completion if needed
      };

      // Call the initial readChunk to start reading chunks
      await readChunk();
    },
    onError: (error, __, context) => {
      // Handling errors during mutation
      console.error('Error during mutation:', error);
      console.log('Previous messages:', context?.previousMessages);

      // Restoring the backup message and updating UI
      setMessage(backupMessage.current);
      utils.getFileMessages.setData(
        { fileId },
        { messages: context?.previousMessages ?? [] }
      );
    },
    onSettled: async () => {
      // Resetting loading state and invalidating the file messages query
      setIsLoading(false);

      await utils.getFileMessages.invalidate({ fileId });
    },
  });

  // Handler for updating the message input
  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(e.target.value);
  };

  // Handler for sending a message
  const handleSendMessage = () => {
    sendMessageWithPolling({ message });
  };

  // Providing the chat context value to the children components
  return (
    <ChatContext.Provider
      value={{
        addMessage: handleSendMessage,
        message,
        handleInputChange,
        isLoading,
      }}>
      {children}
    </ChatContext.Provider>
  );
};
