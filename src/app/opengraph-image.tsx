import { ImageResponse } from "next/og";

export const alt = "Near — questions about Jesus, answered from the Bible.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
            fontSize: 72,
            color: "#2b241b",
            lineHeight: 1.15,
            fontWeight: 600,
          }}
        >
          Ask about Jesus.
        </div>
        <div style={{ fontSize: 28, color: "#6d6154" }}>World English Bible</div>
      </div>
    ),
    { ...size },
  );
}
