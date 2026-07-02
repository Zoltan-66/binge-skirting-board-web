"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { ACTIONS, EVENTS, Joyride, STATUS } from "react-joyride";
import type { EventHandler, Step } from "react-joyride";
import { type Locale, useI18n } from "@/lib/i18n";

const TOUR_STORAGE_KEY = "binge-guided-tour-seen-v4";
const tourInstanceKey: Record<Locale, number> = { en: 1, zh: 2, de: 3, es: 4, fr: 5 };

const tourCopy: Record<Locale, {
  steps: Array<Pick<Step, "target" | "placement"> & { title: string; content: string }>;
  controls: {
    back: string;
    close: string;
    last: string;
    next: string;
    nextWithProgress: string;
    skip: string;
  };
}> = {
  en: {
    steps: [
      { target: '[data-tour="product-entry"]', title: "Start with products", content: "Jump straight to the product systems available for architectural and distribution projects.", placement: "bottom" },
      { target: '[data-tour="product-grid"]', title: "Browse product systems", content: "Choose a system family to compare profiles, applications, finishes, and available product details.", placement: "top" },
      { target: '[data-tour="flagship-system"]', title: "Explore featured systems", content: "Open highlighted products such as the TG clip-on solid wood system for a closer look at construction and installation.", placement: "bottom-start" },
      { target: '[data-tour="technical-downloads"]', title: "Request technical files", content: "Find specification sheets, drawings, catalogue pages, installation guides, and available test documentation.", placement: "top" },
      { target: '[data-tour="quote-cta"]', title: "Request pricing or samples", content: "Send the product, quantity, finish, drawing, or sample requirements needed for a project quotation.", placement: "top" },
    ],
    controls: { back: "Back", close: "Close", last: "Finish", next: "Next", nextWithProgress: "Next ({current}/{total})", skip: "Skip" },
  },
  zh: {
    steps: [
      { target: '[data-tour="product-entry"]', title: "从产品开始", content: "直接浏览适用于建筑与经销项目的产品系统。", placement: "bottom" },
      { target: '[data-tour="product-grid"]', title: "浏览产品系统", content: "选择产品系列，查看型材、应用、表面处理与产品详情。", placement: "top" },
      { target: '[data-tour="flagship-system"]', title: "查看重点产品", content: "打开 TG 卡扣式实木系统等重点产品，进一步了解结构与安装方式。", placement: "bottom-start" },
      { target: '[data-tour="technical-downloads"]', title: "索取技术资料", content: "查找规格书、图纸、目录、安装指南及可提供的测试资料。", placement: "top" },
      { target: '[data-tour="quote-cta"]', title: "询价或索取样品", content: "提交产品、数量、表面处理、图纸或样品需求，以获取项目报价。", placement: "top" },
    ],
    controls: { back: "上一步", close: "关闭", last: "完成", next: "下一步", nextWithProgress: "下一步（{current}/{total}）", skip: "跳过" },
  },
  de: {
    steps: [
      { target: '[data-tour="product-entry"]', title: "Mit Produkten starten", content: "Springen Sie direkt zu den Produktsystemen für Architektur- und Vertriebsprojekte.", placement: "bottom" },
      { target: '[data-tour="product-grid"]', title: "Produktsysteme durchsuchen", content: "Wählen Sie eine Systemfamilie, um Profile, Anwendungen, Oberflächen und verfügbare Produktdetails zu vergleichen.", placement: "top" },
      { target: '[data-tour="flagship-system"]', title: "Ausgewählte Systeme ansehen", content: "Öffnen Sie hervorgehobene Produkte wie das TG Clip-On Massivholzsystem, um Aufbau und Montage genauer zu sehen.", placement: "bottom-start" },
      { target: '[data-tour="technical-downloads"]', title: "Technische Dateien anfordern", content: "Finden Sie Spezifikationen, Zeichnungen, Katalogseiten, Montageanleitungen und verfügbare Prüfdokumente.", placement: "top" },
      { target: '[data-tour="quote-cta"]', title: "Preise oder Muster anfragen", content: "Senden Sie Produkt, Menge, Oberfläche, Zeichnung oder Musterbedarf für ein Projektangebot.", placement: "top" },
    ],
    controls: { back: "Zurück", close: "Schließen", last: "Fertig", next: "Weiter", nextWithProgress: "Weiter ({current}/{total})", skip: "Überspringen" },
  },
  es: {
    steps: [
      { target: '[data-tour="product-entry"]', title: "Empiece por los productos", content: "Vaya directamente a los sistemas disponibles para proyectos arquitectónicos y de distribución.", placement: "bottom" },
      { target: '[data-tour="product-grid"]', title: "Explorar sistemas de producto", content: "Elija una familia para comparar perfiles, aplicaciones, acabados y detalles disponibles.", placement: "top" },
      { target: '[data-tour="flagship-system"]', title: "Ver sistemas destacados", content: "Abra productos destacados como el sistema TG clip-on de madera maciza para ver construcción e instalación.", placement: "bottom-start" },
      { target: '[data-tour="technical-downloads"]', title: "Solicitar archivos técnicos", content: "Encuentre especificaciones, planos, páginas de catálogo, guías de instalación y documentación de ensayo disponible.", placement: "top" },
      { target: '[data-tour="quote-cta"]', title: "Solicitar precios o muestras", content: "Envíe producto, cantidad, acabado, plano o necesidades de muestra para preparar un presupuesto.", placement: "top" },
    ],
    controls: { back: "Atrás", close: "Cerrar", last: "Finalizar", next: "Siguiente", nextWithProgress: "Siguiente ({current}/{total})", skip: "Saltar" },
  },
  fr: {
    steps: [
      { target: '[data-tour="product-entry"]', title: "Commencer par les produits", content: "Accédez directement aux systèmes disponibles pour les projets architecturaux et de distribution.", placement: "bottom" },
      { target: '[data-tour="product-grid"]', title: "Parcourir les systèmes produits", content: "Choisissez une famille pour comparer profils, applications, finitions et détails disponibles.", placement: "top" },
      { target: '[data-tour="flagship-system"]', title: "Explorer les systèmes phares", content: "Ouvrez des produits mis en avant comme le système bois massif TG clip-on pour examiner construction et pose.", placement: "bottom-start" },
      { target: '[data-tour="technical-downloads"]', title: "Demander les fichiers techniques", content: "Trouvez fiches de spécification, plans, pages catalogue, guides de pose et documents d’essai disponibles.", placement: "top" },
      { target: '[data-tour="quote-cta"]', title: "Demander prix ou échantillons", content: "Envoyez produit, quantité, finition, plan ou besoin d’échantillon pour établir un devis projet.", placement: "top" },
    ],
    controls: { back: "Retour", close: "Fermer", last: "Terminer", next: "Suivant", nextWithProgress: "Suivant ({current}/{total})", skip: "Ignorer" },
  },
};

