@AGENTS.md

# MIS KPRU — Project Context

## Tech Stack

- **Next.js 16** App Router (`src/app/`) — read `node_modules/next/dist/docs/` before writing routing/server code
- **React 19**, **TypeScript 5**
- **Mantine 9** — UI components (`@mantine/core`, `@mantine/form`, `@mantine/hooks`, `@mantine/modals`, `@mantine/notifications`, `@mantine/charts`, `@mantine/spotlight`, `@mantine/dates`, `@mantine/dropzone`)
- **mantine-datatable 8** — data tables (not Mantine's built-in Table)
- **@tabler/icons-react 3** — icons
- **Prisma 7** + **MSSQL** — database
- **NextAuth 5 (beta)** — authentication
- **Zustand 5** — global state
- **dayjs** — date formatting
- **axios** — HTTP client
- **Tailwind 4** — utility CSS (use sparingly; prefer Mantine props)

## Folder Structure

```
src/
  app/                        # Next.js App Router pages
    admin/                    # Admin section
  components/
    features/                 # Feature-specific components (co-located)
    layout/                   # Shared layout (navbar, header, main layout)
    ui/                       # Shared UI components (exported via index.ts)
  lib/                        # auth.ts, logger.ts
  utils/                      # constant/, modalService, notificationService, index.ts
  styles/                     # CSS Modules (layout, components)
  proxy.ts                    # API proxy
```

## Coding Style

- No comments unless the WHY is non-obvious
- No docstrings or multi-line comment blocks
- No trailing summaries after edits — just make the change
- No features beyond what the task requires
- Thai language for all UI text
- `"use client"` at top of any component using hooks or browser APIs

## Mantine Docs

Fetch on demand: https://mantine.dev/llms.txt
Full reference: https://mantine.dev/llms-full.txt

## Path Alias

`@/` maps to `src/`
