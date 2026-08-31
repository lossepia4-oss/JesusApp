import type { Metadata } from "next";
import type { Question } from "@/data/types";
import { SITE_NAME, questionPath, questionUrl } from "@/lib/site";

export function questionDescription(question: Question): string {
  const refs = question.verses.map((verse) => verse.reference).join(", ");
  return `${question.intro} ${refs}. World English Bible.`;
}

export function questionMetadata(question: Question): Metadata {
  const description = questionDescription(question);
  const path = questionPath(question.id);
  const url = questionUrl(question.id);

  return {
    title: question.question,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: question.question,
      description,
      url,
      siteName: SITE_NAME,
      type: "article",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: question.question,
      description,
    },
  };
}

export function questionJsonLd(question: Question) {
  const answerText = [
    question.intro,
    ...question.verses.map(
      (verse) => `${verse.reference} (World English Bible): ${verse.text}`,
    ),
  ].join(" ");

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: {
      "@type": "Question",
      name: question.question,
      url: questionUrl(question.id),
      acceptedAnswer: {
        "@type": "Answer",
        text: answerText,
      },
    },
  };
}
