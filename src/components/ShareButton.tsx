"use client";

import { useState } from "react";
import { shareText } from "@/lib/site";

export function ShareButton({ question }: { question: string }) {
  const [copied, setCopied] = useState(false);

  async function onShare() {
    const url = window.location.href;
    const payload = shareText(question, url);

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: question,
          text: question,
          url,
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(payload);
    } catch {
      const field = document.createElement("textarea");
      field.value = payload;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.left = "-9999px";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      document.body.removeChild(field);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button type="button" className="share-btn" onClick={() => void onShare()}>
      {copied ? "Copied" : "Share"}
    </button>
  );
}
