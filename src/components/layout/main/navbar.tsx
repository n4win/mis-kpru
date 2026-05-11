"use client";

import { Box, Divider, Flex, NavLink, Text } from "@mantine/core";
import { usePathname } from "next/navigation";
// import { useSession } from "next-auth/react";
import Link from "next/link";
import classes from "@/styles/layout/main/navbar.module.css";

import { Menu, MenuItem } from "@/utils/constant/menu";

interface NavbarProps {
  toggleMobile: () => void;
}

export function Navbar({ toggleMobile }: NavbarProps) {
  const pathname = usePathname();
  // const { data: session } = useSession();

  const handleNavClick = (path: string) => {
    if (path !== pathname) {
      toggleMobile();
    }
  };

  const renderMenu = (
    items: MenuItem[],
    basePath: string = "",
  ): React.ReactNode[] =>
    items.map(({ title, path, icon, sub, disabled, divider, action }, key) => {
      const fullPath = basePath + path;
      const isActive = fullPath === pathname;
      const hasActiveSubmenu = Boolean(
        sub?.some(({ path }) => path === pathname),
      );

      const nav = sub ? (
        <NavLink
          key={key}
          label={
            <Text fz={14} truncate>
              {title}
            </Text>
          }
          className={classes.nav}
          leftSection={icon?.(hasActiveSubmenu)}
          active={hasActiveSubmenu}
          defaultOpened={hasActiveSubmenu}
          disabled={disabled}
        >
          <Flex direction="column" className={classes.sub} mt={4} mb={4}>
            {renderMenu(sub)}
          </Flex>
        </NavLink>
      ) : (
        <NavLink
          key={key}
          component={Link}
          href={fullPath}
          label={
            <Text fz={14} truncate>
              {title}
            </Text>
          }
          className={classes.nav}
          leftSection={icon?.(isActive)}
          active={isActive}
          disabled={disabled}
          onClick={(e) => {
            if (action) {
              e.preventDefault();
              action();
            }
            if (fullPath === pathname) {
              e.preventDefault();
              e.nativeEvent.stopImmediatePropagation();
            }
            handleNavClick(fullPath);
          }}
        />
      );

      return divider
        ? [nav, <Divider key={`div-${key}`} my={5} mx={5} variant="dashed" />]
        : [nav];
    });

  return (
    <Box mx={5} my={5}>
      {/* {session?.user.roleId === 1
        ? renderMenu(Menu.MenuAdmin)
        : session?.user.roleId === 2
          ? renderMenu(Menu.MenuUser)
          : null} */}
      {renderMenu(Menu.MenuAdmin)}
    </Box>
  );
}
