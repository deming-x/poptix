import HeroSection from "@/components/home/HeroSection";
import EventList from "@/components/home/EventList";
import GuaranteeSection from "@/components/home/GuaranteeSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Top Events Section */}
      <EventList title="Top Events" />

      {/* Recent Events Section */}
      <EventList title="Recent Events" />

      {/* Guarantee Section */}
      <GuaranteeSection />
    </div>
  );
}
