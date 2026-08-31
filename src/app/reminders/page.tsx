import type { Metadata } from "next";
import { RemindersClient } from "@/components/RemindersClient";

export const metadata: Metadata = {
  title: "Reminders",
  description: "Daily reminders to come close to Jesus. On by default at 8:00 local time.",
};

export default function RemindersPage() {
  return <RemindersClient />;
}
