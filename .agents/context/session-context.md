# Session Context — nexora-ui

Self-contained summary of the work done and findings so far. Read this first to recover context. Always read `AGENTS.md` too (architecture rules, conventions, examples).

## Project Snapshot

- **Stack**: React 19 + TanStack Router (file-based routes, `src/routeTree.gen.ts` regenerated with `pnpm routes:generate`) + Mantine v9.5.0 (`@mantine/core`, `@mantine/hooks`) + Tailwind v4 (CSS-first) + react-i18next/i18next + zustand + React Hook Form + Yup + TanStack Query + MSW (mock API when `VITE_ENABLE_MOCKS=true`).
- **Routes**: `/` (login, `LoginPage`), `_app` pathless layout (`DashboardLayoutPage`) with children `dashboard`, `doctors/{create,delete,listing}`, `patients/{create,delete,listing}`. There is NO `/login` route — login lives at `/`. After login: `navigate({ to: "/dashboard" })`.
- **Domains**: `src/modules/{user,doctors,patients,common}` + infra `{auth,layouts,providers}`. Each domain has `components/containers/hooks/const/schemas` (+ `contexts` when needed) with barrel `index.ts` files. DAL in `src/DAL/{domain}/` (services + `*.query.ts`/`*.mutation.ts` hooks), constants in `src/DAL/const/`.
- **Rules that bite**: containers only import from own domain or common (layouts container CANNOT import user containers → pass things as props from the page, e.g. `navbarTop`). Pages can import from any domain. i18n keys always English (`dashboard:navigation.doctors` etc.), files in `public/locales/{EN,ES}`. Schemas live in the domain's `schemas/` folder, never inline. No magic strings: constants in `*.const.ts` (UPPER_SNAKE_CASE).
- **Login mock** (`src/mocks/handlers.ts`): returns `{ id: "1", name: "Admin", email: <typed email>, role: "ADMIN" }` + token. No password validation.
- **Env/theme**: `src/config/config.ts` validates env via yup; `src/theme.ts` has `primaryColor: "indigo"` (indigo-7 = `#4263eb` = `rgb(66, 99, 235)`).

## Completed Work (this session)

### Dashboard layout & sidebar (done)
- `src/modules/layouts/containers/DashboardLayoutContainer/DashboardLayoutContainer.container.tsx`: `AppShell` bg `var(--mantine-primary-color-6)`, header height 60, navbar `width: 250, breakpoint: "sm", collapsed: { mobile: !opened }`. `AppShell.Navbar` bg primary-6 `withBorder={false}`; renders optional `navbarTop` (sticky wrapper) then `SidebarMenuContainer`. `AppShell.Main` `bg="primary"`, `pl="var(--app-shell-navbar-offset)"`, `pt="var(--app-shell-header-offset)"`, inner `Box bg="white" h="calc(100dvh - 60px)" className="rounded-tl-xl rounded-tr-xl p-4"`.
- `navbarTop` sticky wrapper: `className="sticky top-0 z-10 border-b border-white/15 bg-(--mantine-primary-color-6) p-2 text-white"` (Tailwind v4 syntax `bg-(--var)`).
- **Mobile drawer = 80% width**: AppShell forces `--app-shell-navbar-width: 100%` on `:root` inside a runtime `<style>` in `#root` at `@media (max-width: 47.9937em)` when `collapsed.mobile` is set. Override in `src/index.css` (unlayered CSS):
  ```css
  @media (max-width: 47.9937em) {
    .mantine-AppShell-navbar { --app-shell-navbar-width: 80% !important; }
  }
  ```
  `!important` at element level is required (the runtime `:root` rule is injected later in DOM order; plain rules lose). The collapsed transform uses the same var (`translateX(calc(var(--app-shell-navbar-width) * -1))`) so everything stays consistent.
- **Close drawer on navigation, mobile only**: `src/modules/layouts/hooks/DashboardLayout/useDashboardLayout.ts` uses `useDisclosure` + `useMediaQuery("(max-width: 47.9937em)")`; exposes `onNavigate` = `close()` only if mobile. Prop `onNavigate` flows: `DashboardLayoutContainer → SidebarMenuContainer → SidebarMenu`; attached via `onClick` **only on leaf NavLinks** (parent NavLinks just expand children — close happens when a child is selected). Recursive `<SidebarMenu>` forwards the prop.

