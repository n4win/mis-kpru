import { FACULTY_CODES, type FacultyCode, type ProjectNode, type Allocations } from "./types";

export function isLeaf(node: ProjectNode): boolean {
  return !node.children || node.children.length === 0;
}

export function nodeAllocations(node: ProjectNode): Allocations {
  if (isLeaf(node)) return node.allocations ?? {};
  const sum: Allocations = {};
  for (const child of node.children ?? []) {
    const childSum = nodeAllocations(child);
    for (const fc of FACULTY_CODES) {
      const v = childSum[fc] ?? 0;
      if (v) sum[fc] = (sum[fc] ?? 0) + v;
    }
  }
  return sum;
}

export function nodeTotal(node: ProjectNode): number {
  const a = nodeAllocations(node);
  return FACULTY_CODES.reduce((s, fc) => s + (a[fc] ?? 0), 0);
}

export function rollupTree(roots: ProjectNode[]): {
  total: number;
  byFaculty: Record<FacultyCode, number>;
} {
  const byFaculty = Object.fromEntries(
    FACULTY_CODES.map((f) => [f, 0]),
  ) as Record<FacultyCode, number>;
  let total = 0;
  for (const root of roots) {
    const a = nodeAllocations(root);
    for (const fc of FACULTY_CODES) {
      const v = a[fc] ?? 0;
      byFaculty[fc] += v;
      total += v;
    }
  }
  return { total, byFaculty };
}

export function findNode(roots: ProjectNode[], id: string): ProjectNode | null {
  for (const r of roots) {
    if (r.id === id) return r;
    if (r.children) {
      const found = findNode(r.children, id);
      if (found) return found;
    }
  }
  return null;
}

function mapNodes(
  roots: ProjectNode[],
  fn: (n: ProjectNode) => ProjectNode,
): ProjectNode[] {
  return roots.map((r) => {
    const next = fn(r);
    if (next.children) return { ...next, children: mapNodes(next.children, fn) };
    return next;
  });
}

export function updateAllocation(
  roots: ProjectNode[],
  id: string,
  faculty: FacultyCode,
  amount: number,
): ProjectNode[] {
  return mapNodes(roots, (n) => {
    if (n.id !== id) return n;
    const next: Allocations = { ...(n.allocations ?? {}) };
    if (amount <= 0) delete next[faculty];
    else next[faculty] = amount;
    return { ...n, allocations: next };
  });
}

export function updateNodeMeta(
  roots: ProjectNode[],
  id: string,
  patch: { code?: string; name?: string },
): ProjectNode[] {
  return mapNodes(roots, (n) => (n.id === id ? { ...n, ...patch } : n));
}

export function genId(prefix = "n"): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}-${Date.now().toString(36)}`;
}

export function addChildNode(
  roots: ProjectNode[],
  parentId: string | null,
  child: ProjectNode,
): ProjectNode[] {
  if (parentId === null) return [...roots, child];
  return mapNodes(roots, (n) => {
    if (n.id !== parentId) return n;
    const nextChildren = [...(n.children ?? []), child];
    const { allocations: _omit, ...rest } = n;
    return { ...rest, children: nextChildren };
  });
}

export function removeNode(roots: ProjectNode[], id: string): ProjectNode[] {
  const filterRecursive = (nodes: ProjectNode[]): ProjectNode[] =>
    nodes
      .filter((n) => n.id !== id)
      .map((n) =>
        n.children ? { ...n, children: filterRecursive(n.children) } : n,
      );
  return filterRecursive(roots);
}

export function fmt(n: number): string {
  return n.toLocaleString();
}
