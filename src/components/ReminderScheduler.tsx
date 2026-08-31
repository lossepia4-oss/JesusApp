"use client";

import { useCallback, useEffect, useRef } from "react";
import { days, dayIndexFromDate } from "@/data/days";
import {
  ensureNotificationPermission,
  loadReminders,
  nextReminderDate,
  saveReminders,
  shouldShowNow,
  showReminderNotification,
  todayKey,
} from "@/lib/reminders";

export function ReminderScheduler() {
  const timer = useRef<number | null>(null);

  const fire = useCallback(async () => {
    const settings = loadReminders();
    const day = days[dayIndexFromDate()];
    await showReminderNotification(
      `Near · ${day.title}`,
      `${day.verse.reference} — ${day.howToLive}`,
      "/today",
    );
    saveReminders({ ...settings, lastShownDate: todayKey() });
  }, []);

  const schedule = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    const settings = loadReminders();
    if (!settings.enabled) return;

    if (shouldShowNow(settings)) {
      void fire();
    }

    const wait = nextReminderDate(settings).getTime() - Date.now();
    timer.current = window.setTimeout(() => {
      void fire().then(schedule);
    }, Math.max(wait, 1000));
  }, [fire]);

  useEffect(() => {
    const settings = loadReminders();
    if (settings.enabled && "Notification" in window && Notification.permission === "default") {
      void ensureNotificationPermission().then(() => schedule());
    } else {
      schedule();
    }

    const onVis = () => {
      if (document.visibilityState === "visible") schedule();
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("near-reminders-changed", schedule);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("near-reminders-changed", schedule);
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [schedule]);

  return null;
}
