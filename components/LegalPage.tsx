import Header from '@/components/Header';
import Footer from '@/components/Footer';

export type LegalSection = {
  title?: string;
  paragraphs: string[];
};

type LegalPageProps = {
  title: string;
  lastUpdated: string;
  intro?: string[];
  sections: LegalSection[];
};

export default function LegalPage({ title, lastUpdated, intro = [], sections }: LegalPageProps) {
  return (
    <>
      <Header />
      <main className="pt-28 pb-20 md:pt-32">
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <div className="mb-10">
            <span className="kicker">Legal</span>
            <h1 className="font-display text-4xl md:text-5xl text-forest mt-4">{title}</h1>
            <p className="mt-4 text-sm text-charcoal/60">Last updated: {lastUpdated}</p>
          </div>

          <article className="bg-warm-white/70 border border-sage/30 rounded-[28px] p-6 md:p-10 shadow-[0_18px_55px_-28px_rgba(31,51,41,0.25)]">
            {intro.length > 0 && (
              <div className="space-y-4 text-base leading-8 text-charcoal/80 mb-12">
                {intro.map((paragraph, index) => (
                  <p key={`${title}-intro-${index}`}>{paragraph}</p>
                ))}
              </div>
            )}

            <div className="space-y-10">
              {sections.map((section, index) => (
                <section key={`${section.title ?? 'section'}-${index}`} className="space-y-4">
                  {section.title && (
                    <h2 className="text-xl md:text-2xl font-semibold text-forest font-display leading-snug">
                      {section.title}
                    </h2>
                  )}
                  <div className="space-y-4 text-base leading-8 text-charcoal/80">
                    {section.paragraphs.map((paragraph, paraIndex) => (
                      <p key={`${section.title ?? 'section'}-${index}-p-${paraIndex}`}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
