export const Constant = {
  locale: "th",
  ActiveData: [
    { value: "1", label: "เปิดใช้งาน" },
    { value: "0", label: "ปิดใช้งาน" },
  ],
  THAI_LEADING_VOWELS: "^[เแโไใ]",
};

export const getAvatarColor = (id: number) => {
  const colors = ["blue", "teal", "violet", "orange", "pink", "cyan", "green"];
  return colors[id % colors.length];
};

export const ROLE_COLORS: Record<number, string> = {
  1: "violet",
  2: "blue",
  3: "teal",
  4: "orange",
};

export const getInitials = (
  firstName: string,
  lastName: string,
  username: string,
) => {
  const a = (firstName || "").trim();
  const b = (lastName || "").trim();
  if (a || b) {
    return `${a.charAt(0)}${b.charAt(0)}`.toUpperCase() || "-";
  }
  return (username || "?").slice(0, 2).toUpperCase();
};

export const getFirstChar = (name?: string | null): string => {
  if (!name) return "";
  const first = name.charAt(0);
  if (new RegExp(Constant.THAI_LEADING_VOWELS).test(first)) {
    return name.charAt(1) || first;
  }
  return first;
};
