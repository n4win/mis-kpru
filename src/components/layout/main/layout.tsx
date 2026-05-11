"use client";

import { AppShell, ScrollArea } from "@mantine/core";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import clsx from "clsx";

import { Header, HeaderNavbar } from "./header";
import { Navbar } from "./navbar";
import classnavbar from "@/styles/layout/main/navbar.module.css";
import classheader from "@/styles/layout/main/header.module.css";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [{ y }] = useWindowScroll();
  const isScrolled = y > 0;

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpened },
        }}
        padding="xl"
        layout="alt"
      >
        <AppShell.Header
          className={clsx(classheader.root, {
            [classheader.scrolled]: isScrolled,
          })}
        >
          <Header openedMobile={mobileOpened} toggleMobile={toggleMobile} />
        </AppShell.Header>
        <AppShell.Navbar className={classnavbar.Navbar}>
          <AppShell.Section p={"sm"}>
            <HeaderNavbar
              openedMobile={!mobileOpened}
              toggleMobile={toggleMobile}
            />
          </AppShell.Section>
          <AppShell.Section p={"sm"} component={ScrollArea} grow>
            <Navbar toggleMobile={toggleMobile} />
          </AppShell.Section>
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </>
  );
}
