/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  ShieldCheck, 
  FileText, 
  X, 
  CheckCircle2, 
  Send,
  Lock,
  Download
} from 'lucide-react';
import { LegalModalType } from '../types';

interface FAQAndLegalProps {
  activeModal: LegalModalType;
  onCloseModal: () => void;
  onOpenModal: (m: LegalModalType) => void;
}

export const FAQAndLegal: React.FC<FAQAndLegalProps> = ({
  activeModal,
  onCloseModal,
  onOpenModal,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Contact form state inside modal
  const [contactSent, setContactSent] = useState<boolean>(false);
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactMsg, setContactMsg] = useState<string>('');

  const faqs = [
    {
      q: 'Can I use Octopus Organizer without an internet connection?',
      a: 'Yes, absolutely. The core ledger runs on a local SQLite database using WatermelonDB directly on your device storage. You can add transactions, check budget balances, categorize expenses, and review your net worth completely offline without zero bars of connectivity.',
    },
    {
      q: 'How does online synchronisation work?',
      a: 'When your device is online, Octopus initiates an encrypted delta sync. It only synchronises changes (deltas) made since your last connection, utilizing high-watermark vector clocks to resolve any conflicting edits across multiple devices cleanly.',
    },
    {
      q: 'Does the application require my bank-login credentials?',
      a: 'No, never. Octopus Organizer never asks for your internet banking username, password, or SMS OTPs. You can maintain transactions manually or import standard e-statements directly without third-party screen scraping.',
    },
    {
      q: 'How do bank-statement imports work?',
      a: 'When you import a statement (PDF or CSV), parsing occurs entirely inside your local client memory. The raw file is parsed by regex pattern matchers into standardized ledger entries without ever leaving your machine.',
    },
    {
      q: 'Which bank statement formats are supported?',
      a: 'Verified format support currently includes standard retail statements from HDFC Bank, ICICI Bank, State Bank of India (SBI), and Axis Bank. Additional formats are added iteratively during the preview cycle.',
    },
    {
      q: 'How does AI Copilot process financial information?',
      a: 'Copilot runs via cloud Google Gemini AI. When you explicitly ask a question in the chat interface, only necessary summarized context metrics (e.g., category totals, monthly burn) are transmitted securely over TLS. Your queries are ephemeral and never used to train public models.',
    },
    {
      q: 'Can I use my own AI provider (BYOK)?',
      a: 'Bring Your Own Key (BYOK) support is currently on our beta roadmap. It will allow advanced users to plug in their own Gemini API keys directly into local settings for custom rate limits and models.',
    },
    {
      q: 'How can I export or delete my data?',
      a: 'Octopus enforces zero vendor lock-in. You can export your full transaction history at any time as JSON, CSV, or raw SQLite database files. You can also trigger an unconditional account wipe anytime from the settings.',
    },
    {
      q: 'Which platforms and capabilities are currently supported?',
      a: 'The local-first core, budget management, net worth tracking, bill scheduling, and statement import are fully operational. Early preview builds are accessible for Android (APK), iOS (TestFlight), and modern desktop web browsers.',
    },
    {
      q: 'Which features are in beta or planned roadmap?',
      a: 'Voice-based conversational quick entry, native mobile home-screen widgets, multi-member family permission sharing, and major purchase cooling-off algorithms are currently in beta/roadmap development.',
    },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail.trim() || !contactMsg.trim()) return;
    setContactSent(true);
  };

  return (
    <section id="faq" className="py-24 bg-white border-b border-[#E1E8E4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Header */}
        <div className="space-y-3 mb-14 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#07856D]">
            <HelpCircle className="w-4 h-4" />
            <span>Clear Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101C2D] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-[#637184] max-w-2xl mx-auto leading-relaxed">
            Honest answers regarding how Octopus Organizer operates, protects your privacy, and handles your financial data.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#E1E8E4] bg-[#F7F8F4] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-[#101C2D] hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#07856D]"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#637184] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#07856D]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#637184] leading-relaxed border-t border-[#E1E8E4]/60 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* FULL LEGAL / SUPPORT MODAL VIEWER */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl border border-[#E1E8E4] shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden text-left">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#101C2D] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#19B99A]" />
                <span className="text-sm font-bold capitalize">
                  {activeModal.replace('_', ' ')}
                </span>
              </div>
              <button
                type="button"
                onClick={onCloseModal}
                className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#101C2D]/85 leading-relaxed">
              
              {activeModal === 'privacy' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-[#101C2D]">Privacy Policy (Octopus Organizer)</h3>
                  <p>
                    <strong>1. Local-First Ledger:</strong> Your core transactions, budget rules, categories, and account balances are stored locally on your device in a private SQLite database managed via WatermelonDB.
                  </p>
                  <p>
                    <strong>2. Zero Data Monetization:</strong> We do not sell, rent, broker, or monetize your personal financial data or transaction history to third-party advertisers or loan brokers.
                  </p>
                  <p>
                    <strong>3. AI Data Boundary:</strong> When you invoke Copilot, summarized numerical context is transmitted over TLS to Google Gemini. Your financial prompts are not logged for model training.
                  </p>
                  <p>
                    <strong>4. Bank Passwords:</strong> Octopus never stores or transmits bank account passwords or netbanking credentials.
                  </p>
                </div>
              )}

              {activeModal === 'terms' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-[#101C2D]">Terms of Service</h3>
                  <p>
                    <strong>1. Informational Purposes:</strong> Octopus Organizer is a personal financial operating system designed for self-organization, record-keeping, and budgeting awareness. It does not provide certified financial advisory or legal tax advice.
                  </p>
                  <p>
                    <strong>2. User Responsibility:</strong> You retain responsibility for maintaining local device security, backing up exports, and verifying tax figures with a professional.
                  </p>
                  <p>
                    <strong>3. Early Access Preview:</strong> Preview releases may introduce schema updates and evolutionary improvements.
                  </p>
                </div>
              )}

              {activeModal === 'data_safety' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-[#101C2D]">Data Safety Architecture</h3>
                  <p>
                    <strong>On-Device Encryption:</strong> Database files are protected by OS-level file protection (iOS Data Protection / Android Encrypted SQLite).
                  </p>
                  <p>
                    <strong>Transport Security:</strong> All remote synchronization and AI query channels enforce TLS 1.3 with strict certificate pinning.
                  </p>
                  <p>
                    <strong>Ephemeral AI Pipeline:</strong> Cloud AI queries execute in volatile memory with zero server-side cache persistence.
                  </p>
                </div>
              )}

              {activeModal === 'licenses' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-[#101C2D]">Open Source Attributions</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>WatermelonDB:</strong> MIT License · Nozbe</li>
                    <li><strong>SQLite:</strong> Public Domain</li>
                    <li><strong>React & React DOM:</strong> MIT License · Meta Platforms</li>
                    <li><strong>Lucide Icons:</strong> ISC License</li>
                    <li><strong>Tailwind CSS:</strong> MIT License</li>
                  </ul>
                </div>
              )}

              {activeModal === 'account_deletion' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-[#101C2D]">Data & Account Deletion Guarantee</h3>
                  <p>
                    Because Octopus Organizer stores your core records on your device, you have immediate control over your data:
                  </p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li><strong>Local Wipe:</strong> Go to Settings → Database → "Erase Local Ledger". This immediately purges the SQLite database.</li>
                    <li><strong>Cloud Sync Purge:</strong> Clicking "Delete Account & Sync Relay" triggers a cryptographically permanent deletion of your delta relay records within 24 hours.</li>
                  </ol>
                </div>
              )}

              {activeModal === 'contact' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-[#101C2D]">Contact Support & Development Team</h3>
                  {contactSent ? (
                    <div className="p-4 bg-[#E2F5ED] text-[#07856D] rounded-xl text-center space-y-1">
                      <CheckCircle2 className="w-6 h-6 mx-auto" />
                      <div className="font-bold">Message Received!</div>
                      <p className="text-xs">Our engineering team will respond to {contactEmail} shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#101C2D] mb-1">Your Email</label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="you@domain.com"
                          className="w-full border border-[#E1E8E4] rounded-lg p-2.5 text-xs text-[#101C2D]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#101C2D] mb-1">Inquiry or Feedback</label>
                        <textarea
                          rows={3}
                          required
                          value={contactMsg}
                          onChange={(e) => setContactMsg(e.target.value)}
                          placeholder="How can we assist you with Octopus Organizer?"
                          className="w-full border border-[#E1E8E4] rounded-lg p-2.5 text-xs text-[#101C2D]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-[#07856D] hover:bg-[#066c59] text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </button>
                    </form>
                  )}
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-[#F7F8F4] border-t border-[#E1E8E4] flex justify-end">
              <button
                type="button"
                onClick={onCloseModal}
                className="px-4 py-2 text-xs font-bold text-[#101C2D] bg-white border border-[#E1E8E4] rounded-lg hover:bg-slate-50"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
