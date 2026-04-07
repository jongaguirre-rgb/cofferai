import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-text-inverse pt-20 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute -top-20 left-0 w-80 h-80 rounded-full bg-accent-blue/20 blur-3xl" />
        <div className="absolute -bottom-24 right-0 w-80 h-80 rounded-full bg-accent-green/10 blur-3xl" />
      </div>
      <div className="container">
        {/* Three Column Layout */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Brand */}
          <div>
            <h3 className="font-garamond text-2xl font-bold mb-2 text-text-inverse">cofferai<span className="text-accent-blue-light">.</span></h3>
            <p className="text-sm text-text-inverse/75 max-w-xs">
              Independent financial research across equities, private funds, and startups.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-wider mb-4 text-text-inverse">Navigation</h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: '/research', label: 'Research' },
                { href: '/companies', label: 'Companies' },
                { href: '/funds', label: 'Funds' },
                { href: '/startups', label: 'Startups' },
                { href: '/models', label: 'Models' },
                { href: '/about', label: 'About' },
                { href: '/methodology', label: 'Methodology' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-inverse/70 hover:text-text-inverse transition-colors hover:underline underline-offset-4"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-wider mb-4 text-text-inverse">Legal</h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: '/disclaimer', label: 'Disclaimer' },
                { href: '#privacy', label: 'Privacy Policy' },
                { href: 'mailto:contact@cofferai.com', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-inverse/70 hover:text-text-inverse transition-colors hover:underline underline-offset-4"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Divider */}
        <hr className="relative border-t border-text-inverse/15 mb-6" />

        {/* Copyright */}
        <div className="relative text-center font-sans text-xs text-text-inverse/50">
          <p>© 2026 cofferai.com. All analysis reflects personal views. Not investment advice.</p>
        </div>
      </div>
    </footer>
  );
}
