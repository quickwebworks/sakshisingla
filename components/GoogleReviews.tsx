import { ExternalLink, Star } from 'lucide-react';

const googleReviewsUrl = 'https://www.google.com/search?q=Dietitian+Sakshi+Singla&stick=H4sIAAAAAAAA_-NgU1I1qDC2NEhLTUpOSTNIskxLNjW3MqgwNTQ3MjIxMjQxNUtNMbc0XsQq7pKZWpJZkpmYpxCcmF2ckakQnJmXnpMIAO9OQP5DAAAA&hl=en-GB&mat=CUhTnMlQAjWAElcBa0lj_xpwBzc1QhJANBZl81BbNau6roj0PAy5itmuKhXIyn9KLj-APlu_iTIKBxBHD_uBmraDnLcLG4i8s-m6W5kuE3ePGFHgdhI5Ta4vGFYEcFzy7UY&authuser=0&ved=2ahUKEwis8Pj3m9CWAxUKieEIHeRXIP8Q-MgIegQILhAe';

export default function GoogleReviews() {
  return (
    <section className="relative py-20 lg:py-28 bg-warm-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        <div className="rounded-3xl border border-sage/35 bg-ivory p-8 md:p-12 text-center shadow-sm">
          <div className="inline-flex items-center gap-2 text-sage-dark mb-5">
            <Star size={18} fill="currentColor" />
            <span className="text-[11px] tracking-[0.25em] uppercase font-semibold">Google Reviews</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-forest-deep mb-4">Hear From Sakshi&apos;s Clients</h2>
          <p className="max-w-xl mx-auto text-charcoal-soft leading-relaxed mb-8">
            Read the latest verified experiences and feedback on Google.
          </p>
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-primary inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-[15px]"
          >
            <span>Read Reviews on Google</span>
            <ExternalLink size={16} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </section>
  );
}