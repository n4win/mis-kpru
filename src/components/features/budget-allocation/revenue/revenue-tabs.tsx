"use client";

import { Tabs } from "@mantine/core";
import { useState } from "react";
import { BorkorInput } from "./borkor";
import { KorborborInput } from "./korborbor";
import { GraduateInput } from "./graduate";
import type { ProgramType } from "./types";

const TAB_LABEL: Record<ProgramType, string> = {
  borkor: "บ.กศ",
  korborbor: "กศ.บป",
  graduate: "บัณฑิต",
};

const TAB_ORDER: ProgramType[] = ["borkor", "korborbor", "graduate"];

export function RevenueTabs() {
  const [active, setActive] = useState<ProgramType>("borkor");

  return (
    <Tabs
      mt={20}
      value={active}
      onChange={(v) => v && setActive(v as ProgramType)}
    >
      <Tabs.List>
        {TAB_ORDER.map((t) => (
          <Tabs.Tab key={t} value={t}>
            {TAB_LABEL[t]}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      <Tabs.Panel value="borkor" pt="md">
        <BorkorInput />
      </Tabs.Panel>
      <Tabs.Panel value="korborbor" pt="md">
        <KorborborInput />
      </Tabs.Panel>
      <Tabs.Panel value="graduate" pt="md">
        <GraduateInput />
      </Tabs.Panel>
    </Tabs>
  );
}
