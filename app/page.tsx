import { AboutSection } from "./about/page";
import { LandingHomeSection } from "./landing/page";
import { ReasonToAttendSection } from "./reason-to-attend/page";
import { OurSpeakersSection } from "./our-speakers/page";
import { AgendaSection } from "./agenda/page";
import { SponsorshipSection } from "./sponsorship-section";
import { PartnersSection } from "./partners-section";
import { RegisterSection } from "./register-section";
import { FooterSection } from "./footer-section";
import { LandingHeader } from "./landing/header";

export default function Home() {
  return (
    <>
      <LandingHeader />
      <main className="landing-sequence">
        <LandingHomeSection />
        <AboutSection />
        <ReasonToAttendSection />
        <OurSpeakersSection />
        <AgendaSection />
        <SponsorshipSection />
        <PartnersSection />
        <RegisterSection />
        <FooterSection />
      </main>
    </>
  );
}
