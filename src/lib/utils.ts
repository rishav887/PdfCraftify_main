import { type ClassValue, clsx } from 'clsx'
import { Metadata } from 'next'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  if (typeof window !== 'undefined') return path
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}${path}`
  return `http://localhost:${
    process.env.PORT ?? 3000
  }${path}`
}

//TODO : Need to update the image and icons 
export function constructMetadata({
  title = "PDFCraftify : AI based PDF reader",
  description = "PDFCraftify is a saas app to read PDF and answer your questions in runtime.",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@rishav887"
    },
    icons,
    
   // metadataBase: new URL('https://pdf-craftify-main.vercel.app'),
    metadataBase: new URL('https://pdfcraftify-ai.up.railway.app'),
    themeColor: '#FFF',
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}