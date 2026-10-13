"use client";

import Image from "next/image";
import { useEffect, useSyncExternalStore } from "react";
import { LandingHeader } from "./header";
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

const portraits = [
  {
    src: "/images/Rectangle 5.png",
    altKey: "portraitAlt1",
    className: "portrait portrait-farmer",
  },
  {
    src: "/images/Rectangle 6.png",
    altKey: "portraitAlt2",
    className: "portrait portrait-apron",
  },
  {
    src: "/images/Rectangle 7.png",
    altKey: "portraitAlt3",
    className: "portrait portrait-center",
  },
  {
    src: "/images/Rectangle 8.png",
    altKey: "portraitAlt4",
    className: "portrait portrait-woman",
  },
  {
    src: "/images/Rectangle 9.png",
    altKey: "portraitAlt5",
    className: "portrait portrait-glasses",
  },
] as const;

export function LandingHomeSection() {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  );
  const messages = localeMessages[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <section className="hero" id="home" lang={locale}>
      <div className="hero-copy">
        <p className="event-date">
          <span>{messages.eventDateDays} </span>
          <span className="event-date-highlight">
            {messages.eventDateMonthYear}
          </span>
          <span> {messages.eventDateSeparator} </span>
          <span>{messages.eventDateLocation}</span>
        </p>
        <h1>{messages.title}</h1>
        <p className="event-description">{messages.description}</p>
        <div className="cta-row">
          <a className="primary-btn large-btn" href="#agenda">
            {messages.registerNow}
          </a>
          <a className="outline-btn large-btn" href="#agenda">
            {messages.exploreProgram}
          </a>
        </div>
      </div>

      <div
        className="portrait-cluster"
        aria-label={messages.featuredParticipants}
      >
        {portraits.map((portrait) => (
          <div key={portrait.altKey} className={portrait.className}>
            <Image
              src={portrait.src}
              alt={messages[portrait.altKey]}
              width={125}
              height={189}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <>
      <LandingHeader />
      <main>
        <LandingHomeSection />
      </main>
    </>
  );
}
