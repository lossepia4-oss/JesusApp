import Link from "next/link";
import { relatedQuestions } from "@/data/related";
import type { Question } from "@/data/types";
import { questionPath } from "@/lib/site";
import { ShareButton } from "./ShareButton";
import { VerseCard } from "./VerseCard";

export function AnswerBody({ question }: { question: Question }) {
  const related = relatedQuestions(question.id);

  return (
    <div className="page">
      <Link href="/" className="back">
        ← All questions
      </Link>
      <header className="hero compact">
        <p className="eyebrow">From the Bible</p>
        <h1>{question.question}</h1>
        <p className="lede">{question.intro}</p>
        <ShareButton question={question.question} />
      </header>
      <ol className="verses">
        {question.verses.map((verse) => (
          <li key={verse.reference}>
            <VerseCard verse={verse} />
          </li>
        ))}
      </ol>
      <p className="footnote">
        World English Bible · public domain. Near does not add teaching beyond
        these verses.
      </p>
      {related.length > 0 && (
        <section className="panel">
          <h2>Related questions</h2>
          <ul className="question-list">
            {related.map((item) => (
              <li key={item.id}>
                <Link href={questionPath(item.id)}>{item.question}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
