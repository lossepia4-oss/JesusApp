const STORAGE_KEY = "near-reminders";

export type ReminderSettings = {
  enabled: boolean;
  hour: number;
  minute: number;
  lastShownDate: string | null;
};

export const DEFAULT_REMINDERS: ReminderSettings = {
  enabled: true,
  hour: 8,
  minute: 0,
  lastShownDate: null,
};

export function loadReminders(): ReminderSettings {
  if (typeof window === "undefined") return DEFAULT_REMINDERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_REMINDERS };
    const parsed = JSON.parse(raw) as Partial<ReminderSettings>;
    return {
      enabled: parsed.enabled ?? true,
      hour: clamp(parsed.hour ?? 8, 0, 23),
      minute: clamp(parsed.minute ?? 0, 0, 59),
      lastShownDate: parsed.lastShownDate ?? null,
    };
  } catch {
    return { ...DEFAULT_REMINDERS };
  }
}

export function saveReminders(settings: ReminderSettings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function todayKey(date = new Date()): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function nextReminderDate(settings: ReminderSettings, from = new Date()): Date {
  const next = new Date(from);
  next.setHours(settings.hour, settings.minute, 0, 0);
  if (next.getTime() <= from.getTime()) {
    next.setDate(next.getDate() + 1);
  }
  return next;
}

export function shouldShowNow(settings: ReminderSettings, now = new Date()): boolean {
  if (!settings.enabled) return false;
  if (settings.lastShownDate === todayKey(now)) return false;
  const scheduled = new Date(now);
  scheduled.setHours(settings.hour, settings.minute, 0, 0);
  return now.getTime() >= scheduled.getTime();
}

export function formatTime(hour: number, minute: number): string {
  const h = ((hour + 11) % 12) + 1;
  const ampm = hour < 12 ? "AM" : "PM";
  return `${h}:${pad(minute)} ${ampm}`;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export async function ensureNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "denied";
  }
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";
  return Notification.requestPermission();
}

export async function showReminderNotification(title: string, body: string, url = "/today") {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  const options: NotificationOptions = {
    body,
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
    tag: "near-daily",
    data: { url },
  };

  const registration = await navigator.serviceWorker?.ready.catch(() => undefined);
  if (registration) {
    await registration.showNotification(title, options);
    return;
  }
  new Notification(title, options);
}
