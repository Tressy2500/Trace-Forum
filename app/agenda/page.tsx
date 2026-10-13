"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import englishMessages from "../../public/locales/en.json";
import frenchMessages from "../../public/locales/fr.json";

type Locale = "en" | "fr";

const localeMessages: Record<Locale, typeof englishMessages> = {
  en: englishMessages,
  fr: frenchMessages,
};

function subscribeToLocale(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener("trace-forum-locale-change", listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener("trace-forum-locale-change", listener);
  };
}

function getLocaleSnapshot(): Locale {
  return window.localStorage.getItem("trace-forum-locale") === "fr"
    ? "fr"
    : "en";
}

function getServerLocaleSnapshot(): Locale {
  return "en";
}

export function AgendaSection() {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  );
  const [activeDay, setActiveDay] = useState(0);
  const messages = localeMessages[locale];
  const dates = [
    messages.agendaDate1,
    messages.agendaDate2,
    messages.agendaDate3,
  ];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <section className="agenda-page" id="agenda" lang={locale}>
      <h1>{messages.agendaTitle}</h1>

      <div className="agenda-controls">
        <div
          className="agenda-tabs"
          role="tablist"
          aria-label={messages.agendaTitle}
        >
          {dates.map((date, dayIndex) => (
            <button
              key={date}
              id={`agenda-tab-${dayIndex}`}
              type="button"
              role="tab"
              aria-selected={activeDay === dayIndex}
              aria-controls="agenda-schedule"
              onClick={() => setActiveDay(dayIndex)}
            >
              {date}
            </button>
          ))}
        </div>
        <a className="agenda-view-all" href="#agenda-schedule">
          {messages.agendaViewAll}
        </a>
      </div>

      <section
        className="agenda-list"
        id="agenda-schedule"
        role="tabpanel"
        aria-labelledby={`agenda-tab-${activeDay}`}
      >
        {Array.from({ length: 4 }, (_, scheduleIndex) => (
          <article className="agenda-row" key={scheduleIndex}>
            <div className="agenda-times" aria-label={messages.agendaTimes}>
              <span>{messages.agendaStartTime}</span>
              <span>{messages.agendaEndTime}</span>
            </div>

            <div className="agenda-session">
              <p className="agenda-session-type">{messages.agendaKeynote}</p>
              <h2>{messages.agendaSessionTitle}</h2>
            </div>

            <aside className="agenda-speaker">
              <div className="agenda-speaker-photo">
                <Image
                  src="/images/Frame 1171276299 (2).png"
                  alt={messages.speakerSanchoName}
                  fill
                  sizes="(max-width: 600px) 112px, 175px"
                />
              </div>
              <div className="agenda-speaker-copy">
                <h3>{messages.speakerSanchoName}</h3>
                <p>{messages.speakerSanchoRole}</p>
              </div>
            </aside>
          </article>
        ))}
      </section>

      <div className="agenda-footer">
        <a href="#agenda-schedule">{messages.agendaComplete}</a>
      </div>
    </section>
  );
}

export default function AgendaPage() {
  return (
    <main>
      <AgendaSection />
    </main>
  );
}
