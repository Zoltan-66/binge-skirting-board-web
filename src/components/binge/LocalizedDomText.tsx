"use client";

import { useEffect } from "react";
import { translateCopy } from "@/lib/localized-copy";
import type { Locale } from "@/lib/i18n";

const ATTRIBUTES = ["aria-label", "placeholder", "title", "alt"] as const;
const SKIP_SELECTOR = "script, style, code, pre, textarea";

function shouldSkipText(value: string) {
  const text = value.trim();
  if (!text) return true;
  if (/^(BINGE|OEM|ODM|RFQ|PDF|DXF|DWG|STEP|STP|JPG|PNG|LED|WPC)$/i.test(text)) return true;
  if (/^[A-Z]{1,4}[-/][A-Z0-9/-]+$/.test(text)) return true;
  if (/^[+\d\s()-]+$/.test(text)) return true;
  if (/^[\w.+-]+@[\w.-]+$/.test(text)) return true;
  return false;
}

function localizeElement(root: ParentNode, locale: Locale) {
  if (locale === "en") return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest(SKIP_SELECTOR)) return NodeFilter.FILTER_REJECT;
      return shouldSkipText(node.nodeValue ?? "") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    },
  });

  const textNodes: Text[] = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text);
  textNodes.forEach(node => {
    const original = node.nodeValue ?? "";
    const translated = translateCopy(original, locale);
    if (translated !== original) node.nodeValue = original.replace(original.trim(), translated);
  });

  root.querySelectorAll<HTMLElement>("*").forEach(element => {
    if (element.closest(SKIP_SELECTOR)) return;
    ATTRIBUTES.forEach(attribute => {
      const value = element.getAttribute(attribute);
      if (!value || shouldSkipText(value)) return;
      const translated = translateCopy(value, locale);
      if (translated !== value) element.setAttribute(attribute, translated);
    });
  });
}

export function LocalizedDomText({ locale }: { locale: Locale }) {
  useEffect(() => {
    if (locale === "en") return;
    const timers: number[] = [];
    let frame = 0;
    const run = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => localizeElement(document.body, locale));
    };
    run();
    [80, 250, 700, 1400].forEach(delay => {
      timers.push(window.setTimeout(run, delay));
    });
    return () => {
      window.cancelAnimationFrame(frame);
      timers.forEach(timer => window.clearTimeout(timer));
    };
  }, [locale]);

  return null;
}
