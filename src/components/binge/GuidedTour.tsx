"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { ACTIONS, EVENTS, Joyride, STATUS } from "react-joyride";
import type { EventHandler, Step } from "react-joyride";
import { useI18n } from "@/lib/i18n";

const TOUR_STORAGE_KEY = "binge-guided-tour-seen-v4";

export function GuidedTour() {
  const pathname = usePathname();
  const { locale } = useI18n();
  const [run, setRun] = useState(false);
  const isHome = pathname === "/" || /^\/(en|zh|de|es|fr)$/.test(pathname);

  const steps = useMemo<Step[]>(
    () => [
      {
        target: '[data-tour="product-entry"]',
        title: locale === "zh" ? "从产品开始" : "Start with products",
        content: locale === "zh" ? "直接浏览适用于建筑与经销项目的产品系统。" : "Jump straight to the product systems available for architectural and distribution projects.",
        placement: "bottom",
      },
      {
        target: '[data-tour="product-grid"]',
        title: locale === "zh" ? "浏览产品系统" : "Browse product systems",
        content: locale === "zh" ? "选择产品系列，查看型材、应用、表面处理与产品详情。" : "Choose a system family to compare profiles, applications, finishes, and available product details.",
        placement: "top",
      },
      {
        target: '[data-tour="flagship-system"]',
        title: locale === "zh" ? "查看重点产品" : "Explore featured systems",
        content: locale === "zh" ? "打开 TG 卡扣式实木系统等重点产品，进一步了解结构与安装方式。" : "Open highlighted products such as the TG clip-on solid wood system for a closer look at construction and installation.",
        placement: "bottom-start",
      },
      {
        target: '[data-tour="technical-downloads"]',
        title: locale === "zh" ? "索取技术资料" : "Request technical files",
        content: locale === "zh" ? "查找规格书、图纸、目录、安装指南及可提供的测试资料。" : "Find specification sheets, drawings, catalogue pages, installation guides, and available test documentation.",
        placement: "top",
      },
      {
        target: '[data-tour="quote-cta"]',
        title: locale === "zh" ? "询价或索取样品" : "Request pricing or samples",
        content: locale === "zh" ? "提交产品、数量、表面处理、图纸或样品需求，以获取项目报价。" : "Send the product, quantity, finish, drawing, or sample requirements needed for a project quotation.",
        placement: "top",
      },
    ],
    [locale],
  );

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
        continuous
        run={run && isHome}
        scrollToFirstStep
        steps={steps}
        onEvent={handleEvent}
        locale={{
          back: locale === "zh" ? "上一步" : "Back",
          close: locale === "zh" ? "关闭" : "Close",
          last: locale === "zh" ? "完成" : "Finish",
          next: locale === "zh" ? "下一步" : "Next",
          nextWithProgress: locale === "zh" ? "下一步（{current}/{total}）" : "Next ({current}/{total})",
          skip: locale === "zh" ? "跳过" : "Skip",
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
