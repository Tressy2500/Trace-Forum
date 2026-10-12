"use client";

import { useEffect, useSyncExternalStore } from "react";
import englishMessages from "../public/locales/en.json";
import frenchMessages from "../public/locales/fr.json";

type Locale = "en" | "fr";

const localeMessages: Record<Locale, typeof englishMessages> = {
  en: englishMessages,
  fr: frenchMessages,
};

const localeStorageKey = "trace-forum-locale";
const localeListeners = new Set<() => void>();

function subscribeToLocale(listener: () => void) {
  localeListeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    localeListeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getLocaleSnapshot(): Locale {
  return window.localStorage.getItem(localeStorageKey) === "fr" ? "fr" : "en";
}

function getServerLocaleSnapshot(): Locale {
  return "en";
}

function saveLocale(locale: Locale) {
  window.localStorage.setItem(localeStorageKey, locale);
  localeListeners.forEach((listener) => listener());
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

export default function Home() {
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
    <div className="page-shell">
      <div className="topbar-strip" aria-label={messages.languageSelection}>
        <button
          type="button"
          aria-label={messages.languageEnglish}
          aria-pressed={locale === "en"}
          onClick={() => saveLocale("en")}
        >
          ENG
        </button>
        <button
          type="button"
          aria-label={messages.languageFrench}
          aria-pressed={locale === "fr"}
          onClick={() => saveLocale("fr")}
        >
          FR
        </button>
      </div>

      <header className="topbar">
        <div className="brand" aria-label={messages.homeLink}>
          <img
            src="/images/logo black 2.png"
            alt={messages.logoAlt}
            className="brand-logo"
          />
        </div>

        <nav className="main-nav" aria-label={messages.navigationLabel}>
          <a href="#">{messages.homeLink}</a>
          <a href="#">{messages.aboutLink}</a>
          <a href="#">{messages.programmesLink}</a>
          <a href="#">{messages.participateLink}</a>
          <a href="#">{messages.partnersLink}</a>
          <a href="#">{messages.insightsLink}</a>
        </nav>

        <div className="header-actions">
          <button type="button" className="secondary-btn">
            {messages.becomePartner}
          </button>
          <button type="button" className="primary-btn">
            {messages.attendForum}
          </button>
        </div>
      </header>

      <main className="hero" lang={locale}>
        <section className="hero-copy">
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
            <button type="button" className="primary-btn large-btn">
              {messages.registerNow}
            </button>
            <button type="button" className="outline-btn large-btn">
              {messages.exploreProgram}
            </button>
          </div>
        </section>

        <div
          className="portrait-cluster"
          aria-label={messages.featuredParticipants}
        >
          {portraits.map((portrait) => (
            <div key={portrait.altKey} className={portrait.className}>
              <img src={portrait.src} alt={messages[portrait.altKey]} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
