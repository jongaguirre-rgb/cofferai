import { Mail, Linkedin } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-20 pb-20">
      <div className="container max-w-article">
        <div className="flex flex-col items-center mb-12">
          <div className="w-48 h-48 rounded-full bg-bg-secondary flex items-center justify-center mb-8">
            <div className="w-32 h-32 rounded-full bg-border-light flex items-center justify-center">
              {/* Placeholder for photo */}
            </div>
          </div>
        </div>

        <h1 className="font-garamond text-5xl font-bold text-center mb-4">Jon Anderson</h1>

        <p className="text-center text-text-secondary text-lg mb-12">
          Columbia University Financial Economics. Independent research on credit markets, venture finance, and public equities.
        </p>

        <div className="flex justify-center gap-6 mb-12">
          <a
            href="https://linkedin.com/in/jonanderson"
            className="flex items-center gap-2 text-accent-blue hover:text-accent-blue-light transition-colors"
          >
            <Linkedin size={20} />
            <span>LinkedIn</span>
          </a>
          <a
            href="mailto:contact@cofferai.com"
            className="flex items-center gap-2 text-accent-blue hover:text-accent-blue-light transition-colors"
          >
            <Mail size={20} />
            <span>Email</span>
          </a>
        </div>

        <hr className="my-12 border-t border-border-light" />

        <div className="mdx-prose mb-12">
          <h2 className="font-garamond text-3xl font-bold mb-6">Background</h2>
          <p>
            This is a placeholder bio section. The site owner will replace this content with their actual background and experience. Include educational background, professional experience, and what drives your interest in financial analysis.
          </p>

          <h2 className="font-garamond text-3xl font-bold mb-6 mt-10">Research Interests</h2>
          <p>
            Key areas of focus and analytical interest will appear here, describing the specific domains and asset classes that are the primary focus of research.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {[
              'Private Credit',
              'Business Development Companies',
              'Venture Lending',
              'Fund Finance',
              'Fintech',
              'Payments',
            ].map((tag) => (
              <span
                key={tag}
                className="inline-block bg-bg-secondary border border-border-light rounded px-3 py-1 text-sm font-semibold text-text-secondary uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
