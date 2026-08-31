import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ORIGIN = "https://jesus-app-roan.vercel.app";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const questionsSource = readFileSync(join(root, "src/data/questions.ts"), "utf8");
const ids = [...questionsSource.matchAll(/^\s+id: "([a-z0-9-]+)"/gm)].map(
  (match) => match[1],
);

if (ids.length < 10) {
  throw new Error(`Expected question ids in questions.ts, found ${ids.length}`);
}

const paths = [
  "/",
  "/today",
  "/reminders",
  "/about",
  "/privacy",
  ...ids.map((id) => `/ask/${id}`),
];

const body = paths
  .map((path) => {
    const loc = path === "/" ? ORIGIN : `${ORIGIN}${path}`;
    return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

writeFileSync(join(root, "public/sitemap.xml"), xml);
console.log(`Wrote public/sitemap.xml with ${paths.length} URLs`);
