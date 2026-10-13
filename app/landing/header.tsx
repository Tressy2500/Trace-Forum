"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import englishMessages from "../../public/locales/en.json";
import frenchMessages from "../../public/locales/fr.json";

type Locale = "en" | "fr";

const localeMessages: Record<Locale, typeof englishMessages> = {
  en: englishMessages,
  fr: frenchMessages,
};

const localeChangedEvent = "trace-forum-locale-change";

function subscribeToLocale(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(localeChangedEvent, listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(localeChangedEvent, listener);
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

function saveLocale(locale: Locale) {
  window.localStorage.setItem("trace-forum-locale", locale);
  window.dispatchEvent(new Event(localeChangedEvent));
}

export function LandingHeader() {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  );
  const messages = localeMessages[locale];

  return (
    <header className="landing-header">
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

      <div className="topbar">
        <a className="brand" href="#home" aria-label={messages.homeLink}>
          <Image
            src="/images/logo black 2.png"
            alt={messages.logoAlt}
            className="brand-logo"
            width={160}
            height={40}
            priority
          />
        </a>

        <nav className="main-nav" aria-label={messages.navigationLabel}>
          <a href="#home">{messages.homeLink}</a>
          <a href="#about">{messages.aboutLink}</a>
          <a href="#agenda">{messages.programmesLink}</a>
          <a href="#reason-to-attend">{messages.participateLink}</a>
          <a href="#partners">{messages.partnersLink}</a>
          <a href="#footer">{messages.insightsLink}</a>
        </nav>

        <div className="header-actions">
          <a className="secondary-btn" href="#sponsorship">
            {messages.becomePartner}
          </a>
          <a className="primary-btn" href="#register">
            {messages.attendForum}
          </a>
        </div>
      </div>
    </header>
  );
}
