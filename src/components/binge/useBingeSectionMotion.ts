"use client";

import type { RefObject } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap-client';

type SectionMotionOptions = {
  auto?: boolean;
  disabled?: boolean;
  hero?: boolean;
  imageParallax?: boolean;
  refreshKey?: unknown;
};

const revealSelector = '[data-binge-reveal]';
const cardSelector = '[data-binge-card]';
const mediaSelector = '[data-binge-media]';
const ruleSelector = '[data-binge-rule]';
const motionScopeSelector = '[data-binge-motion-scope]';
const autoRevealSelector = 'h1, h2, section p, [data-binge-auto-reveal]';

function uniqueElements(elements: HTMLElement[]) {
  return [...new Set(elements)];
}

function isMeaningfulAutoReveal(element: HTMLElement) {
  if (element.closest('[data-binge-card], [data-binge-motion-skip], form')) {
    return false;
  }

  return (element.textContent ?? '').trim().length > 0;
}

function isInsideNestedMotionScope(element: HTMLElement, root: HTMLElement) {
  const nearestScope = element.closest<HTMLElement>(motionScopeSelector);
  return Boolean(nearestScope && nearestScope !== root);
}

export function useBingeSectionMotion(
  scopeRef: RefObject<HTMLElement | null>,
  { auto = false, disabled = false, hero = false, imageParallax = true, refreshKey }: SectionMotionOptions = {},
) {
  useGSAP((_, contextSafe) => {
    if (disabled) return;

    const root = scopeRef.current;
    if (!root) return;
    const safe = contextSafe ?? (<T extends (...args: never[]) => unknown>(fn: T) => fn);
    root.setAttribute('data-binge-motion-scope', '');

    // `useGSAP` already owns a GSAP context. Creating a matchMedia context inside
    // it makes the two contexts register each other's cleanup, which can recurse
    // during a Next.js locale-route transition. Read the preference natively and
    // let useGSAP be the single owner of every animation and ScrollTrigger here.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const autoRevealItems = auto
          ? gsap.utils
            .toArray<HTMLElement>(autoRevealSelector, root)
            .filter((element) => !isInsideNestedMotionScope(element, root))
            .filter(isMeaningfulAutoReveal)
          : [];
        const revealItems = uniqueElements([
          ...gsap.utils
            .toArray<HTMLElement>(revealSelector, root)
            .filter((element) => !isInsideNestedMotionScope(element, root)),
          ...autoRevealItems,
        ]);
        const cards = uniqueElements([
          ...gsap.utils
            .toArray<HTMLElement>(cardSelector, root)
            .filter((element) => !isInsideNestedMotionScope(element, root)),
        ]);
        const mediaBlocks = gsap.utils
          .toArray<HTMLElement>(mediaSelector, root)
          .filter((mediaBlock) => !isInsideNestedMotionScope(mediaBlock, root))
          .filter((mediaBlock) => !mediaBlock.closest(cardSelector));
        const mediaImages = mediaBlocks
          .map((mediaBlock) => mediaBlock.querySelector<HTMLElement>('img'))
          .filter((image): image is HTMLElement => Boolean(image));
        const animatedItems = [...revealItems, ...cards];

        if (reduceMotion) {
          if (animatedItems.length > 0) {
            gsap.set(animatedItems, { autoAlpha: 1, y: 0, clearProps: 'transform,visibility,opacity' });
          }

          if (mediaImages.length > 0) {
            gsap.set(mediaImages, { yPercent: 0, scale: 1, clearProps: 'transform' });
          }

          return;
        }

        if (animatedItems.length > 0) {
          gsap.set(animatedItems, { autoAlpha: 0, y: 26, willChange: 'transform, opacity' });
        }

        if (hero) {
          const heroImage = root.querySelector<HTMLElement>(`${mediaSelector} img`);
          const rule = root.querySelector<HTMLElement>(ruleSelector);
          const tl = gsap.timeline({ defaults: { duration: 0.75, ease: 'power3.out' } });

          if (heroImage) {
            gsap.set(heroImage, { scale: 1.08, willChange: 'transform' });
            tl.to(heroImage, { scale: 1, duration: 1.2 }, 0);
          }

          if (revealItems.length > 0) {
            tl.to(revealItems, { autoAlpha: 1, y: 0, stagger: 0.09 }, 0.12);
          }

          if (rule) {
            gsap.set(rule, { scaleX: 0, transformOrigin: 'left center' });
            tl.to(rule, { scaleX: 1, duration: 0.65, ease: 'power2.out' }, 0.45);
          }
        } else {
          if (revealItems.length > 0) {
            ScrollTrigger.batch(revealItems, {
              start: 'top 88%',
              once: true,
              batchMax: 8,
              onEnter: (batch) => {
                gsap.to(batch, {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.68,
                  ease: 'power3.out',
                  stagger: 0.08,
                  overwrite: 'auto',
                });
              },
            });
          }

          if (cards.length > 0) {
            ScrollTrigger.batch(cards, {
              start: 'top 86%',
              once: true,
              batchMax: 6,
              onEnter: safe((batch: Element[]) => {
                gsap.to(batch, {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.62,
                  ease: 'power3.out',
                  stagger: 0.07,
                  overwrite: 'auto',
                });
              }),
            });
          }
        }

        if (imageParallax) {
          mediaBlocks
            .map((mediaBlock) => {
              const image = mediaBlock.querySelector<HTMLElement>('img');
              if (!image) return null;

              gsap.set(image, { willChange: 'transform' });
              return gsap.to(image, {
                yPercent: hero ? -5 : -7,
                ease: 'none',
                scrollTrigger: {
                  trigger: mediaBlock,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.7,
                },
              });
            })
            .filter(Boolean);
        }

    return () => {
      if (animatedItems.length > 0) {
        gsap.set(animatedItems, { clearProps: 'willChange' });
      }

      if (mediaImages.length > 0) {
        gsap.set(mediaImages, { clearProps: 'willChange' });
      }
    };
  }, { dependencies: [refreshKey], scope: scopeRef, revertOnUpdate: true });
}
