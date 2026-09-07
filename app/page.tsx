import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import HealthMystery from '@/components/HealthMystery';
import HowItWorks from '@/components/HowItWorks';
import Packages from '@/components/Packages';
import WhySakshi from '@/components/WhySakshi';
import Testimonials from '@/components/Testimonials';
import GoogleReviews from '@/components/GoogleReviews';
import FinalCTA from '@/components/FinalCTA';
import InvestigationLine from '@/components/InvestigationLine';
import StickyCTA from '@/components/StickyCTA';
import ExitIntent from '@/components/ExitIntent';

// Do not let a CDN retain HTML from an older release after its hashed assets
// have been replaced. The assets themselves remain immutable and cacheable.
export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <>
      <Header />
      <InvestigationLine />
      <main>
        <Hero />
        <HealthMystery />
        <HowItWorks />
        <Packages />
        <WhySakshi />
        <Testimonials />
        <GoogleReviews />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
      <ExitIntent />
    </>
  );
}
