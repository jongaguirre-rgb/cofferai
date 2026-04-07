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
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-bg-primary border-b border-border-light transition-shadow duration-200 hover:shadow-sm">
        <div className="container h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-garamond text-2xl font-bold text-text-primary hover:!no-underline">
            cofferai
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-nav font-nav uppercase tracking-wider transition-colors hover:!no-underline ${
                  isActive(link.href)
                    ? 'text-text-primary border-b-2 border-accent-blue'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.label}
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
        <div className="fixed inset-0 top-16 z-40 md:hidden bg-bg-primary flex flex-col items-center justify-start pt-12 gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`font-sans text-2xl font-nav uppercase transition-colors hover:!no-underline ${
                isActive(link.href) ? 'text-accent-blue' : 'text-text-primary'
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
