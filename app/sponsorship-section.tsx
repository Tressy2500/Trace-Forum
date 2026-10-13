"use client";

import { useEffect, useSyncExternalStore } from "react";
import englishMessages from "../public/locales/en.json";
import frenchMessages from "../public/locales/fr.json";

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

export function SponsorshipSection() {
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
    <section className="sponsor-section" id="sponsorship" lang={locale}>
      <div className="sponsor-panel">
        <div className="sponsor-copy">
          <p className="sponsor-eyebrow">{messages.sponsorEyebrow}</p>
          <h2>{messages.sponsorTitle}</h2>
          <p className="sponsor-description">
            {messages.reasonConnectDescription}
          </p>
          <a className="sponsor-cta" href="#footer">
            {messages.sponsorCta}
          </a>
        </div>
        <div
          className="sponsor-photo"
          role="img"
          aria-label={messages.sponsorImageAlt}
        />
      </div>
    </section>
  );
}
