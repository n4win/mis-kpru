"use client";

import Link from "next/link";
import {
  Breadcrumbs as MantineBreadcrumbs,
  BreadcrumbsProps,
  Text,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

interface Props {
  items: { label: string; href?: string }[];
}

export function Breadcrumbs({
  items,
  ...props
}: Props & Omit<BreadcrumbsProps, keyof Props | "children">) {
  return (
    <MantineBreadcrumbs
      {...props}
      separatorMargin={6}
      separator={<IconChevronRight size={18} />}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (isLast || !item.href) {
          return (
            <Text key={index} c={isLast ? undefined : "dimmed"} size={"sm"}>
              {item.label}
            </Text>
          );
        }

        return (
          <Text
            key={index}
            component={Link}
            href={item.href}
            c={"dimmed"}
            size={"sm"}
          >
            {item.label}
          </Text>
        );
      })}
    </MantineBreadcrumbs>
  );
}
