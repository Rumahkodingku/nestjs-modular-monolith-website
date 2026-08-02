# Agent Instructions

## Toolchain and Commands

- Use Node.js 24 and pnpm 10.34.5; install with `corepack enable`, `corepack prepare pnpm@10.34.5 --activate`, then `pnpm install --frozen-lockfile`.
- Run the development site with `pnpm dev`; production verification is `pnpm build` followed by `pnpm start`.
- The only configured checks are `pnpm lint` and `pnpm types:check`; the latter regenerates Fumadocs output, Next route types, and then runs `tsc --noEmit`.
- There is no test script or test runner configured in this repository. Do not document or invoke API commands such as `pnpm test`, migrations, or seeders as if they belong to this site.
- For a focused verification pass, run `pnpm lint`, `pnpm types:check`, and `pnpm build` in that order.

## Structure

- This is a Next.js 16 documentation/marketing site, not the NestJS backend. Runtime code is under `src/`; routes are under `src/app/`, shared helpers under `src/lib/`, and reusable UI under `src/components/`.
- Fumadocs reads MDX from `content/docs/` via `source.config.ts`; edit those files for documentation content and do not edit generated files under `.source/`.
- `src/lib/source.ts` is the content adapter and `src/app/docs/[[...slug]]/page.tsx` renders documentation pages. Search, Markdown/LLM output, and OG routes are separate handlers under `src/app/`.
- The `@/*` alias resolves to `src/*`; `collections/*` resolves to generated `.source/*`. Keep imports consistent with these configured aliases.

## Conventions

- Preserve the existing four-space formatting and 120-column Prettier settings from `.prettierrc`; ESLint uses Next Core Web Vitals rules.
- `proxy.ts` handles `.md` suffixes and `Accept`-header Markdown negotiation for documentation. Changes to documentation URLs or content routes must account for its rewrites and the route constants in `src/lib/shared.ts`.
- The root landing page and `/pro` page share landing components and styles; reuse those components and the established design tokens before adding new parallel UI patterns.
