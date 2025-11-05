# 🧭 NavLink — Smart Active Link Component for Next.js (App Router)

A **production-ready `NavLink` component** for Next.js App Router.
It simplifies building navigation with **active link highlighting**, **SSR-safe active detection**, and **external link handling** — all fully typed with **TypeScript**.

---

## ✨ Features

✅ Seamless integration with Next.js App Router (`usePathname`)
✅ Automatic **active link detection** (exact or partial match)
✅ Safe **external link handling** with proper security defaults
✅ Fully **typed** with `NavLinkProps`
✅ Built-in **accessibility** (`aria-current="page"`)
✅ **SSR-safe** — avoids hydration mismatches
✅ Minimal and **performance-optimized** (uses `useMemo` for all derived states)

---

## 📦 Installation

```bash
npm install @your-org/navlink
# or
yarn add @your-org/navlink
```

---

## 🚀 Usage

```tsx
"use client";

import NavLink from "@your-org/navlink";

export default function Navbar() {
  return (
    <nav className="flex gap-4">
      <NavLink href="/" exact>
        Home
      </NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="https://example.com" target="_blank">
        External Site
      </NavLink>
    </nav>
  );
}
```

### Active Link Example

- When on `/about`, the “About” link automatically gets `activeClassName`.
- For `/about/team`, it also highlights `/about` unless you set `exact`.

---

## ⚙️ Props

| Prop              | Type              | Default                                                                                                   | Description                                          |
| ----------------- | ----------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `href`            | `string`          | **required**                                                                                              | Destination URL (internal or external).              |
| `exact`           | `boolean`         | `false`                                                                                                   | Require exact match to mark as active.               |
| `activeClassName` | `string`          | `"text-sky-600 font-semibold bg-sky-50 dark:bg-sky-950/20"`                                               | Classes applied when active.                         |
| `className`       | `string`          | `"inline-flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 focus:outline-none"` | Base classes for the link.                           |
| `children`        | `React.ReactNode` | —                                                                                                         | Link label or content.                               |
| `[...rest]`       | HTML anchor props | —                                                                                                         | All other anchor attributes (`target`, `rel`, etc.). |

---

## 🧠 Active State Logic

The component:

- Uses `usePathname()` from `next/navigation`.
- Normalizes paths (`/about/` → `/about`).
- Supports **exact** or **startsWith** match.
- Avoids hydration mismatches during SSR.

---

## 🌐 External Link Handling

Automatically detects external URLs (`https://`, `http://`) and applies correct handling.
You can still override `target="_blank"` or `rel="noopener noreferrer"` manually if needed.

---

## 🧩 Type Exports

If you need strong typing in your project:

```ts
import type { NavLinkProps } from "@your-org/navlink";
```

---

## 🔍 Example Styling

You can customize styles easily with Tailwind or CSS:

```tsx
<NavLink
  href="/dashboard"
  className="px-4 py-2 text-gray-700 hover:text-sky-600"
  activeClassName="font-bold text-sky-600 border-b-2 border-sky-600"
>
  Dashboard
</NavLink>
```

---

## 🧱 Folder Structure

```
src/
├── NavLink.tsx
└── index.ts
```

### `index.ts`

```ts
export { default } from "./NavLink";
export type { NavLinkProps } from "./NavLink";
```

---

## 📜 License

MIT © 2025 NuraLoom

---
