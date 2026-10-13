"use client";

import Image from "next/image";
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

export function OurSpeakersSection() {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  );
  const messages = localeMessages[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const speakers = [
    {
      image: "/images/Frame 1171276299.png",
      name: messages.speakerJamesName,
      role: messages.speakerJamesRole,
    },
    {
      image: "/images/Frame 1171276299 (1).png",
      name: messages.speakerEkoName,
      role: messages.speakerEkoRole,
    },
    {
      image: "/images/Frame 1171276299 (2).png",
      name: messages.speakerSanchoName,
      role: messages.speakerSanchoRole,
    },
    {
      image: "/images/Frame 1171276300.png",
      name: messages.speakerAsongafagName,
      role: messages.speakerAsongafagRole,
    },
    {
      image: "/images/Frame 1171276299 (3).png",
      name: messages.speakerKumName,
      role: messages.speakerKumRole,
    },
    {
      image: "/images/Frame 1171276299 (4).png",
      name: messages.speakerSammaName,
      role: messages.speakerSammaRole,
    },
    {
      image: "/images/Frame 1171276299 (5).png",
      name: messages.speakerBeryuyName,
      role: messages.speakerBeryuyRole,
    },
    {
      image: "/images/Frame 1171276300 (1).png",
      name: messages.speakerMamboName,
      role: messages.speakerMamboRole,
    },
  ];

  return (
    <section className="speakers-page" id="our-speakers" lang={locale}>
      <header className="speakers-heading">
        <h1>{messages.speakersTitle}</h1>
        <a href="#speaker-grid">{messages.speakersViewAll}</a>
      </header>

      <section
        className="speaker-grid"
        id="speaker-grid"
        aria-label={messages.speakersTitle}
      >
        {speakers.map((speaker) => (
          <article className="speaker-card" key={speaker.name}>
            <div className="speaker-photo">
              <Image
                src={speaker.image}
                alt={speaker.name}
                fill
                sizes="(max-width: 600px) 92vw, (max-width: 980px) 44vw, 23vw"
              />
            </div>
            <h2>{speaker.name}</h2>
            <p>{speaker.role}</p>
          </article>
        ))}
      </section>
    </section>
  );
}

export default function OurSpeakersPage() {
  return (
    <main>
      <OurSpeakersSection />
    </main>
  );
}
