import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Near handles privacy. No account required.",
};

export default function PrivacyPage() {
  return (
    <article className="legal">
      <p className="eyebrow">Privacy</p>
      <h1>Near does not need an account.</h1>
      <p>
        Near is a static web app. It does not require a login, email, or
        password. It is meant to help you come close to Jesus using the public
        domain World English Bible.
      </p>
      <h2>What stays on your device</h2>
      <p>
        Reminder on/off, reminder time, and whether today’s reminder already
        appeared are stored in your browser’s local storage. Those settings are
        not sent to a Near server.
      </p>
      <h2>Notifications</h2>
      <p>
        If you keep reminders on, your browser may ask permission to show
        notifications. You can deny that permission, change the time, or turn
        reminders off on the{" "}
        <Link href="/reminders">Reminders</Link> page.
      </p>
      <h2>What Near does not collect</h2>
      <p>
        Near does not create user accounts, does not sell data, and does not
        need your name. Hosting (for example Vercel) may keep ordinary server
        logs such as IP address and pages requested, as any website might.
      </p>
      <h2>Bible text</h2>
      <p>
        Scripture shown in Near is from the World English Bible, which is in
        the public domain.
      </p>
      <p>
        <Link href="/">Back to Ask</Link>
      </p>
    </article>
  );
}
