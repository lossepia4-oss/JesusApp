import type { Verse } from "./types";

export type Day = {
  day: number;
  title: string;
  visual: "door" | "vine" | "whole-life" | "neighbor" | "reconcile" | "rain" | "kingdom";
  verse: Verse;
  howToLive: string;
  practice: string;
};

export const days: Day[] = [
  {
    day: 1,
    title: "Come close",
    visual: "door",
    verse: {
      reference: "Matthew 11:28-29",
      text: "Come to me, all you who labor and are heavily burdened, and I will give you rest. Take my yoke upon you, and learn from me, for I am gentle and humble in heart; and you will find rest for your souls.",
    },
    howToLive: "Come to Jesus as you are—tired counts.",
    practice: "Sit still for one minute. Say, “Jesus, I come.” Then be quiet.",
  },
  {
    day: 2,
    title: "Stay with Him",
    visual: "vine",
    verse: {
      reference: "John 15:4-5",
      text: "Remain in me, and I in you. As the branch can’t bear fruit by itself, unless it remains in the vine, so neither can you, unless you remain in me. I am the vine. You are the branches. He who remains in me, and I in him, the same bears much fruit, for apart from me you can do nothing.",
    },
    howToLive: "Stay with Jesus the way a branch stays on the vine.",
    practice: "Leave a chair empty beside you. Read John 15:4 once, slowly, out loud.",
  },
  {
    day: 3,
    title: "Love God with all of it",
    visual: "whole-life",
    verse: {
      reference: "Matthew 22:37-38",
      text: "Jesus said to him, “‘You shall love the Lord your God with all your heart, with all your soul, and with all your mind.’ This is the first and great commandment.",
    },
    howToLive: "Give God the ordinary parts of today, not only the religious ones.",
    practice: "Name three parts of today—work, home, a feeling—and say, “This too, Lord.”",
  },
  {
    day: 4,
    title: "Love the person in front of you",
    visual: "neighbor",
    verse: {
      reference: "Matthew 22:39",
      text: "A second likewise is this, ‘You shall love your neighbor as yourself.’",
    },
    howToLive: "Treat the next person you see as someone Jesus told you to love.",
    practice: "Send one kind message, or give someone your full attention for two minutes.",
  },
  {
    day: 5,
    title: "Make it right",
    visual: "reconcile",
    verse: {
      reference: "Matthew 5:23-24",
      text: "If therefore you are offering your gift at the altar, and there remember that your brother has anything against you, leave your gift there before the altar, and go your way. First be reconciled to your brother, and then come and offer your gift.",
    },
    howToLive: "If you remember a break with someone, take a step toward making it right.",
    practice: "If it is safe, send one honest sentence: “I’m sorry,” or “Can we talk?”",
  },
  {
    day: 6,
    title: "Love your enemy",
    visual: "rain",
    verse: {
      reference: "Matthew 5:43-44",
      text: "You have heard that it was said, ‘You shall love your neighbor and hate your enemy.’ But I tell you, love your enemies, bless those who curse you, do good to those who hate you, and pray for those who mistreat you and persecute you.",
    },
    howToLive: "Pray for the person who is hard to love, the way rain falls on every roof.",
    practice: "Name one difficult person. Ask God to bless them. Do not add a complaint.",
  },
  {
    day: 7,
    title: "Seek the kingdom first",
    visual: "kingdom",
    verse: {
      reference: "Matthew 6:31-33",
      text: "Therefore don’t be anxious, saying, ‘What will we eat?’, ‘What will we drink?’ or, ‘With what will we be clothed?’ For the Gentiles seek after all these things; for your heavenly Father knows that you need all these things. But seek first God’s Kingdom, and his righteousness; and all these things will be given to you as well.",
    },
    howToLive: "Put God’s kingdom ahead of today’s worry about having enough.",
    practice: "Write one worry down. Next to it write, “Father knows.” Then seek one kind act.",
  },
];

export function dayIndexFromDate(date = new Date()): number {
  // Cycle by local calendar date so everyone on the same day sees the same teaching.
  const start = Date.UTC(2024, 0, 1);
  const today = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const daysSince = Math.floor((today - start) / 86_400_000);
  return ((daysSince % 7) + 7) % 7;
}
