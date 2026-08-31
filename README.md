# Near

A mobile-first [Next.js](https://nextjs.org) PWA that helps people get close to Jesus.

**Ask** curated Bible questions and see the verses on screen. **Today** is a 7-day visual of how Jesus wants us to live. **Reminders** default to 8:00 local time. No account.

Scripture is from the [World English Bible](https://worldenglish.bible/) (public domain). Near does not invent doctrine. If the Bible does not speak directly to a typed question, Near says so and shows the closest questions it can answer.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Deploy on Vercel

This repo is ready for Vercel: Next.js App Router plus `vercel.json`. Connect the GitHub repository and deploy. Production deploys from `main`.

## Pages

- `/` Ask
- `/ask/who-is-jesus` Example shareable answer (every question has a stable URL)
- `/ask/who-is-god`, `/ask/when-was-jesus-born`, `/ask/how-do-i-become-a-christian` More seeker questions
- `/today` Seven-day way to live
- `/reminders` Notification time (on by default at 8:00)
- `/about`
- `/privacy`
- `/sitemap.xml` and `/robots.txt`

Each answer is a public page with its own title and Open Graph tags. Share copies the question and URL.

Add to the home screen from the browser menu to install the PWA.
