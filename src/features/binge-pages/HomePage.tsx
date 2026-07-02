"use client";

import { HeroSection } from '@/components/binge/HeroSection';
import { ProductGrid } from '@/components/binge/ProductGrid';
import { FlagshipSection } from '@/components/binge/FlagshipSection';
import { ApplicationsSection } from '@/components/binge/ApplicationsSection';
import { OEMSection } from '@/components/binge/OEMSection';
import { TechnicalDownloads } from '@/components/binge/TechnicalDownloads';
import { FinalCTA } from '@/components/binge/FinalCTA';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductGrid />
      <FlagshipSection />
      <ApplicationsSection />
      <OEMSection />
      <TechnicalDownloads />
      <FinalCTA />
    </>
  );
}
