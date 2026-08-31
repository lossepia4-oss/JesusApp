"use client";

import { useEffect, useMemo, useState } from "react";
import { featuredQuestions, questions } from "@/data/questions";
import type { Question } from "@/data/types";
import { getQuestion, searchQuestions } from "@/lib/search";
import { VerseCard } from "./VerseCard";

export function AskClient() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = selectedId ? getQuestion(selectedId) : undefined;

  useEffect(() => {
    const apply = () => {
      const id = new URLSearchParams(window.location.search).get("q");
      setSelectedId(id);
      if (id) {
        const match = getQuestion(id);
        if (match) setQuery(match.question);
      }
    };
    apply();
    window.addEventListener("popstate", apply);
    return () => window.removeEventListener("popstate", apply);
  }, []);

  const results = useMemo(() => {
    const source = submitted || query;
    if (!source.trim()) return null;
    return searchQuestions(source);
  }, [query, submitted]);

  function setUrl(path: string) {
    window.history.pushState({}, "", path);
    const id = new URLSearchParams(path.split("?")[1] || "").get("q");
    setSelectedId(id);
  }

  function openQuestion(question: Question) {
    setQuery(question.question);
    setSubmitted("");
    setUrl(`/?q=${question.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    const found = searchQuestions(trimmed);
    if (found.direct) {
      setSubmitted("");
      setUrl(`/?q=${found.direct.question.id}`);
      return;
    }
    setUrl("/");
    setSelectedId(null);
    setSubmitted(trimmed);
  }

  function clearToList() {
    setQuery("");
    setSubmitted("");
    setUrl("/");
  }

  if (selected) {
    return (
      <AnswerView
        question={selected}
        onBack={clearToList}
        onRelated={openQuestion}
      />
    );
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
            <ul className="question-list">
              {(results.direct ? [results.direct, ...results.closest] : results.closest).map(
                (hit) => (
                  <li key={hit.question.id}>
                    <button type="button" onClick={() => openQuestion(hit.question)}>
                      {hit.question.question}
                    </button>
                  </li>
                ),
              )}
            </ul>
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
          <ul className="question-list">
            {results.closest.map((hit) => (
              <li key={hit.question.id}>
                <button type="button" onClick={() => openQuestion(hit.question)}>
                  {hit.question.question}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {!query.trim() && (
        <section className="panel">
          <h2>Start here</h2>
          <ul className="question-list">
            {featuredQuestions.map((question) => (
              <li key={question.id}>
                <button type="button" onClick={() => openQuestion(question)}>
                  {question.question}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function AnswerView({
  question,
  onBack,
  onRelated,
}: {
  question: Question;
  onBack: () => void;
  onRelated: (question: Question) => void;
}) {
  const related = questions.filter((q) => q.id !== question.id && q.featured).slice(0, 3);

  return (
    <div className="page">
      <button type="button" className="back" onClick={onBack}>
        ← All questions
      </button>
      <header className="hero compact">
        <p className="eyebrow">From the Bible</p>
        <h1>{question.question}</h1>
        <p className="lede">{question.intro}</p>
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
      <section className="panel">
        <h2>Related</h2>
        <ul className="question-list">
          {related.map((item) => (
            <li key={item.id}>
              <button type="button" onClick={() => onRelated(item)}>
                {item.question}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
