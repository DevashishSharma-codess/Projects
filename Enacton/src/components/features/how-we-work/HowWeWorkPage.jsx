import { useEffect, lazy, Suspense } from "react";
import { Navbar } from "../../layout/Navbar";

const Footer = lazy(() => import("../../layout/Footer"));
const About = lazy(() => import("../about/About"));
const HowWeWork = lazy(() => import("./HowWeWork"));
const ArchitectureGrid = lazy(() => import("./HowWeWork").then(m => ({ default: m.ArchitectureGrid })));

export const HowWeWorkPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans relative selection:bg-white selection:text-black overflow-x-hidden">
      <Navbar isDarkPage={true} />

      <main className="relative z-10 pt-20 sm:pt-24 pb-16 select-none">
        <Suspense fallback={null}>
          <section id="how-we-work">
            <HowWeWork />
          </section>

          <section id="about">
            <About />
          </section>

          <section id="architecture">
            <ArchitectureGrid />
          </section>
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default HowWeWorkPage;

