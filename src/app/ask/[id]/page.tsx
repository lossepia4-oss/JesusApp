import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnswerBody } from "@/components/AnswerBody";
import { questions } from "@/data/questions";
import { getQuestion } from "@/lib/search";
import { questionJsonLd, questionMetadata } from "@/lib/questionMeta";

type Params = { id: string };

export function generateStaticParams(): Params[] {
  return questions.map((question) => ({ id: question.id }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: Params }): Metadata {
  const question = getQuestion(params.id);
  if (!question) {
    return { title: "Question" };
  }
  return questionMetadata(question);
}

export default function AskQuestionPage({ params }: { params: Params }) {
  const question = getQuestion(params.id);
  if (!question) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(questionJsonLd(question)).replace(/</g, "\\u003c"),
        }}
      />
      <AnswerBody question={question} />
    </>
  );
}
