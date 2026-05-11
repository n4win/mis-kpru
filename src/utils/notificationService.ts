import { createElement } from "react";
import { notifications, type NotificationData } from "@mantine/notifications";
import {
  IconCheck,
  IconX,
  IconInfoSmall,
  IconAlertTriangle,
} from "@tabler/icons-react";

export const NotificationService = {
  success(props?: Partial<NotificationData>): void {
    const { title, message, position, autoClose, ...rest } = props ?? {};
    notifications.show({
      color: "green",
      icon: createElement(IconCheck, { size: 18 }),
      title: title ?? "สำเร็จ",
      message: message ?? "",
      autoClose: autoClose ?? 3000,
      position: position ?? "bottom-right",
      ...rest,
    });
  },

  error(props?: Partial<NotificationData>): void {
    const { title, message, position, autoClose, ...rest } = props ?? {};
    notifications.show({
      color: "red",
      icon: createElement(IconX, { size: 18 }),
      title: title ?? "เกิดข้อผิดพลาด",
      message: message ?? "",
      autoClose: autoClose ?? 5000,
      position: position ?? "bottom-right",
      ...rest,
    });
  },

  warning(props?: Partial<NotificationData>): void {
    const { title, message, position, autoClose, ...rest } = props ?? {};
    notifications.show({
      color: "yellow",
      icon: createElement(IconAlertTriangle, { size: 18 }),
      title: title ?? "คำเตือน",
      message: message ?? "",
      autoClose: autoClose ?? 4000,
      position: position ?? "bottom-right",
      ...rest,
    });
  },

  info(props?: Partial<NotificationData>): void {
    const { title, message, position, autoClose, ...rest } = props ?? {};
    notifications.show({
      color: "cyan",
      icon: createElement(IconInfoSmall, { size: 30 }),
      title: title ?? "ข่าวสาร",
      message: message ?? "",
      autoClose: autoClose ?? 3000,
      position: position ?? "bottom-right",
      ...rest,
    });
  },

  loading(props?: Partial<NotificationData>): string {
    const { title, message, position, ...rest } = props ?? {};
    return notifications.show({
      title: title ?? "กำลังโหลด...",
      message: message ?? "",
      loading: true,
      loaderProps: {
        color: "yellow",
      },
      position: position ?? "bottom-right",
      autoClose: false,
      withCloseButton: false,
      ...rest,
    });
  },

  updateToSuccess(id: string, props?: Partial<NotificationData>): void {
    const { title, message, autoClose, position, ...rest } = props ?? {};
    notifications.update({
      icon: createElement(IconCheck, { size: 18 }),
      color: "green",
      title: title ?? "สำเร็จ",
      id,
      message: message ?? "",
      autoClose: autoClose ?? 3000,
      position: position ?? "bottom-right",
      loading: false,
      withCloseButton: true,
      ...rest,
    });
  },

  updateToError(id: string, props?: Partial<NotificationData>): void {
    const { title, message, autoClose, position, ...rest } = props ?? {};
    notifications.update({
      icon: createElement(IconX, { size: 18 }),
      color: "red",
      title: title ?? "เกิดข้อผิดพลาด",
      id,
      message: message ?? "",
      autoClose: autoClose ?? 5000,
      position: position ?? "bottom-right",
      loading: false,
      withCloseButton: true,
      ...rest,
    });
  },

  clean() {
    notifications.clean();
  },

  cleanQueue() {
    notifications.cleanQueue();
  },
};
