import { Suspense } from 'react'
import FetchedContent from '@/components/FetchedContent'
import Link from 'next/link'

export default function ViewPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const { q: url } = searchParams

  if (!url) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl mb-4">No URL provided</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Go back to home
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/" className="text-blue-500 hover:underline">
          &larr; Back to Home
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Fetched Content</h1>
      <p className="mb-4">
        URL: <span className="font-mono bg-gray-100 p-1 rounded">{url}</span>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <FetchedContent url={url} />
      </Suspense>
    </div>
  )
}

