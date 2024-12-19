"use client";

import { Suspense } from "react";
import FetchedContent from "@/components/FetchedContent";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function UrlFetchedContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get("q");

  if (!url) {
    return null;
  }

  return (
    <>
      <p className="mb-4">
        URL: <span className="font-mono bg-gray-100 p-1 rounded">{url}</span>
      </p>
      <FetchedContent url={url} />
    </>
  );
}

export default function ViewPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/" className="text-blue-500 hover:underline">
          &larr; Back to Home
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Fetched Content</h1>
      <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
        <UrlFetchedContent />
      </Suspense>
    </div>
  );
}
