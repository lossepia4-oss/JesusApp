import type { Metadata } from "next";
import { TodayClient } from "@/components/TodayClient";

export const metadata: Metadata = {
  title: "Today",
  description: "A seven-day picture of how Jesus wants us to live.",
};

export default function TodayPage() {
  return <TodayClient />;
}
