"use client";

import { ActionIcon, TextInput, TextInputProps } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";

interface SearchProps extends Omit<TextInputProps, "onChange"> {
  onChange: (value: string) => void;
  onClear?: () => void;
}

export function Search({
  value,
  onChange,
  onClear,
  leftSection,
  rightSection,
  ...props
}: SearchProps) {
  const hasValue =
    value !== null && value !== undefined && String(value).length > 0;

  return (
    <TextInput
      {...props}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      rightSection={
        rightSection ??
        (hasValue && onClear ? (
          <ActionIcon variant="subtle" color="gray" onClick={onClear} size="sm">
            <IconX size={14} />
          </ActionIcon>
        ) : null)
      }
      leftSection={leftSection ?? <IconSearch size={14} />}
    />
  );
}
