"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import yaml from "js-yaml";

interface Rule {
  domain?: string;
  domains?: string[];
  headers?: Record<string, string>;
  paths?: string[];
  injections?: Array<{
    position: string;
    append?: string;
    prepend?: string;
  }>;
}

export default function FetchedContent({
  init,
  onLoadStart,
  onLoadEnd,
}: {
  init: () => void;
  onLoadStart: () => void;
  onLoadEnd: () => void;
}) {
  const searchParams = useSearchParams();
  const url = searchParams.keys().next().value;
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [ruleset, setRuleset] = useState<Rule[]>([]);

  useEffect(() => {
    if (!url) {
      init();
      setContent("");
      return;
    }
  }, [url]);

  useEffect(() => {
    // Load ruleset
    fetch("/ruleset.yaml")
      .then((response) => response.text())
      .then((text) => {
        const rules = yaml.load(text) as Rule[];
        setRuleset(rules);
      })
      .catch((err) => {
        console.error("Error loading ruleset:", err);
      });
  }, []);

  const getHeadersForUrl = (url: string): Record<string, string> => {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname;
      const pathname = urlObj.pathname;

      for (const rule of ruleset) {
        // Check if domain matches
        const domains = rule.domains || (rule.domain ? [rule.domain] : []);
        if (!domains.includes(hostname)) continue;

        // Check if path matches (if paths are specified)
        if (rule.paths && !rule.paths.some((path) => pathname.startsWith(path)))
          continue;

        // Return headers if they exist
        return rule.headers || {};
      }
    } catch (err) {
      console.error("Error parsing URL:", err);
    }
    return {};
  };

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
    const fetchContent = async (url: string) => {
      try {
        onLoadStart();
        const headers = getHeadersForUrl(url);
        const response = await fetch(`https://proxy.corsfix.com/?${url}`, {
          headers: {
            "x-corsfix-headers": JSON.stringify(headers),
          },
        });
        const data = await response.text();
        const contentWithBase = addBaseTag(data, url);
        setContent(contentWithBase);
        onLoadEnd();
      } catch (err) {
        console.error(err);
        setError("Could not fetch the page. Please try again.");
        onLoadEnd();
      }
    };

    if (url && ruleset.length > 0) {
      fetchContent(url);
    }
  }, [url, ruleset]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <iframe
      srcDoc={content}
      className="w-full h-full absolute top-0 left-0 border rounded"
      title="Content Preview"
      sandbox=""
      referrerPolicy="no-referrer"
    />
  );
}
