'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/research', label: 'Research' },
    { href: '/companies', label: 'Companies' },
    { href: '/funds', label: 'Funds' },
    { href: '/startups', label: 'Startups' },
    { href: '/models', label: 'Models' },
    { href: '/about', label: 'About' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 glass-panel border-b border-border-light/90 transition-shadow duration-200">
        <div className="container h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-garamond text-2xl font-bold text-text-primary hover:!no-underline leading-none">
            cofferai<span className="text-accent-blue">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 font-sans text-nav font-nav uppercase tracking-wider transition-colors hover:!no-underline ${
                  isActive(link.href)
                    ? 'text-text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-0 -bottom-2 h-[2px] bg-accent-blue transition-all duration-200 ${
                    isActive(link.href) ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text-primary hover:bg-bg-secondary rounded transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 md:hidden bg-bg-primary/95 backdrop-blur-sm flex flex-col items-center justify-start pt-10 px-6 gap-5 soft-grid-bg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full max-w-sm border border-border-light px-4 py-3 text-center font-sans text-xl font-nav uppercase transition-colors hover:!no-underline ${
                isActive(link.href)
                  ? 'text-accent-blue bg-bg-secondary'
                  : 'text-text-primary bg-bg-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
