/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Currency } from './utils/finance';
import { LegalModalType } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ChaptersRow } from './components/ChaptersRow';
import { PainPoints } from './components/PainPoints';
import { TransformationFlow } from './components/TransformationFlow';
import { OfflineFirstEngine } from './components/OfflineFirstEngine';
import { FinancialWorkspace } from './components/FinancialWorkspace';
import { AICopilotSection } from './components/AICopilotSection';
import { PersonasSection } from './components/PersonasSection';
import { PlanningAndWidgets } from './components/PlanningAndWidgets';
import { PrivacyDataControl } from './components/PrivacyDataControl';
import { EarlyAccessSection } from './components/EarlyAccessSection';
import { FAQAndLegal } from './components/FAQAndLegal';
import { Footer } from './components/Footer';
import { VoiceConversationModal } from './components/VoiceConversationModal';
import { MultiDeviceEcosystem } from './components/MultiDeviceEcosystem';

export default function App() {
  const [currency, setCurrency] = useState<Currency>('INR');
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [activeLegalModal, setActiveLegalModal] = useState<LegalModalType>(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);

  const handleOpenEarlyAccess = () => {
    const el = document.getElementById('early-access');
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  const handleExploreProduct = () => {
    const el = document.getElementById('product');
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-[#F7F8F4] text-[#101C2D] font-sans selection:bg-[#E2F5ED] selection:text-[#07856D] ${
      reducedMotion ? 'motion-reduce' : ''
    }`}>
      {/* Navigation */}
      <Navbar
        currency={currency}
        onCurrencyChange={setCurrency}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
        onOpenEarlyAccess={handleOpenEarlyAccess}
        onOpenVoiceConversation={() => setIsVoiceModalOpen(true)}
      />

      <main id="main-content">
        {/* Section 02 — Hero */}
        <Hero
          currency={currency}
          onOpenEarlyAccess={handleOpenEarlyAccess}
          onExploreProduct={handleExploreProduct}
          onOpenVoiceConversation={() => setIsVoiceModalOpen(true)}
          reducedMotion={reducedMotion}
        />

        {/* Continuous Multi-Device Form Factors Showcase (Desktop, Tablet, Mobile, Watch) */}
        <MultiDeviceEcosystem
          currency={currency}
          onOpenEarlyAccess={handleOpenEarlyAccess}
          reducedMotion={reducedMotion}
        />

        {/* Meadowbell-inspired Chapters of Financial Freedom */}
        <ChaptersRow
          currency={currency}
          onOpenEarlyAccess={handleOpenEarlyAccess}
        />

        {/* Section 03 — Pain Points */}
        <PainPoints currency={currency} />

        {/* Section 04 — Transformation Flow */}
        <TransformationFlow
          currency={currency}
          onOpenEarlyAccess={handleOpenEarlyAccess}
        />

        {/* Section 05 — Offline-First Engine */}
        <OfflineFirstEngine currency={currency} />

        {/* Section 06 — Financial Workspace & Budget Strategy Selector */}
        <FinancialWorkspace
          currency={currency}
          onOpenEarlyAccess={handleOpenEarlyAccess}
        />

        {/* Section 07 — AI Financial Copilot */}
        <AICopilotSection
          currency={currency}
          onOpenEarlyAccess={handleOpenEarlyAccess}
          onOpenVoiceConversation={() => setIsVoiceModalOpen(true)}
        />

        {/* Section 08 — Personas & Life Stages */}
        <PersonasSection
          currency={currency}
          onOpenEarlyAccess={handleOpenEarlyAccess}
        />

        {/* Section 09 & 10 — Planning, Runway & Mobile Widgets */}
        <PlanningAndWidgets
          currency={currency}
          onOpenEarlyAccess={handleOpenEarlyAccess}
        />

        {/* Section 11 — Privacy & Data Control */}
        <PrivacyDataControl
          onOpenLegalModal={(modal) => setActiveLegalModal(modal)}
        />

        {/* Section 12 — Conversion & Early Access Waitlist */}
        <EarlyAccessSection onExploreProduct={handleExploreProduct} />

        {/* Section 13 — FAQ & Legal Modals */}
        <FAQAndLegal
          activeModal={activeLegalModal}
          onCloseModal={() => setActiveLegalModal(null)}
          onOpenModal={(modal) => setActiveLegalModal(modal)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenLegalModal={(modal) => setActiveLegalModal(modal)}
        onOpenEarlyAccess={handleOpenEarlyAccess}
      />

      {/* Real-Time Live Gemini Voice Conversation Modal */}
      <VoiceConversationModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        currency={currency}
        reducedMotion={reducedMotion}
      />
    </div>
  );
}
