import { Benchmark } from "./components/Benchmark";
import { CallToAction } from "./components/CallToAction";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Navbar } from "./components/Navbar";
import { Roadmap } from "./components/Roadmap";
import { Solution } from "./components/Solution";
import { ScrollToTop } from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Solution />
        <HowItWorks />
        <Benchmark />
        <Roadmap />
        <CallToAction />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
