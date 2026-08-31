"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { featuredQuestions, moreQuestions } from "@/data/questions";
import type { Question } from "@/data/types";
import { searchQuestions } from "@/lib/search";
import { questionPath } from "@/lib/site";

export function AskClient() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");

  const results = useMemo(() => {
    const source = submitted || query;
    if (!source.trim()) return null;
    return searchQuestions(source);
  }, [query, submitted]);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    const found = searchQuestions(trimmed);
    if (found.direct) {
      router.push(questionPath(found.direct.question.id));
      return;
    }
    setSubmitted(trimmed);
  }

  const showNoDirect = Boolean(submitted && results && !results.direct);

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Near</p>
        <h1>Ask about Jesus.</h1>
        <p className="lede">
          Answers from the World English Bible. Near will not invent doctrine. If
          Scripture does not speak directly, it will say so.
        </p>
      </header>

      <form className="search" onSubmit={onSubmit} role="search">
        <label htmlFor="ask">Your question</label>
        <div className="search-row">
          <input
            id="ask"
            type="search"
            enterKeyHint="search"
            placeholder="Type a question…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSubmitted("");
            }}
            autoComplete="off"
          />
          <button type="submit">Ask</button>
        </div>
      </form>

      {query.trim() && results && !submitted && (
        <section className="panel">
          <h2>Matching questions</h2>
          {results.direct || results.closest.length ? (
            <QuestionLinks
              items={(results.direct
                ? [results.direct, ...results.closest]
                : results.closest
              ).map((hit) => hit.question)}
            />
          ) : (
            <p className="empty">No matching questions yet. Press Ask.</p>
          )}
        </section>
      )}

      {showNoDirect && results && (
        <section className="panel caution">
          <h2>The Bible does not speak directly to that here</h2>
          <p>
            Near only answers from a curated set of questions, using the World
            English Bible. It will not invent an answer. Closest questions:
          </p>
          <QuestionLinks items={results.closest.map((hit) => hit.question)} />
        </section>
      )}

      {!query.trim() && (
        <>
          <section className="panel">
            <h2>Start here</h2>
            <QuestionLinks items={featuredQuestions} />
          </section>
          <section className="panel">
            <h2>People also ask</h2>
            <QuestionLinks items={moreQuestions} />
          </section>
        </>
      )}
    </div>
  );
}

function QuestionLinks({ items }: { items: Question[] }) {
  return (
    <ul className="question-list">
      {items.map((question) => (
        <li key={question.id}>
          <Link href={questionPath(question.id)}>{question.question}</Link>
        </li>
      ))}
    </ul>
  );
}
