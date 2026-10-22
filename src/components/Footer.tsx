/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrandLogo } from './BrandLogo';
import { LegalModalType } from '../types';
import { ShieldCheck, HardDrive, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenLegalModal: (m: LegalModalType) => void;
  onOpenEarlyAccess: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLegalModal,
  onOpenEarlyAccess,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101C2D] text-white pt-16 pb-12 border-t border-white/10 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" theme="dark" />
            
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              The motion-led, offline-first personal financial operating system. Organize your entire financial life, understand where your money goes, and plan what comes next.
            </p>

            <div className="space-y-1 text-xs text-[#19B99A] font-semibold">
              <div>Built for real life. Not just expense tracking.</div>
              <div>Plan better. Live freer.</div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Offline SQLite Core: Fully Operational</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Product & OS
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#how-it-works" className="hover:text-[#19B99A] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#offline-engine" className="hover:text-[#19B99A] transition-colors">
                  Offline Engine
                </a>
              </li>
              <li>
                <a href="#financial-planning" className="hover:text-[#19B99A] transition-colors">
                  Flexible Budgeting
                </a>
              </li>
              <li>
                <a href="#ai-copilot" className="hover:text-[#19B99A] transition-colors">
                  AI Financial Copilot
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenEarlyAccess}
                  className="text-[#19B99A] hover:underline font-bold"
                >
                  Join Early Access →
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Transparency & Legal
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('privacy')}
                  className="hover:text-[#19B99A] transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('terms')}
                  className="hover:text-[#19B99A] transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('data_safety')}
                  className="hover:text-[#19B99A] transition-colors text-left"
                >
                  Data Safety Architecture
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('licenses')}
                  className="hover:text-[#19B99A] transition-colors text-left"
                >
                  Open Source Licenses
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('account_deletion')}
                  className="hover:text-[#19B99A] transition-colors text-left"
                >
                  Account & Data Deletion
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Community */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Support & Inquiries
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('contact')}
                  className="hover:text-[#19B99A] transition-colors text-left"
                >
                  Contact Support
                </button>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#19B99A] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li className="pt-2 text-[11px] text-slate-400">
                Official releases distributed via signed APK and Apple TestFlight invitations.
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} Octopus Organizer. All rights reserved. Designed for local financial sovereignty.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
