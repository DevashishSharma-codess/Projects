import { useEffect, lazy, Suspense } from "react";
import { Navbar } from "../../layout/Navbar";

const Footer = lazy(() => import("../../layout/Footer"));
const About = lazy(() => import("../about/About"));
const HowWeWork = lazy(() => import("./HowWeWork"));

export const HowWeWorkPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans relative selection:bg-white selection:text-black overflow-x-hidden">
      <Navbar isDarkPage={true} />

      <main className="relative z-10 pt-20 sm:pt-24 pb-16 select-none">
        <Suspense fallback={null}>
          <section id="about" className="mb-12 sm:mb-16">
            <About />
          </section>

          <section id="how-we-work">
            <HowWeWork />
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

