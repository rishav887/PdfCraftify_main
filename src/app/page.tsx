import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import Image from 'next/image'
import Footer from '@/components/Footer';
import { RegisterLink, getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Testimonials from '@/components/Testimonials'


export default function Home() {
  const { getUser } = getKindeServerSession()
  const user = getUser()
  return (
    <>
<MaxWidthWrapper className='max-w-8xl mx-auto inline-block items-center p-3 pt-0 lg:flex lg:flex-wrap lg:pt-4'>
  <div className="lg:w-1/2 lg:pr-8">
    <h1 className='max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl'>
      Engage in AI-powered conversation with any  {' '}
      <span className='text-blue-600'>PDF File!</span>{' '}
    </h1>
    <p className='mt-5 max-w-prose text-zinc-700 sm:text-lg'>
    AI-driven Converse2Pdf empowers you to turn static documents—such as business proposals, 
    academic research papers, technical manuals, product catalogs, 
    user manuals, marketing brochures, e-books, government documents—into dynamic conversations, 
    allowing you to inquire, summarize, discover, and explore.
    </p>
  </div>

  <div className="lg:w-1/2 lg:pl-8">
    <img src="/herox.jpg" alt="Hero Image" className="w-full h-auto" />
  </div>

  <div className="lg:w-1/2 mt-5 lg:mt-0">
    <p className='text-gray-700 font-semibold mb-4'>
      Discover the possibilities with documents.
    </p>

  
    {user ? (
  <Link
    href="/dashboard"
    className={buttonVariants({
      size: 'lg',
    })}
  >
    Dashboard
  </Link>
) : (
  <RegisterLink
    className={buttonVariants({
      size: 'lg',
    })}
  >
    Get started{' '}
  </RegisterLink>
)}


  </div>
</MaxWidthWrapper>


      {/* value proposition section */}
      <div>
        <div className='relative isolate'>
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            />
          </div>

          <div>
            <div className='mx-auto max-w-6xl px-6 lg:px-8'>
              <div className='mt-16 flow-root sm:mt-24'>
                <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                  <Image
                    src='/chat.jpg'
                    alt='product preview'
                    width={1364}
                    height={866}
                    quality={100}
                    className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
                  />
                </div>
              </div>
            </div>
          </div>


          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'
            />
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className='mx-auto mb-32 mt-32 max-w-5xl sm:mt-75'>
        <div className='mb-12 px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='mt-2 font-bold text-4xl text-gray-900 sm:text-5xl'>
            Start a conversation effortlessly with any PDF document.
            </h2>
            <p className='mt-4 text-lg text-gray-600'>
            Breathing life into static files, Converse2Pdf enables you to engage in interactive conversations, ask questions, 
            distill information, and explore the depths of your legal agreements and financial reports.
            </p>
          </div>
        </div>


        {/* steps */}
        <ol className='my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0'>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-blue-600'>
                Step 1
              </span>
              <span className='text-xl font-semibold'>
                Sign up for an account
              </span>
              <span className='mt-2 text-zinc-700'>
                Either starting out with a free plan or
                choose our{' '}
                <Link
                  href='/pricing'
                  className='text-blue-700 underline underline-offset-2'>
                  pro plan
                </Link>
                .
              </span>
            </div>
          </li>
         
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-blue-600'>
                Step 2
              </span>
              <span className='text-xl font-semibold'>
                Upload your PDF
              </span>
              <span className='mt-2 text-zinc-700'>
                We&apos;ll process your file, run the heavy machines in background & gather the relevant info using AI  
              </span>
            </div>
          </li>
         
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-blue-600'>
                Step 3
              </span>
              <span className='text-xl font-semibold'>
               Talk to the AI PDF 
              </span>
              <span className='mt-2 text-zinc-700'>
              We&apos;ll begin creating smart and tailored responses to questions using AI.
              </span>
            </div>
          </li>

           <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-blue-600'>
                Step 4
              </span>
              <span className='text-xl font-semibold'>
               Upload and maintain multiple files 
              </span>
              <span className='mt-2 text-zinc-700'>
              Store multiple PDFs and talk to them seamlessly starting from complex files like Legal Docs to Books etc
              It&apos;s that simple. Try out Converse2Pdf today -
              it really takes less than a minute.
              </span>
            </div>
          </li>
        </ol>

        <div className='mx-auto max-w-6xl px-6 lg:px-8'>
          <div className='mt-16 flow-root sm:mt-24'>
            <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
              <Image
                src='/dash.jpg'
                alt='uploading preview'
                width={1419}
                height={732}
                quality={100}
                className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
              />
            </div>
          </div>
        </div>
      </div>
      <Testimonials />
      <div style={{ margin: '20px 0' }} /> {/* Add some margin for spacing */}

      <Footer />
      <div style={{ margin: '20px 0' }} /> {/* Add some margin for spacing */}

    </>
  )
}
