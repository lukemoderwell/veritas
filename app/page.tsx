import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { Hero } from '@/components/hero';
import { OurMethod } from '@/components/our-method';
import { CaseStudies } from '@/components/case-studies';
import { Testimonials } from '@/components/testimonials';
import { NextSteps } from '@/components/next-steps';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 w-full">
          <section id="our-method" className="scroll-mt-20">
            <OurMethod />
          </section>
          <section id="case-studies" className="scroll-mt-20">
            <CaseStudies />
          </section>
          <section id="testimonials" className="scroll-mt-20">
            <Testimonials />
          </section>
          <section id="next-steps" className="scroll-mt-20">
            <NextSteps />
          </section>
          <Footer />
        </main>
      </div>
    </div>
  );
}
