import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Near helps people get close to Jesus with Bible Q&A and a seven-day way to live.",
};

export default function AboutPage() {
  return (
    <article className="legal">
      <p className="eyebrow">About</p>
      <h1>Get close to Jesus.</h1>
      <p>
        Near is a mobile-first progressive web app. Ask a question. See the
        verses. Practice a small way of living today. No account.
      </p>
      <h2>Ask</h2>
      <p>
        Near answers a curated set of questions from the World English Bible
        only. Verses are shown on the screen. Each answer has a public URL you
        can share. Near will not invent doctrine. If the Bible does not speak
        directly to what you typed, Near will say so and show the closest
        questions it can help with.
      </p>
      <h2>Today</h2>
      <p>
        A seven-day cycle of how Jesus wants us to live, with ordinary-life
        pictures (CSS and SVG—no photographic or realistic images of Jesus),
        the verse, one sentence, and a practice under two minutes.
      </p>
      <h2>Reminders</h2>
      <p>
        Reminders are on by default at 8:00 in your local time. You can change
        the time or turn them off. Add Near to your home screen to use it like
        an app.
      </p>
      <p>
        <Link href="/">Ask a question</Link>
        {" · "}
        <Link href="/privacy">Privacy</Link>
      </p>
    </article>
  );
}
