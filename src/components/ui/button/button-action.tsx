"use client";

import { Menu, MenuProps, ActionIcon, Flex } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";

interface ButtonActionProps {
  menu: {
    color?: string;
    icon?: React.ReactNode;
    label: string;
    onClick: (e: React.MouseEvent) => void;
    disabled?: boolean;
  }[];
}

export function ButtonAction({
  menu,
  ...props
}: ButtonActionProps & Omit<MenuProps, keyof ButtonActionProps>) {
  return (
    <Flex align="center" justify="center">
      <Menu
        {...props}
        offset={1}
        withArrow
        withinPortal
        position="bottom-end"
        transitionProps={{ transition: "scale-y" }}
      >
        <Menu.Target>
          <ActionIcon
            variant="subtle"
            color="gray"
            onClick={(e) => e.stopPropagation()}
          >
            <IconDotsVertical />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          {menu.map((item, index) => (
            <Menu.Item
              key={index}
              color={item.color}
              leftSection={item.icon}
              onClick={item.onClick}
              disabled={item.disabled}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
}
