import type { Metadata } from "next";
import type { Question } from "@/data/types";
import { SITE_NAME, SITE_URL, questionPath, questionUrl } from "@/lib/site";

export function questionDocumentTitle(question: Question): string {
  return `${question.question} | ${SITE_NAME}`;
}

export function questionDescription(question: Question): string {
  const answer = (question.shortAnswer ?? question.intro).trim();
  const text = answer.startsWith(question.question)
    ? answer
    : `${question.question} ${answer}`;
  if (text.length <= 160) return text;
  return `${text.slice(0, 157).replace(/\s+\S*$/, "")}…`;
}

export function questionMetadata(question: Question): Metadata {
  const description = questionDescription(question);
  const path = questionPath(question.id);
  const url = questionUrl(question.id);
  const title = questionDocumentTitle(question);

  return {
    title: { absolute: title },
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
  const url = questionUrl(question.id);
  const description = questionDescription(question);
  const title = questionDocumentTitle(question);
  const refs = question.verses.map((verse) => verse.reference).join("; ");
  const short = (question.shortAnswer ?? question.intro).trim();
  const faqAnswer = `${short} Verses: ${refs} (World English Bible).`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        headline: question.question,
        description,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${url}#faq` },
      },
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: question.question,
        name: title,
        description,
        url,
        mainEntityOfPage: { "@id": `${url}#webpage` },
        inLanguage: "en",
        author: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        citation: question.verses.map(
          (verse) => `${verse.reference}, World English Bible`,
        ),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        url,
        mainEntity: [
          {
            "@type": "Question",
            "@id": `${url}#question`,
            name: question.question,
            url,
            acceptedAnswer: {
              "@type": "Answer",
              text: faqAnswer,
            },
          },
        ],
      },
    ],
  };
}
