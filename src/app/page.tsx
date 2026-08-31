import { Suspense } from "react";
import { AskClient } from "@/components/AskClient";

export default function HomePage() {
  return (
    <Suspense fallback={<div className="page">Loading…</div>}>
      <AskClient />
    </Suspense>
  );
}
