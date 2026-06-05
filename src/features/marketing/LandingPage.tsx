import { Benchmark } from "./components/Benchmark";
import { CallToAction } from "./components/CallToAction";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Roadmap } from "./components/Roadmap";
import { Solution } from "./components/Solution";
import { Team } from "./components/Team";
import { Footer } from "@/shared/layout/Footer";
import { Navbar } from "@/shared/layout/Navbar";
import { ScrollToTop } from "@/shared/layout/ScrollToTop";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Solution />
        <HowItWorks />
        <Benchmark />
        <Roadmap />
        <Team />
        <CallToAction />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
