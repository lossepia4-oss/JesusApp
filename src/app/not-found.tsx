import Link from "next/link";

export default function NotFound() {
  return (
    <article className="legal">
      <p className="eyebrow">Near</p>
      <h1>This page is not here.</h1>
      <p>
        <Link href="/">Ask a question</Link>
        {" · "}
        <Link href="/today">Today</Link>
      </p>
    </article>
  );
}
