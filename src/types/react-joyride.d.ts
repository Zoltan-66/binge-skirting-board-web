declare module "react-joyride" {
  import type { CSSProperties, ReactNode } from "react";

  export type Step = {
    content: ReactNode;
    placement?: "top" | "top-start" | "bottom" | "bottom-start" | "center";
    target: string;
    title?: ReactNode;
  };

  export type Status = "idle" | "ready" | "waiting" | "running" | "paused" | "skipped" | "finished";

  export type EventData = {
    action: string;
    index: number;
    size: number;
    status: Status;
    type: string;
  };

  export type EventHandler = (data: EventData) => void;

  export const EVENTS: {
    readonly TARGET_NOT_FOUND: "error:target_not_found";
  };

  export const ACTIONS: {
    readonly CLOSE: "close";
  };

  export const STATUS: {
    readonly FINISHED: "finished";
    readonly SKIPPED: "skipped";
  };

  export function Joyride(props: {
    continuous?: boolean;
    key?: number;
    locale?: {
      back?: ReactNode;
      close?: ReactNode;
      last?: ReactNode;
      next?: ReactNode;
      nextWithProgress?: ReactNode;
      skip?: ReactNode;
    };
    onEvent?: EventHandler;
    options?: {
      backgroundColor?: string;
      overlayColor?: string;
      primaryColor?: string;
      scrollDuration?: number;
      scrollOffset?: number;
      showProgress?: boolean;
      skipBeacon?: boolean;
      spotlightPadding?: number;
      spotlightRadius?: number;
      targetWaitTimeout?: number;
      textColor?: string;
      width?: number | string;
      zIndex?: number;
    };
    run?: boolean;
    scrollToFirstStep?: boolean;
    steps: Step[];
    styles?: Partial<Record<
      | "buttonBack"
      | "buttonClose"
      | "buttonPrimary"
      | "buttonSkip"
      | "tooltip"
      | "tooltipContent"
      | "tooltipFooter"
      | "tooltipTitle",
      CSSProperties
    >>;
  }): JSX.Element | null;
}
