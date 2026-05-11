"use client";

import { DataTable, DataTableProps } from "mantine-datatable";

// Hoist static JSX outside component to avoid recreation on each render
const CustomLoader = (
  <svg width="180" height="60" viewBox="0 0 120 40">
    <text
      x="10"
      y="25"
      fill="var(--main-color)"
      fontSize="16"
      fontFamily="Arial"
    >
      L
      <animate
        attributeName="y"
        values="25;20;25"
        dur="0.8s"
        begin="0s"
        repeatCount="indefinite"
      />
    </text>
    <text
      x="25"
      y="25"
      fill="var(--main-color)"
      fontSize="16"
      fontFamily="Arial"
    >
      O
      <animate
        attributeName="y"
        values="25;20;25"
        dur="0.8s"
        begin="0.1s"
        repeatCount="indefinite"
      />
    </text>
    <text
      x="40"
      y="25"
      fill="var(--main-color)"
      fontSize="16"
      fontFamily="Arial"
    >
      A
      <animate
        attributeName="y"
        values="25;20;25"
        dur="0.8s"
        begin="0.2s"
        repeatCount="indefinite"
      />
    </text>
    <text
      x="55"
      y="25"
      fill="var(--main-color)"
      fontSize="16"
      fontFamily="Arial"
    >
      D
      <animate
        attributeName="y"
        values="25;20;25"
        dur="0.8s"
        begin="0.3s"
        repeatCount="indefinite"
      />
    </text>
    <text
      x="70"
      y="25"
      fill="var(--main-color)"
      fontSize="16"
      fontFamily="Arial"
    >
      I
      <animate
        attributeName="y"
        values="25;20;25"
        dur="0.8s"
        begin="0.4s"
        repeatCount="indefinite"
      />
    </text>
    <text
      x="85"
      y="25"
      fill="var(--main-color)"
      fontSize="16"
      fontFamily="Arial"
    >
      N
      <animate
        attributeName="y"
        values="25;20;25"
        dur="0.8s"
        begin="0.5s"
        repeatCount="indefinite"
      />
    </text>
    <text
      x="100"
      y="25"
      fill="var(--main-color)"
      fontSize="16"
      fontFamily="Arial"
    >
      G
      <animate
        attributeName="y"
        values="25;20;25"
        dur="0.8s"
        begin="0.6s"
        repeatCount="indefinite"
      />
    </text>
  </svg>
);

type HiddenLoaderProps =
  | "loaderSize"
  | "loaderType"
  | "loaderColor"
  | "customLoader";

type TableMantineProps<T> = Omit<DataTableProps<T>, HiddenLoaderProps>;

const defaultPaginationText = ({
  from,
  to,
  totalRecords,
}: {
  from: number;
  to: number;
  totalRecords: number;
}) => `แสดง ${from} ถึง ${to} ของ ${totalRecords} รายการ`;

export function TableMantine<T>({
  noRecordsText = "ไม่พบข้อมูล",
  recordsPerPageLabel = "แสดงรายการ",
  paginationText = defaultPaginationText,
  ...rest
}: TableMantineProps<T>) {
  const merged = {
    noRecordsText,
    recordsPerPageLabel,
    paginationText,
    customLoader: CustomLoader,
    ...rest,
  } as unknown as DataTableProps<T>;

  return <DataTable {...merged} />;
}
