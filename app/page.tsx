"use client";

import FetchedContent from "@/components/FetchedContent";
import { useState, Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [displayUrl, setDisplayUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isContentReady, setIsContentReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const urlParam = new URLSearchParams(window.location.search)
      .keys()
      .next().value;
    if (urlParam) {
      setDisplayUrl(urlParam);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const url = formData.get("url") as string;
    router.push(`/?${url}`);
  };

  const init = () => {
    setIsContentReady(false);
    setIsLoading(false);
  };

  const handleContentLoadStart = () => {
    setIsLoading(true);
    setIsContentReady(false);
  };

  const handleContentLoadEnd = () => {
    setIsLoading(false);
    setIsContentReady(true);
  };

  return (
    <main className="flex h-dvh flex-col items-center p-2">
      <div
        className={`w-full flex-1 max-w-6xl flex flex-col transition-all duration-700 ${
          isContentReady ? "mt-0" : "mt-[30vh]"
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <Link href="/" className="flex items-center gap-1.5">
            <img
              src="/periscope-1x1.png"
              alt="Periscope Logo"
              className="w-10"
            />
          </Link>
          <form onSubmit={handleSubmit} className="flex-1 w-full">
            <div className="flex items-center border rounded border-gray-300 p-1">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 px-2 focus:outline-none"
                type="url"
                name="url"
                placeholder="Enter URL"
                aria-label="URL to fetch"
                required
                value={displayUrl}
                onChange={(e) => setDisplayUrl(e.target.value)}
              />
              <button
                className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded w-16 h-8 flex items-center justify-center"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-b-white"></div>
                ) : (
                  "Go"
                )}
              </button>
            </div>
          </form>
        </div>

        <div
          className={`overflow-hidden flex-1 h-full transition-all duration-700 ease-in-out relative ${
            isContentReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <Suspense>
            <FetchedContent
              init={init}
              onLoadStart={handleContentLoadStart}
              onLoadEnd={handleContentLoadEnd}
            />
          </Suspense>
        </div>
      </div>
      <footer className="text-xs text-gray-500 mt-2">
        Periscope is powered by{" "}
        <a href="https://corsfix.com" className="hover:text-gray-700 underline">
          Corsfix
        </a>{" "}
        <span className="mx-4">•</span>{" "}
        <a
          href="https://github.com/corsfix/periscope"
          className="hover:text-gray-700 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code
        </a>
      </footer>
    </main>
  );
}
