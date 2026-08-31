"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_REMINDERS,
  ensureNotificationPermission,
  formatTime,
  loadReminders,
  saveReminders,
  type ReminderSettings,
} from "@/lib/reminders";

export function RemindersClient() {
  const [settings, setSettings] = useState<ReminderSettings>(DEFAULT_REMINDERS);
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">(
    "default",
  );
  const [installHint, setInstallHint] = useState(false);

  useEffect(() => {
    setSettings(loadReminders());
    if (!("Notification" in window)) {
      setPermission("unsupported");
    } else {
      setPermission(Notification.permission);
    }
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
    setInstallHint(!standalone);
  }, []);

  function persist(next: ReminderSettings) {
    setSettings(next);
    saveReminders(next);
    window.dispatchEvent(new Event("near-reminders-changed"));
  }

  async function toggleEnabled() {
    const enabled = !settings.enabled;
    if (enabled) {
      const result = await ensureNotificationPermission();
      setPermission(result === "granted" || result === "denied" ? result : "default");
    }
    persist({ ...settings, enabled });
  }

  function onTimeChange(value: string) {
    const [h, m] = value.split(":").map((part) => Number(part));
    persist({
      ...settings,
      hour: Number.isFinite(h) ? h : 8,
      minute: Number.isFinite(m) ? m : 0,
    });
  }

  const timeValue = `${String(settings.hour).padStart(2, "0")}:${String(settings.minute).padStart(2, "0")}`;

  return (
    <div className="page">
      <header className="hero compact">
        <p className="eyebrow">Reminders</p>
        <h1>A daily nudge to come close.</h1>
        <p className="lede">
          On by default at 8:00 in your local time. Change the time or turn them
          off. No account.
        </p>
      </header>

      <section className="panel">
        <div className="setting-row">
          <div>
            <h2>Daily reminder</h2>
            <p className="muted">
              {settings.enabled
                ? `On · ${formatTime(settings.hour, settings.minute)}`
                : "Off"}
            </p>
          </div>
          <button
            type="button"
            className={settings.enabled ? "switch on" : "switch"}
            role="switch"
            aria-checked={settings.enabled}
            onClick={() => void toggleEnabled()}
          >
            <span className="knob" />
          </button>
        </div>

        <label className="time-label" htmlFor="reminder-time">
          Time
          <input
            id="reminder-time"
            type="time"
            value={timeValue}
            onChange={(e) => onTimeChange(e.target.value)}
            disabled={!settings.enabled}
          />
        </label>

        {permission === "denied" && settings.enabled && (
          <p className="caution-text">
            Notifications are blocked in this browser. Open site settings to allow
            them, or keep Near installed and open around {formatTime(settings.hour, settings.minute)}.
          </p>
        )}
        {permission === "unsupported" && (
          <p className="caution-text">
            This browser does not support notifications. You can still open Today
            each morning.
          </p>
        )}
      </section>

      {installHint && (
        <section className="panel">
          <h2>Add Near to your home screen</h2>
          <p>
            Near is a PWA. On a phone, use the browser menu and choose{" "}
            <strong>Add to Home Screen</strong> or <strong>Install app</strong>.
            Reminders work best when Near is installed.
          </p>
        </section>
      )}

      <p className="footnote">
        Reminders stay on this device only. Near never asks you to create an
        account.
      </p>
    </div>
  );
}
