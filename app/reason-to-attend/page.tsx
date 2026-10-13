"use client";

import { useEffect, useSyncExternalStore } from "react";
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

function ReasonIcon({ kind }: { kind: "connect" | "comply" | "lead" }) {
  if (kind === "connect") {
    return (
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="11" cy="12" r="5" fill="currentColor" />
        <circle cx="21" cy="9" r="5" fill="currentColor" />
        <circle cx="29" cy="14" r="4" fill="currentColor" />
        <path
          d="M3 28c0-5 3-8 8-8s8 3 8 8v3H5a2 2 0 0 1-2-2v-1Zm12-1c0-6 3-10 8-10s8 4 8 10v4H15v-4Z"
          fill="currentColor"
        />
        <circle cx="31" cy="29" r="8" fill="currentColor" />
        <path d="M31 25v8m-4-4h8" stroke="white" strokeWidth="2" />
      </svg>
    );
  }

  if (kind === "comply") {
    return (
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <path
          d="M20 4v28m-9 0h18M8 10h24M20 7l-8 3-6 13h12l-6-13m8 0-6 13h12l-6-13m-12 13a6 6 0 0 0 12 0m0 0a6 6 0 0 0 12 0"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <circle
        cx="14"
        cy="9"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <circle
        cx="27"
        cy="8"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path
        d="M5 25v-3a9 9 0 0 1 18 0v3M20 22v-3a7 7 0 0 1 14 0v3M26 25h10v11H26zM26 29h10M29 33h4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

export function ReasonToAttendSection() {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  );
  const messages = localeMessages[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const reasons = [
    {
      kind: "connect",
      title: messages.reasonConnectTitle,
      description: messages.reasonConnectDescription,
    },
    {
      kind: "comply",
      title: messages.reasonComplyTitle,
      description: messages.reasonComplyDescription,
    },
    {
      kind: "lead",
      title: messages.reasonLeadTitle,
      description: messages.reasonLeadDescription,
    },
  ] as const;

  return (
    <section className="reason-page" id="reason-to-attend" lang={locale}>
      <header className="reason-heading">
        <p>{messages.reasonEyebrow}</p>
        <h1>{messages.reasonTitle}</h1>
      </header>

      <section className="reason-grid" aria-label={messages.reasonTitle}>
        {reasons.map((reason) => (
          <article
            key={reason.kind}
            className={`reason-card reason-card--${reason.kind}`}
          >
            <ReasonIcon kind={reason.kind} />
            <h2>{reason.title}</h2>
            <p>{reason.description}</p>
          </article>
        ))}
      </section>
    </section>
  );
}

export default function ReasonToAttendPage() {
  return (
    <main>
      <ReasonToAttendSection />
    </main>
  );
}
