import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";
import "@mantine/notifications/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/spotlight/styles.css";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { theme } from "./theme";

import { DateProvider, TopLoaderProvider } from "@/components/provider";

const kanit = Kanit({
  subsets: ["latin", "thai"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default:
      "ระบบการบริหารจัดการและบันทึกข้อมูลระบบสารสนเทศโครงการตามแผนปฏิบัติราชการ | KPRU",
    template: "%s | KPRU",
  },
  description:
    "ระบบการบริหารจัดการและบันทึกข้อมูลระบบสารสนเทศโครงการตามแผนปฏิบัติราชการ มหาวิทยาลัยราชภัฏกำแพงเพชร",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={kanit.className} {...mantineHtmlProps}>
      <head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <DateProvider>
            <TopLoaderProvider />
            <Notifications />
            <ModalsProvider>{children}</ModalsProvider>
          </DateProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
