import Fuse from "fuse.js";
import { questions } from "@/data/questions";
import type { Question } from "@/data/types";

const fuse = new Fuse(questions, {
  includeScore: true,
  ignoreLocation: true,
  threshold: 0.5,
  minMatchCharLength: 2,
  keys: [
    { name: "question", weight: 0.55 },
    { name: "aliases", weight: 0.35 },
    { name: "intro", weight: 0.08 },
    { name: "shortAnswer", weight: 0.07 },
  ],
});

export type SearchHit = {
  question: Question;
  score: number;
};

/** Lower Fuse scores are better. Above this, treat as “Bible does not speak directly.” */
const DIRECT_MAX_SCORE = 0.34;

export function searchQuestions(query: string): {
  direct: SearchHit | null;
  closest: SearchHit[];
} {
  const q = query.trim();
  if (!q) {
    return { direct: null, closest: [] };
  }

  const exact = questions.find(
    (item) =>
      item.question.toLowerCase() === q.toLowerCase() ||
      item.aliases.some((alias) => alias.toLowerCase() === q.toLowerCase()),
  );
  if (exact) {
    return {
      direct: { question: exact, score: 0 },
      closest: questions
        .filter((item) => item.id !== exact.id)
        .slice(0, 3)
        .map((question) => ({ question, score: 1 })),
    };
  }

  const results = fuse.search(q, { limit: 5 }).map((r) => ({
    question: r.item,
    score: r.score ?? 1,
  }));

  if (results.length === 0) {
    return { direct: null, closest: featuredFallback() };
  }

  const best = results[0];
  if (best.score <= DIRECT_MAX_SCORE) {
    return {
      direct: best,
      closest: results.slice(1, 4),
    };
  }

  return {
    direct: null,
    closest: results.slice(0, 4),
  };
}

function featuredFallback(): SearchHit[] {
  return questions
    .filter((q) => q.featured)
    .slice(0, 4)
    .map((question) => ({ question, score: 1 }));
}

export function getQuestion(id: string): Question | undefined {
  return questions.find((q) => q.id === id);
}