### Sidebar menu styling (done)
- `src/modules/common/const/sidebarMenu.const.ts`: `NAVBAR_LINK_ROOT_STYLES` — pill shape for active link: `--nl-bg`/`--nl-hover: white`, `--nl-color: var(--mantine-primary-color-7)`, longhand radii `borderTopLeftRadius`/`borderBottomLeftRadius: var(--mantine-radius-lg)` and right radii `0` (Mantine expands `borderRadius` shorthand leaving empty longhands — always use longhands). NO `color` property (inline style would beat `[data-active]` rule).
- Active link color comes from Mantine's `.m_f0824112:where([data-active],[aria-current=page]) { color: var(--nl-color) }`. Non-active items inherit white from the `<nav>` (`className="flex flex-col gap-1 p-2 pr-0 text-white"`) because `.text-white` (in `@layer utilities`) loses to Mantine's unlayered `.m_87cf2631 { color: inherit }` (UnstyledButton).
- Hover primary: `src/index.css` has `.sidebar-menu-link:hover { color: var(--mantine-primary-color-7); }` (unlayered rule beats `color: inherit`). Both NavLinks carry `className="sidebar-menu-link"`.
- `SidebarMenuItem` type (common/components/SidebarMenu): `{ label, icon?, to?, active?, children? }`. `useSidebarMenu` (common/hooks/SidebarMenu) decorates items with `active` via `useRouterState` pathname match.

