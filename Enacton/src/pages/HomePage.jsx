import { lazy, Suspense } from "react";
import { Grain } from "../components/common/Grain";
import { Navbar } from "../components/layout/Navbar";
import { Hero } from "../components/features/hero/Hero";

const WhatWeDo = lazy(() => import("../components/features/what-we-do/WhatWeDo"));
const MarqueeStrip = lazy(() => import("../components/features/marquees/MarqueeStrip"));
const ProductShowcase = lazy(() => import("../components/features/products/ProductShowcase"));
const About = lazy(() => import("../components/features/about/About"));
const HowWeWork = lazy(() => import("../components/features/how-we-work/HowWeWork"));
const BookingSection = lazy(() => import("../components/features/booking/BookingSection"));
const FeaturedTestimonial = lazy(() => import("../components/features/testimonials/FeaturedTestimonial"));
const Testimonials = lazy(() => import("../components/features/testimonials/Testimonials"));
const WisprFlowMarquee = lazy(() => import("../components/features/marquees/WisprFlowMarquee"));
const Footer = lazy(() => import("../components/layout/Footer"));

export function HomePage() {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans relative selection:bg-ink selection:text-paper overflow-x-hidden">
      <Grain />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <WhatWeDo />
          <MarqueeStrip />
          <ProductShowcase />
          <About />
          <HowWeWork />
          <BookingSection />
          <FeaturedTestimonial />
          <Testimonials />
          <WisprFlowMarquee />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}

export default HomePage;