export function GuidedTour() {
  const pathname = usePathname();
  const { locale } = useI18n();
  const [run, setRun] = useState(false);
  const isHome = pathname === "/" || /^\/(en|zh|de|es|fr)$/.test(pathname);

  const steps = useMemo<Step[]>(
    () => tourCopy[locale].steps,
    [locale],
  );
  const controls = tourCopy[locale].controls;

  const startTour = useCallback(() => {
    setRun(true);
  }, []);

  useEffect(() => {
    if (!isHome) {
      return;
    }

    if (window.localStorage.getItem(`${TOUR_STORAGE_KEY}-${locale}`) === "true") {
      return;
    }

    const timer = window.setTimeout(startTour, 1000);

    return () => window.clearTimeout(timer);
  }, [isHome, locale, startTour]);

  const handleEvent = useCallback<EventHandler>(data => {
    if (data.action === ACTIONS.CLOSE || data.status === STATUS.FINISHED || data.status === STATUS.SKIPPED) {
      window.localStorage.setItem(`${TOUR_STORAGE_KEY}-${locale}`, "true");
      setRun(false);
      return;
    }

    if (data.type === EVENTS.TARGET_NOT_FOUND) {
      setRun(false);
    }
  }, [locale]);

  if (!isHome) {
    return null;
  }

  return (
      <Joyride
        key={tourInstanceKey[locale]}
        continuous
        run={run && isHome}
        scrollToFirstStep
        steps={steps}
        onEvent={handleEvent}
        locale={{
          back: controls.back,
          close: controls.close,
          last: controls.last,
          next: controls.next,
          nextWithProgress: controls.nextWithProgress,
          skip: controls.skip,
        }}
        options={{
          backgroundColor: "#ffffff",
          overlayColor: "rgba(23, 27, 32, 0.34)",
          primaryColor: "#F28C00",
          scrollDuration: 450,
          scrollOffset: 88,
          showProgress: true,
          skipBeacon: true,
          spotlightPadding: 16,
          spotlightRadius: 12,
          targetWaitTimeout: 1600,
          textColor: "#222222",
          width: 390,
          zIndex: 1000,
        }}
        styles={{
          buttonBack: {
            color: "#4A4A4A",
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
          },
          buttonClose: {
            color: "#747474",
          },
          buttonPrimary: {
            borderRadius: 0,
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.07em",
            minHeight: "38px",
            padding: "0 16px",
            textTransform: "uppercase",
          },
          buttonSkip: {
            color: "#747474",
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
          },
          tooltip: {
            border: "1px solid rgba(23, 27, 32, 0.08)",
            borderRadius: "8px",
            boxShadow: "0 18px 48px rgba(23, 27, 32, 0.16)",
            boxSizing: "border-box",
            fontFamily: "var(--binge-font)",
            maxWidth: "calc(100vw - 32px)",
            width: "390px",
          },
          tooltipContent: {
            color: "#4A4A4A",
            fontSize: "15px",
            fontWeight: 300,
            lineHeight: 1.6,
            padding: "10px 0 6px",
          },
          tooltipFooter: {
            alignItems: "center",
            gap: "12px",
            marginTop: "16px",
          },
          tooltipTitle: {
            color: "#222222",
            fontSize: "18px",
            fontWeight: 700,
            lineHeight: 1.25,
            margin: 0,
          },
        }}
      />
  );
}
