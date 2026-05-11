"use client";

import type { ReactNode } from "react";
import { Flex, Group, Stack, Text, Button, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Breadcrumbs } from "./breadcrumbs";

interface HeaderAdminProps {
  title: string;
  description: string;
  buttonLabel?: string;
  onClickCreate?: () => void;
  breadcrumbs: { label: string; href?: string }[];
  extraActions?: ReactNode;
}

export function HeaderAdmin({
  title,
  description,
  buttonLabel,
  onClickCreate,
  breadcrumbs,
  extraActions,
}: HeaderAdminProps) {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} mb={20} />
      <Flex
        justify={"space-between"}
        align={"flex-end"}
        wrap={"wrap"}
        gap={10}
        my={5}
      >
        <Stack gap={0}>
          <Title order={3}>{title}</Title>
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        </Stack>

        <Group gap="xs">
          {extraActions}
          {buttonLabel && (
            <Button
              leftSection={<IconPlus size={18} />}
              onClick={onClickCreate}
            >
              {buttonLabel}
            </Button>
          )}
        </Group>
      </Flex>
    </>
  );
}
