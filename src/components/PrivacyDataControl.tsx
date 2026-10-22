/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  HardDrive, 
  Cloud, 
  Trash2, 
  Download, 
  Key, 
  CheckCircle2, 
  XCircle,
  HelpCircle
} from 'lucide-react';
import { LegalModalType } from '../types';

interface PrivacyDataControlProps {
  onOpenLegalModal: (modal: LegalModalType) => void;
}

export const PrivacyDataControl: React.FC<PrivacyDataControlProps> = ({
  onOpenLegalModal,
}) => {
  const [inspectedFlow, setInspectedFlow] = useState<'local' | 'sync' | 'ai' | 'export'>('local');

  const flows = [
    {
      id: 'local',
      title: 'Local Financial Ledger',
      destination: 'Your Physical Device Storage',
      storageEngine: 'SQLite / WatermelonDB',
      networkState: 'Completely Offline',
      description: 'Your account numbers, transaction histories, expense notes, and budget balances are written to an encrypted local database file on your phone or laptop. No internet required.',
      items: [
        'Raw transaction records',
        'Custom budget categories & notes',
        'Imported bank statement text',
        'Manual cash entries',
      ],
      isCloud: false,
    },
    {
      id: 'sync',
      title: 'Encrypted Delta Synchronisation',
      destination: 'Encrypted Relay Server',
      storageEngine: 'TLS 1.3 / AES-256 GCM',
      networkState: 'Online (Opt-In)',
      description: 'When you choose to sync across your phone and tablet, encrypted differential changes (deltas) are mirrored using end-to-end encryption. Your encryption key is never logged or sold.',
      items: [
        'Differential change logs',
        'Device watermark timestamps',
        'Conflict resolution metadata',
      ],
      isCloud: true,
    },
    {
      id: 'ai',
      title: 'AI Copilot Context Processing',
      destination: 'Google Gemini Cloud API',
      storageEngine: 'Ephemeral RAM (Zero Persistence)',
      networkState: 'Online (Invoked On-Demand)',
      description: 'When you ask Copilot a question, only high-level summarized metrics needed to formulate an answer are sent over secure HTTPS. Your queries are NEVER used to train foundational AI models.',
      items: [
        'Category totals (e.g. ₹14,200 groceries)',
        'Question text submitted by user',
        'Zero banking credentials or passwords',
      ],
      isCloud: true,
    },
    {
      id: 'export',
      title: 'Data Portability & Purge',
      destination: 'Direct User Download / Immediate Delete',
      storageEngine: 'Standard JSON / CSV / SQLite',
      networkState: 'Local Client-Side Action',
      description: 'You can download every byte you ever entered with one tap. If you request account deletion, your cloud sync relay records are scrubbed within 24 hours, and local data is wiped immediately.',
      items: [
        'Complete JSON dump',
        'Full raw SQLite database file',
        'Unconditional account deletion',
      ],
      isCloud: false,
    },
  ];

  const current = flows.find((f) => f.id === inspectedFlow) || flows[0];

  return (
    <section id="privacy-control" className="py-24 bg-white border-b border-[#E1E8E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left space-y-3 mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#07856D]">
            <ShieldCheck className="w-4 h-4 text-[#07856D]" />
            <span>Radical Architectural Honesty</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101C2D] tracking-tight">
            Understand your money. Understand where your data goes.
          </h2>
          <p className="text-base sm:text-lg text-[#637184] leading-relaxed">
            We don’t make misleading marketing claims that "100% of AI runs on a microwave". Here is the exact, audited breakdown of what stays on your physical device versus what touches the cloud.
          </p>
        </div>

        {/* Interactive Data Flow Inspector */}
        <div className="bg-[#F7F8F4] rounded-2xl border border-[#E1E8E4] p-6 lg:p-10 text-left mb-12">
          
          <div className="flex items-center justify-between pb-6 border-b border-[#E1E8E4] mb-8">
            <span className="text-xs font-bold text-[#101C2D] uppercase tracking-wider">
              Interactive Data-Flow Inspector
            </span>
            <span className="text-xs text-[#07856D] font-mono font-bold">
              Select a layer to inspect
            </span>
          </div>

          {/* Layer Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {flows.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setInspectedFlow(f.id as any)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  inspectedFlow === f.id
                    ? 'bg-white border-[#07856D] ring-2 ring-[#07856D]/20 shadow-xs'
                    : 'bg-white/60 border-[#E1E8E4] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#101C2D]">{f.title}</span>
                  {f.isCloud ? (
                    <Cloud className="w-3.5 h-3.5 text-indigo-600" />
                  ) : (
                    <HardDrive className="w-3.5 h-3.5 text-[#07856D]" />
                  )}
                </div>
                <div className="text-[11px] text-[#637184] truncate">{f.destination}</div>
              </button>
            ))}
          </div>

          {/* Inspection View Details */}
          <div className="bg-white rounded-xl border border-[#E1E8E4] p-6 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E1E8E4]">
              <div>
                <h3 className="text-xl font-bold text-[#101C2D] flex items-center gap-2">
                  <span>{current.title}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    current.isCloud ? 'bg-indigo-50 text-indigo-700' : 'bg-emerald-50 text-emerald-800'
                  }`}>
                    {current.networkState}
                  </span>
                </h3>
                <p className="text-xs text-[#637184] mt-0.5">
                  Storage Technology: <strong className="text-[#101C2D] font-mono">{current.storageEngine}</strong>
                </p>
              </div>

              <div className="text-xs text-right">
                <span className="text-[#637184] block text-[10px] uppercase font-bold">Physical Boundary:</span>
                <span className="font-semibold text-[#101C2D]">{current.destination}</span>
              </div>
            </div>

            <p className="text-sm text-[#101C2D]/85 leading-relaxed">
              {current.description}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#101C2D] uppercase tracking-wider">
                What data is processed in this layer:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {current.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F7F8F4] border border-[#E1E8E4] text-xs font-medium text-[#101C2D]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#07856D] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Document Links & Direct Legal Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-left">
          {[
            { id: 'privacy', label: 'Privacy Policy', desc: 'Zero data sales' },
            { id: 'data_safety', label: 'Data Safety', desc: 'Architecture audit' },
            { id: 'terms', label: 'Terms of Service', desc: 'Plain English' },
            { id: 'licenses', label: 'Open Source', desc: 'SQLite / Watermelon' },
            { id: 'contact', label: 'Support & Help', desc: 'Human response' },
            { id: 'account_deletion', label: 'Account Deletion', desc: 'Instant purge' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onOpenLegalModal(item.id as LegalModalType)}
              className="p-3.5 rounded-xl border border-[#E1E8E4] bg-[#F7F8F4] hover:bg-white hover:border-[#07856D] transition-colors space-y-1 text-left"
            >
              <div className="text-xs font-bold text-[#101C2D]">{item.label}</div>
              <div className="text-[10px] text-[#637184]">{item.desc}</div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
