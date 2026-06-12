import { createFileRoute } from "@tanstack/react-router";
import { usePageClass } from "@/hooks/usePageClass";
import { SiteHeader } from "@/components/site/SiteHeader";
import { FollowStrip } from "@/components/site/FollowStrip";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SectionHeading } from "@/components/site/SectionHeading";
import { HeroSlider } from "@/components/site/HeroSlider";
import { PortfolioCard } from "@/components/site/PortfolioCard";
import { TeamSection } from "@/components/home/TeamSection";
import { ActivitiesSection } from "@/components/home/ActivitiesSection";
import { AnnouncementsSection } from "@/components/home/AnnouncementsSection";
import { asset } from "@/data/site";
import { portfolio } from "@/data/content";
import { partners } from "@/data/content";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Welcome to Avalook" }] }),
  component: Home,
});

function Home() {
  usePageClass("home-page");

  return (
    <>
      <div className="page-bg" />
      <SiteHeader variant="home" />
      <main>
        <HeroSlider />

        <section className="section about who-we-are-section">
          <div className="about-grid who-we-are-grid" id="about">
            <div className="about-art who-we-are-mark">
              <img src={asset("437529_71632d0aaaa14c99888067c778e44511~mv2.png")} alt="Who we are" />
            </div>
            <div className="about-copy who-we-are-copy">
              <p>
                Avalook is a forward-thinking creative brand from Vietnam, pushing the boundaries
                of Intellectual Property through books, comics, animations, and digital assets.
              </p>
              <p>
                Our mission is to explore new virtual worlds and immersive experiences, connecting
                with audiences globally. With bold creativity and a passion for innovation, Avalook
                is shaping the future of IP and unlocking limitless possibilities.
              </p>
            </div>
          </div>
        </section>

        <section className="section portfolio">
          <SectionHeading id="portfolio">Portfolio</SectionHeading>
          <div className="portfolio-grid">
            {portfolio.map((card, i) => (
              <PortfolioCard key={i} card={card} />
            ))}
          </div>
        </section>

        <section className="section partners">
          <SectionHeading id="partners">Our partners</SectionHeading>
          <div className="logo-grid">
            {partners.map((partner) => (
              <div className="partner-card" key={partner.name}>
                <img src={partner.image} alt={`${partner.name} logo`} />
              </div>
            ))}
          </div>
        </section>

        <TeamSection />
        <ActivitiesSection />
        <AnnouncementsSection />
      </main>
      <FollowStrip />
      <SiteFooter variant="home" />
    </>
  );
}
