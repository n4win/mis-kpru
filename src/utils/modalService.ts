import { modals } from "@mantine/modals";
import { createElement, type ReactNode } from "react";

type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | string;

const titleEl = (text: string, color?: string) =>
  createElement("span", {
    style: {
      fontWeight: 600,
      fontSize: "var(--mantine-font-size-lg)",
      ...(color ? { color: `var(--mantine-color-${color}-filled)` } : {}),
    },
    children: text,
  });

const detailEl = (detail: string | ReactNode) =>
  typeof detail === "string"
    ? createElement("span", {
        style: {
          fontSize: "var(--mantine-font-size-sm)",
          color: "var(--mantine-color-dimmed)",
        },
        children: detail,
      })
    : detail;

export const ModalService = {
  confirm({
    title = "",
    detail = "",
    confirmLabel = "ยืนยัน",
    cancelLabel = "ยกเลิก",
    confirmColor = "green",
    onConfirm,
    onCancel,
    size = "md",
  }: {
    title?: string;
    detail?: string | ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmColor?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    size?: ModalSize;
  }): void {
    modals.openConfirmModal({
      title: titleEl(title),
      children: detailEl(detail),
      labels: { confirm: confirmLabel, cancel: cancelLabel },
      confirmProps: { color: confirmColor },
      onConfirm,
      onCancel,
      size,
      withCloseButton: false,
      closeOnEscape: false,
      closeOnClickOutside: false,
    });
  },

  content({
    title = "",
    children,
    size = "md",
    closeOnClickOutside = true,
  }: {
    title?: string | ReactNode;
    children: ReactNode;
    size?: ModalSize;
    closeOnClickOutside?: boolean;
  }): string {
    return modals.open({
      title: typeof title === "string" ? titleEl(title) : title,
      children,
      size,
      closeOnClickOutside,
      withCloseButton: false,
      closeOnEscape: false,
    });
  },

  fullScreen({
    title = "",
    children,
    closeOnClickOutside = true,
  }: {
    title?: string | ReactNode;
    children: ReactNode;
    closeOnClickOutside?: boolean;
  }): string {
    return modals.open({
      title: typeof title === "string" ? titleEl(title) : title,
      children,
      fullScreen: true,
      closeOnClickOutside,
    });
  },

  close(id: string): void {
    modals.close(id);
  },

  closeAll(): void {
    modals.closeAll();
  },
};
