"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import englishMessages from "../public/locales/en.json";
import frenchMessages from "../public/locales/fr.json";

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

export function FooterSection() {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  );
  const messages = localeMessages[locale];
  const linkGroups = [
    {
      title: messages.footerQuickLinks,
      links: [
        [messages.footerProblem, "#reason-to-attend"],
        [messages.footerHowItWorks, "#agenda"],
        [messages.footerMission, "#about"],
        [messages.footerFieldAgent, "#register"],
      ],
    },
    {
      title: messages.footerForYou,
      links: [
        [messages.footerFarmers, "#partners"],
        [messages.footerCooperatives, "#partners"],
        [messages.footerBuyers, "#partners"],
        [messages.footerManage, "#partners"],
      ],
    },
    {
      title: messages.footerDidiAgric,
      links: [
        [messages.footerAboutUs, "#about"],
        [messages.footerFinance, "#partners"],
        [messages.footerInsurance, "#partners"],
        [messages.footerDonate, "#sponsorship"],
        [messages.footerPartner, "#sponsorship"],
      ],
    },
    {
      title: messages.footerSupport,
      links: [
        [messages.footerWhatsApp, "#register"],
        [messages.footerContact, "#register"],
      ],
    },
  ] as const;

  return (
    <footer className="landing-footer" id="footer" lang={locale}>
      <div className="footer-columns">
        <div className="footer-brand">
          <Image
            src="/images/logo black 2.png"
            alt={messages.logoAlt}
            width={127}
            height={42}
          />
          <p>{messages.footerTagline}</p>
        </div>

        {linkGroups.map((group) => (
          <nav
            className="footer-column"
            key={group.title}
            aria-label={group.title}
          >
            <h2>{group.title}</h2>
            <ul>
              {group.links.map(([label, href]) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="footer-legal">
        <span>{messages.footerCopyright}</span>
        <a href="#footer">{messages.footerPrivacy}</a>
        <a href="#footer">{messages.footerDataPolicy}</a>
        <div
          className="footer-language"
          aria-label={messages.languageSelection}
        >
          <button
            type="button"
            aria-label={messages.languageEnglish}
            aria-pressed={locale === "en"}
            onClick={() => saveLocale("en")}
          >
            EN
          </button>
          <span aria-hidden="true">|</span>
          <button
            type="button"
            aria-label={messages.languageFrench}
            aria-pressed={locale === "fr"}
            onClick={() => saveLocale("fr")}
          >
            FR
          </button>
        </div>
      </div>
    </footer>
  );
}
