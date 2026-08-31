import { questions } from "@/data/questions";
import type { Question } from "@/data/types";

const relatedById: Record<string, string[]> = {
  "who-is-jesus": ["is-jesus-god", "was-jesus-a-real-person", "what-is-the-gospel", "who-is-god"],
  "is-jesus-god": ["who-is-jesus", "who-is-god", "what-is-the-holy-spirit", "did-jesus-rise"],
  "why-did-jesus-die": ["who-killed-jesus", "what-is-the-gospel", "what-is-sin", "did-jesus-rise"],
  "did-jesus-rise": ["who-is-jesus", "was-jesus-a-real-person", "what-happens-after-i-die", "why-did-jesus-die"],
  "get-close-to-jesus": ["how-do-i-become-a-christian", "how-do-i-pray", "how-jesus-wants-me-to-live"],
  "how-jesus-wants-me-to-live": ["get-close-to-jesus", "how-do-i-become-a-christian", "what-is-the-gospel"],
  "good-enough": ["what-is-the-gospel", "can-i-be-forgiven", "how-do-i-become-a-christian", "what-is-sin"],
  "how-do-i-pray": ["get-close-to-jesus", "who-is-god", "what-is-the-holy-spirit"],
  suffering: ["what-happens-after-i-die", "does-god-love-me", "why-did-jesus-cry"],
  "what-is-the-gospel": ["how-do-i-become-a-christian", "why-did-jesus-die", "who-is-jesus", "can-i-be-forgiven"],
  "can-i-be-forgiven": ["what-is-sin", "what-is-the-gospel", "good-enough"],
  "does-god-love-me": ["who-is-god", "what-is-the-gospel", "why-did-jesus-die"],
  "what-is-sin": ["who-is-god", "why-did-jesus-die", "can-i-be-forgiven", "how-do-i-become-a-christian"],
  "what-is-the-holy-spirit": ["who-is-god", "who-is-jesus", "how-do-i-become-a-christian", "how-do-i-pray"],
  "will-jesus-return": ["did-jesus-rise", "what-happens-after-i-die", "who-is-jesus"],
  "how-to-read-the-bible": ["is-the-bible-true", "who-is-god", "what-is-the-gospel"],
  baptism: ["how-do-i-become-a-christian", "what-is-the-gospel", "what-is-the-church"],
  "what-is-the-church": ["how-do-i-become-a-christian", "baptism", "how-jesus-wants-me-to-live"],
  "who-is-god": ["who-is-jesus", "is-jesus-god", "what-is-the-holy-spirit", "does-god-love-me"],
  "was-jesus-a-real-person": ["who-is-jesus", "did-jesus-rise", "when-was-jesus-born", "is-the-bible-true"],
  "when-was-jesus-born": ["was-jesus-a-real-person", "who-is-jesus", "is-the-bible-true"],
  "who-killed-jesus": ["why-did-jesus-die", "did-jesus-rise", "what-is-the-gospel"],
  "why-did-jesus-cry": ["who-is-jesus", "suffering", "does-god-love-me"],
  "is-the-bible-true": ["how-to-read-the-bible", "was-jesus-a-real-person", "who-is-jesus"],
  "how-do-i-become-a-christian": ["what-is-the-gospel", "get-close-to-jesus", "baptism", "can-i-be-forgiven"],
  "what-happens-after-i-die": ["did-jesus-rise", "what-is-the-gospel", "will-jesus-return", "suffering"],
};

export function relatedQuestions(id: string): Question[] {
  const ids = relatedById[id] ?? [];
  const found = ids
    .map((relatedId) => questions.find((item) => item.id === relatedId))
    .filter((item): item is Question => Boolean(item));
  if (found.length > 0) return found;
  return questions.filter((item) => item.id !== id && item.featured).slice(0, 4);
}
