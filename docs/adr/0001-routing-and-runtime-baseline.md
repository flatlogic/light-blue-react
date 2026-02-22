# ADR 0001: Routing and Runtime Baseline

## Status
Accepted

## Context
The project historically used hash routing and accumulated legacy router/state glue.
At the same time, the build system moved from CRA/rewired to Vite, and active code needed a single modern route model.

## Decision
1. Use `react-router-dom@7` route primitives (`Routes`, `Route`, `Navigate`).
2. Use `BrowserRouter` as the runtime router.
3. Keep navigation at component/action boundary with local helpers (no `connected-react-router`).
4. Keep route guards as wrapper components compatible with hook-based routing.

## Consequences
Positive:
- One routing model across app/documentation shells.
- Cleaner navigation ownership and less history coupling.
- Better alignment with current ecosystem and Vite.

Tradeoffs:
- Browser routing requires proper server rewrite fallback in production.
- Legacy links had to be normalized away from hash URLs.
