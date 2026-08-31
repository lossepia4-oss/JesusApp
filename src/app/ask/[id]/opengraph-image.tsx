import { ImageResponse } from "next/og";
import { questions } from "@/data/questions";
import { getQuestion } from "@/lib/search";

export const alt = "Near";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return questions.map((question) => ({ id: question.id }));
}

export default function OgImage({ params }: { params: { id: string } }) {
  const question = getQuestion(params.id);
  const title = question?.question ?? "Near";
  const fontSize = title.length > 42 ? 56 : title.length > 28 ? 64 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4eee4",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#8b4a2b",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Near
        </div>
        <div
          style={{
            fontSize,
            color: "#2b241b",
            lineHeight: 1.15,
            fontWeight: 600,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 28, color: "#6d6154" }}>World English Bible</div>
      </div>
    ),
    { ...size },
  );
}
