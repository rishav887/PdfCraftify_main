// Import necessary modules and libraries
import { db } from '@/db';
import { openai } from '@/lib/openai';
import { getPineconeClient } from '@/lib/pinecone';
import { SendMessageValidator } from '@/lib/validators/SendMessageValidator';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { NextRequest } from 'next/server';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Define a function to handle polling
const startPolling = async () => {
  const pollInterval = 5000; // 5 seconds interval

  const poll = async () => {
    try {
      // Make a request to the backend to check for updates
      const updates = await fetch('/api/checkUpdates').then((res) => res.json());

      // Process updates as needed
      console.log('Received updates:', updates);
    } catch (error) {
      console.error('Error while polling for updates:', error);
    }
  };

  // Start polling at the specified interval
  const pollingIntervalId = setInterval(poll, pollInterval);

  // Stop polling after a certain duration (e.g., 2 minutes)
  const pollingDuration = 240000; // 4 minutes (40 seconds * 6 intervals)
  setTimeout(() => clearInterval(pollingIntervalId), pollingDuration);
};

// Define the main serverless function
export const POST = async (req: NextRequest) => {
  // Extract the JSON body from the request
  const body = await req.json();

  // Get user information from the Kinde server session
  const { getUser } = getKindeServerSession();
  const user = getUser();

  // Extract user ID from the user information
  const { id: userId } = user;

  // Return unauthorized response if user ID is not available
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Parse the message and file ID from the request body
  const { fileId, message } = SendMessageValidator.parse(body);

  // Find the file in the database based on file ID and user ID
  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId,
    },
  });

  // Return not found response if the file is not found
  if (!file) {
    return new Response('Not found', { status: 404 });
  }

  // Create a new message entry in the database
  await db.message.create({
    data: {
      text: message,
      isUserMessage: true,
      userId,
      fileId,
    },
  });

  // Initialize OpenAI embeddings with the API key
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  // Get Pinecone client
  const pinecone = await getPineconeClient();

  // Create a Pinecone store from the existing index
  const pineconeIndex = pinecone.Index('craftinbox');
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    namespace: file.id,
  });

  // Perform similarity search using the message
  const results = await vectorStore.similaritySearch(message, 4);

  // Get previous messages from the database
  const prevMessages = await db.message.findMany({
    where: {
      fileId,
    },
    orderBy: {
      createdAt: 'asc',
    },
    take: 6,
  });

  // Format previous messages for inclusion in the OpenAI request
  const formattedPrevMessages = prevMessages.map((msg) => ({
    role: msg.isUserMessage ? ('user' as const) : ('assistant' as const),
    content: msg.text,
  }));

  // Create an OpenAI chat completions request
  const responsePromise = openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    stream: true,
    messages: [
      {
        role: 'system',
        content:
          'Use the following pieces of context (or previous conversation if needed) to answer concisely the users question in markdown format.',
      },
      {
        role: 'user',
        content: `Use the following pieces of context (or previous conversation if needed) to answer concisely the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.\n----------------\nPREVIOUS CONVERSATION:\n${formattedPrevMessages.map((message) => (message.role === 'user' ? `User: ${message.content}\n` : `Assistant: ${message.content}\n`)).join('')}\n----------------\nCONTEXT:\n${results.map((r) => r.pageContent).join('\n\n')}\nUSER INPUT: ${message}`,
      },
    ],
  });

  // Create a timeout promise for the OpenAI API request
  const timeoutPromise = new Promise<never>((_, reject) => {
    const timeoutDuration = 40000; // 40 seconds timeout
    setTimeout(() => {
      reject(new Error('OpenAI API request timed out'));
    }, timeoutDuration);
  });

  // Handle the OpenAI API request with streaming response
  try {
    const response = await Promise.race([responsePromise, timeoutPromise]);

    // Create an OpenAI stream for handling responses
    const stream = OpenAIStream(response, {
      async onCompletion(completion) {
        // Create a new message entry in the database for the assistant's response
        await db.message.create({
          data: {
            text: completion,
            isUserMessage: false,
            fileId,
            userId,
          },
        });
      },
    });

    // Return a streaming text response
    return new StreamingTextResponse(stream);
  } catch (error) {
    // Handle errors from the OpenAI API request
    console.error('OpenAI API request failed:', error);
    return new Response('Internal Server Error', { status: 500 });
  }

  // Handle other parts of your code here without any placeholders
};
