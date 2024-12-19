"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PeriscopeForm() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      router.push(`/view?q=${encodeURIComponent(url)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex items-center border-b-2 border-gray-300 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="url"
          placeholder="Enter URL"
          aria-label="URL to fetch"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button
          className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >
          Go
        </button>
      </div>
    </form>
  );
}
