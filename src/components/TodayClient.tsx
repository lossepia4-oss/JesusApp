"use client";

import { useMemo, useState } from "react";
import { days, dayIndexFromDate } from "@/data/days";
import { DayVisual } from "./DayVisual";
import { VerseCard } from "./VerseCard";

export function TodayClient() {
  const todayIndex = useMemo(() => dayIndexFromDate(), []);
  const [index, setIndex] = useState(todayIndex);
  const day = days[index];

  return (
    <div className="page">
      <header className="hero compact">
        <p className="eyebrow">Today</p>
        <h1>{day.title}</h1>
        <p className="lede">Day {day.day} of 7 · how Jesus wants us to live</p>
      </header>

      <ol className="day-dots" aria-label="Seven days">
        {days.map((item, i) => (
          <li key={item.day}>
            <button
              type="button"
              className={i === index ? "dot active" : "dot"}
              aria-label={`Day ${item.day}: ${item.title}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => setIndex(i)}
            >
              {item.day}
            </button>
          </li>
        ))}
      </ol>

      <DayVisual kind={day.visual} title={day.title} />
      <VerseCard verse={day.verse} />

      <section className="live-card">
        <h2>How to live</h2>
        <p>{day.howToLive}</p>
      </section>
      <section className="practice-card">
        <h2>A practice under 2 minutes</h2>
        <p>{day.practice}</p>
      </section>

      <div className="pager">
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 6) % 7)}
          aria-label="Previous day"
        >
          ←
        </button>
        <span>{index === todayIndex ? "This is today’s day" : `Today is day ${todayIndex + 1}`}</span>
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % 7)}
          aria-label="Next day"
        >
          →
        </button>
      </div>
    </div>
  );
}
