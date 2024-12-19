"use client";

import { useState, useEffect } from "react";

export default function FetchedContent({ url }: { url: string }) {
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const addBaseTag = (html: string, baseUrl: string) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const base = new URL(baseUrl);

      // Add base tag to head
      const baseTag = doc.createElement("base");
      baseTag.href = base.origin;
      doc.head.insertBefore(baseTag, doc.head.firstChild);

      return doc.documentElement.outerHTML;
    } catch (err) {
      console.error("Error adding base tag:", err);
      return html;
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`https://proxy.corsfix.com/?${url}`);
        if (!response.ok) {
          throw new Error("Failed to fetch content");
        }
        const data = await response.text();
        const contentWithBase = addBaseTag(data, url);
        setContent(contentWithBase);
      } catch (err) {
        console.error(err);
        setError("Could not fetch the page. Please try again.");
      }
    };

    fetchContent();
  }, [url]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <iframe
      srcDoc={content}
      className="w-full min-h-screen border rounded"
      title="Content Preview"
      sandbox=""
      referrerPolicy="no-referrer"
    />
  );
}
