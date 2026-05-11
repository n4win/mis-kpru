"use client";

import { Select as SelectMantine, SelectProps } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

export function InputSelect({
  searchable,
  clearable,
  allowDeselect,
  rightSection,
  checkIconPosition,
  ...props
}: SelectProps) {
  return (
    <SelectMantine
      {...props}
      clearable={clearable ?? true}
      searchable={searchable ?? true}
      allowDeselect={allowDeselect ?? false}
      rightSection={rightSection ?? <IconChevronDown size={16} />}
      checkIconPosition={checkIconPosition ?? "right"}
    />
  );
}
