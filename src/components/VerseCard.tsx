import type { Verse } from "@/data/types";
import { TRANSLATION } from "@/data/types";

export function VerseCard({ verse }: { verse: Verse }) {
  return (
    <figure className="verse-card">
      <blockquote>
        <p>{verse.text}</p>
      </blockquote>
      <figcaption>
        <cite>{verse.reference}</cite>
        <span className="translation">{TRANSLATION}</span>
      </figcaption>
    </figure>
  );
}
