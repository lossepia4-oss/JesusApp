"use client";

import { useEffect, useRef, useState } from "react";
import { shareText } from "@/lib/site";

function canUseNativeShare() {
  if (typeof navigator === "undefined" || typeof navigator.share !== "function") {
    return false;
  }
  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
  const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  return standalone || mobile;
}

async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      /* fall through */
    }
  }
  try {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.top = "0";
    field.style.left = "0";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.focus();
    field.select();
    field.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(field);
    return ok;
  } catch {
    return false;
  }
}

export function ShareButton({ question }: { question: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "manual">("idle");
  const [manual, setManual] = useState("");
  const manualRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (status === "manual" && manualRef.current) {
      manualRef.current.focus();
      manualRef.current.select();
    }
  }, [status]);

  async function onShare() {
    const url = window.location.href;
    const payload = shareText(question, url);

    if (canUseNativeShare()) {
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

    const copied = await copyToClipboard(payload);
    if (copied) {
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2000);
      return;
    }

    setManual(payload);
    setStatus("manual");
  }

  return (
    <div className="share-block">
      <button type="button" className="share-btn" onClick={() => void onShare()}>
        {status === "copied" ? "Copied" : "Share"}
      </button>
      {status === "copied" && (
        <p className="share-feedback" role="status">
          Copied the question and link.
        </p>
      )}
      {status === "manual" && (
        <label className="share-manual">
          Copy this question and link
          <textarea ref={manualRef} readOnly rows={3} value={manual} />
        </label>
      )}
    </div>
  );
}
