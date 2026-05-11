"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Burger,
  Group,
  Avatar,
  Text,
  useMantineColorScheme,
  useComputedColorScheme,
  ActionIcon,
  Box,
  Stack,
  Menu,
  UnstyledButton,
  Divider,
  Skeleton,
  Flex,
} from "@mantine/core";
import {
  IconChevronDown,
  IconLogout,
  IconMoon,
  IconSun,
} from "@tabler/icons-react";
import { ModalService } from "@/utils/modalService";
// import { signOut, useSession } from "next-auth/react";
import { SearchMenu, ButtonSpotlightSearch } from "@/components/ui";

import cx from "clsx";
import classes from "@/styles/layout/main/header.module.css";
import { getFirstChar } from "@/utils";

interface Props {
  openedMobile: boolean;
  toggleMobile: () => void;
}

export function Header({ openedMobile, toggleMobile }: Props) {
  // const { data: session } = useSession();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const confirmLogout = () => {
    ModalService.confirm({
      title: "ออกจากระบบ",
      detail: "คุณต้องการออกจากระบบใช่หรือไม่?",
      confirmLabel: "ตกลง",
      confirmColor: "red",
      onConfirm: () => {
        // signOut();
      },
    });
  };

  return (
    <>
      <Box className={classes.header}>
        <Group gap={"xs"}>
          <Burger
            opened={openedMobile}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />

          <ButtonSpotlightSearch
            placeholder="Search for features"
            spotlight={<SearchMenu />}
          />
        </Group>

        <Group gap={12}>
          <ActionIcon
            size={40}
            color="gray"
            variant="outline"
            radius="xl"
            aria-label="Toggle color scheme"
            className={classes.themeToggle}
            onClick={() =>
              setColorScheme(computedColorScheme === "light" ? "dark" : "light")
            }
          >
            <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
            <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
          </ActionIcon>

          <Menu
            width={200}
            position={"bottom-end"}
            transitionProps={{ transition: "pop-top-right" }}
          >
            <Menu.Target>
              <UnstyledButton>
                <Group gap={8}>
                  <Avatar size={40} color={"blue"} variant={"light"}>
                    <Text fz={18} fw={500}>
                      {getFirstChar("John")}
                      {getFirstChar("Doe")}
                    </Text>
                  </Avatar>
                </Group>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Box p={10}>
                <Stack gap={0}>
                  <Text fz={14} fw={600} c="light-dark(#122B45, #f9f9f9)">
                    {/* {session?.user.firstname} {session?.user.lastname} */}
                    John Doe
                  </Text>
                  <Text fz={12} fw={400} c={"dimmed"}>
                    {/* {session?.user.depId
                      ? session.user.depName
                      : session?.user.roleName} */}
                    ทดสอบ
                  </Text>
                </Stack>
              </Box>
              <Divider variant={"dashed"} my={2} />
              <Menu.Item
                color={"red"}
                leftSection={<IconLogout size={16} />}
                onClick={confirmLogout}
              >
                ออกจากระบบ
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Box>
    </>
  );
}

export function HeaderNavbar({ openedMobile, toggleMobile }: Props) {
  return (
    <Flex gap={10} px={10} align="center" justify={"space-between"}>
      <Group>
        <Box
          style={{
            width: 44,
            height: 44,
            borderRadius: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(0,0,0,0.06)",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <Image src="/img/logo.svg" alt="MIS Logo" width={36} height={36} />
        </Box>
        <Stack gap={2}>
          <Text c="light-dark(#122B45, #f9f9f9)" size="14px" fw={600} lh={1.3}>
            MIS KPRU
          </Text>
          <Text size="xs" c="dimmed">
            มหาวิทยาลัยราชภัฏกำแพงเพชร
          </Text>
        </Stack>
      </Group>

      <Burger
        opened={!openedMobile}
        onClick={toggleMobile}
        hiddenFrom="sm"
        size="sm"
      />
    </Flex>
  );
}