### User module: auth context + UserTag (done)
- **`src/modules/user/contexts/auth.context.tsx`** — canonical single-file context pattern (see AGENTS.md "How to Create a Context"): `AuthContextValue { user: User }`, `DEFAULT_USER` const (`{ id: "1", name: "Admin", email: "admin@nexora.com", role: "ADMIN" }`), `AuthContext`, `AuthProvider` (delegates to `useAuthProvider` hook, applies `user ?? DEFAULT_USER`), `useAuthContext` (throws outside provider). Mounted in `src/modules/providers/AppProviders.tsx` (wraps RouterProvider). NOTE: this file exports a component + a hook → 1 accepted `react-refresh/only-export-components` warning.
- `src/modules/user/hooks/useAuthProvider.ts`: reads `user` from zustand `useAuthStore` (`src/store/authStore.ts`, updated by `useLoginForm` via `setAuth`).
- `src/modules/user/components/UserTag/UserTag.tsx`: `Group wrap="nowrap" gap="sm"` → `Avatar name={user.name} color="initials" radius="xl"` (initials auto, no image in `User` model) + `Stack gap={0} className="min-w-0 flex-1"` with name `Text fw={600} truncate` and email `Text truncate`. Default font sizes only (no custom fz). Colors inherited (white over primary navbar). **`min-w-0 flex-1` on the Stack is required** for truncation to work inside the Group (flex item won't shrink below content otherwise).
- `src/modules/user/containers/UserTagContainer/UserTagContainer.container.tsx` + hook `useUserTagContainer` (uses `useAuthContext`; always renders — context never yields null thanks to DEFAULT_USER). Wired via `navbarTop={<UserTagContainer />}` in `src/pages/DashboardLayout.page.tsx`.

### AGENTS.md updates (done)
- Domains: `common, user, doctors, patients` + infra `auth, layouts, providers`; removed client/staff-members/marketplace/catalogs references. DAL folders: `auth, common, const, doctors, patients, user`.
- New "## How to Create a Context" section with the canonical single-file pattern (context + provider + `use[Xxx]Context` hook in `[name].context.tsx`, default-value constants next to context, provider delegates to a module hook, barrel export).
- Examples updated to doctors/patients (`getDoctors.service.ts`, `useGetDoctors.query.ts`, `DoctorsMasterListTableContainer`, `DOCTORS_MASTER_LIST_TABLE_COLUMNS`).

## Critical Mantine v9 / CSS findings

- **Theme has no `variants`** in this version (`MantineThemeComponent` only supports `classNames/styles/vars/defaultProps`; `NavLinkVariant = "filled" | "light" | "subtle"`). Adding component variants to `src/theme.ts` is not possible in this version.
- **Styles API doesn't support nested selectors**: `styles={{ root: { "&:hover": ... } }}` fails per docs — use `className` + plain CSS for hover states.
- **Layer cascade**: Mantine CSS is unlayered → beats Tailwind v4 `@layer utilities` regardless of source order. Inline styles beat everything (incl. `[data-active]` rules). Runtime-injected `<style>` tags (e.g. AppShellMediaStyles, rendered inside `#root`) come after static `<head>` styles → they win ties; override with higher specificity or `!important` on the target element.
- **AppShell mobile breakpoint** with default theme: `@media (max-width: 47.9937em)` (em! = 48em − 0.0063). Use this exact string for `useMediaQuery` + custom CSS.
- **Avatar v9**: root class `m_f85678b6` is transparent; bg/color live on the placeholder `.m_104cd71f` (`background: var(--avatar-bg); color: var(--avatar-color)`). `color="initials"` sets `--avatar-bg`/`--avatar-color` from the name (verified: "Admin" → bg `#dbe4ff`, color `#364fc7`).
- **Mantine hash classes** seen: `.m_45252eee` AppShell navbar, `.m_87cf2631` UnstyledButton (`color: inherit`), `.m_11def92b` (legacy avatar root, unused), `.m_f0824112` NavLink root, `.m_f85678b6`/`.m_104cd71f` Avatar root/placeholder. Prefer stable `mantine-*` classnames (e.g. `.mantine-AppShell-navbar`, `.mantine-Avatar-root`) in custom CSS.
- **Group/Stack**: children may overflow unless the text container gets `min-w-0 flex-1`; `wrap="nowrap"` keeps single line.

## Verification Workflow (dev loop)

1. `nohup bash -c 'VITE_ENABLE_MOCKS=true pnpm dev --port 5199' > /tmp/opencode/vite.log 2>&1 & disown` (login page at `http://localhost:5199/`).
2. `nohup bash -c 'google-chrome --headless=new --disable-gpu --remote-debugging-port=9222 --user-data-dir=/tmp/opencode/chrome-profileX about:blank' > /tmp/opencode/chrome.log 2>&1 & disown`.
3. Node ESM script (Node ≥ 22 has global `WebSocket`) connecting to `http://localhost:9222/json/list` → `webSocketDebuggerUrl`, then CDP `Runtime.evaluate` / `Page.navigate` / `Emulation.setDeviceMetricsOverride`.
4. **Gotchas**: build eval expressions with `JSON.stringify` for selectors/values containing quotes (single-quoted selectors like `input[name='email']` break naive template strings). `Input.enable` doesn't exist. `Emulation.clearDeviceMetricsOverride` sometimes doesn't stick — set explicit desktop metrics instead. To log in: fill `form input[name='email']` + `input[name='password']` (Mantine TextInput default `type="text"`), click `form button[type='submit']`, then wait; mock returns "Admin" as the logged user.
5. Cleanup: `pkill -f "remote-debugging-port=9222"; pkill -f "vite.js --port 5199"` (the `kill %1`/`pgrep` loop occasionally hangs — use pkill directly).

## Work State

- **All requested tasks completed and verified** (lint 0 errors + build green; only accepted lint warning: `react-refresh/only-export-components` in `auth.context.tsx`; build warns about chunk size > 500 kB — pre-existing, not addressed).
- Dev servers/Chrome processes cleaned up after verification.
- No tests exist; lint = `pnpm lint` (eslint), typecheck/build = `pnpm build` (tsc && vite build).

## Open Items / Notes

- `useMediaQuery` in `useDashboardLayout` hardcodes `(max-width: 47.9937em)` to match AppShell's computed breakpoint — if theme breakpoints change, both must be updated.
- The 80% navbar override in `index.css` hardcodes the AppShell media query string for the same reason.
- `defaultOpened` on parent NavLinks — submenus are expanded by default; parents toggle children and do NOT trigger `onNavigate`.
