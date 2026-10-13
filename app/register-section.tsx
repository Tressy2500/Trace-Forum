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

export function RegisterSection() {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  );
  const messages = localeMessages[locale];
  const countdown = [
    { value: "140", label: messages.countdownDays },
    { value: "40", label: messages.countdownHours },
    { value: "60", label: messages.countdownMinutes },
    { value: "12", label: messages.countdownSeconds },
  ];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <section className="register-section" id="register" lang={locale}>
      <div className="register-content">
        <div className="register-copy">
          <h2>{messages.registerSectionTitle}</h2>
          <p>{messages.registerSectionDescription}</p>
          <a className="register-cta" href="#footer">
            {messages.registerSectionButton}
          </a>
        </div>

        <div className="countdown-panel" aria-label={messages.countdownTitle}>
          <p>{messages.countdownTitle}</p>
          <dl className="countdown-grid">
            {countdown.map((item) => (
              <div className="countdown-item" key={item.label}>
                <dt>{item.value}</dt>
                <dd>{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
