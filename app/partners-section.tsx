"use client";

import Image from "next/image";
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

export function PartnersSection() {
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
    <section className="partners-section" id="partners" lang={locale}>
      <h2>{messages.partnersTitle}</h2>
      <div className="partner-grid" aria-label={messages.partnersTitle}>
        {Array.from({ length: 7 }, (_, index) => (
          <figure className="partner-item" key={`cova-${index}`}>
            <Image
              src="/images/cova.png"
              alt={messages.partnerLogoAlt}
              width={161}
              height={52}
            />
            <figcaption>{messages.partnerCovaName}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
