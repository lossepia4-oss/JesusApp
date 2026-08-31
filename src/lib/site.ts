export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jesus-app-roan.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Near";

export function questionPath(id: string): string {
  return `/ask/${id}`;
}

export function questionUrl(id: string): string {
  return `${SITE_URL}${questionPath(id)}`;
}

export function shareText(question: string, url: string): string {
  return `${question}\n${url}`;
}
