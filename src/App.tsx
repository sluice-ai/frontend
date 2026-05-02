import { Benchmark } from "./components/Benchmark";
import { CallToAction } from "./components/CallToAction";
import { Customers } from "./components/Customers";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Navbar } from "./components/Navbar";
import { Roadmap } from "./components/Roadmap";
import { Solution } from "./components/Solution";
import { WhyDifferent } from "./components/WhyDifferent";
import { WhyNow } from "./components/WhyNow";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyNow />
        <Solution />
        <HowItWorks />
        <Benchmark />
        <WhyDifferent />
        <Customers />
        <Roadmap />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
