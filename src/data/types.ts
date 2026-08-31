export type Verse = {
  reference: string;
  text: string;
};

export type Question = {
  id: string;
  question: string;
  featured: boolean;
  aliases: string[];
  /** Short framing that only introduces the verses. Never adds doctrine. */
  intro: string;
  /** One-sentence answer for meta description and FAQ JSON-LD. */
  shortAnswer?: string;
  verses: Verse[];
};

export const TRANSLATION = "World English Bible";
