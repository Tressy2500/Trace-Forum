"use client";

import Image from "next/image";
import { useEffect, useSyncExternalStore } from "react";
import { LandingHeader } from "../landing/header";
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

export function AboutSection() {
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
    <section className="about-layout" id="about" lang={locale}>
      <div className="about-photo">
        <Image
          src="/images/about_image.png"
          alt={messages.aboutImageAlt}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 39vw"
        />
      </div>

      <section className="about-panel" aria-labelledby="about-title">
        <p className="about-eyebrow">{messages.aboutEyebrow}</p>
        <h1 id="about-title">{messages.aboutTitle}</h1>
        <p className="about-description">{messages.aboutDescription}</p>

        <dl className="about-stats">
          <div className="about-stat">
            <dt>{messages.aboutStatDelegates}</dt>
            <dd>{messages.aboutStatDelegatesLabel}</dd>
          </div>
          <div className="about-stat">
            <dt>{messages.aboutStatLeaders}</dt>
            <dd>{messages.aboutStatLeadersLabel}</dd>
          </div>
          <div className="about-stat">
            <dt>{messages.aboutStatConclaves}</dt>
            <dd>{messages.aboutStatConclavesLabel}</dd>
          </div>
          <div className="about-stat">
            <dt>{messages.aboutStatNations}</dt>
            <dd>{messages.aboutStatNationsLabel}</dd>
          </div>
        </dl>
      </section>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <LandingHeader />
      <main>
        <AboutSection />
      </main>
    </>
  );
}
