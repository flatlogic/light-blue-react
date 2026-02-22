# Rollback and Recovery

## When to Roll Back
Use rollback when production regression is confirmed and cannot be hotfixed safely in release window.

## Rollback Procedure
1. Identify last known-good tag.
2. Redeploy that tag.
3. Verify login, dashboard, users, and key report pages.

## Repository Recovery Steps
1. Checkout rollback target:
   ```bash
   git checkout <known-good-tag-or-commit>
   ```
2. Install dependencies:
   ```bash
   npm install --force
   ```
3. Validate:
   ```bash
   npm run build
   npm test
   ```

## Forward Fix Strategy
1. Reproduce issue on current head.
2. Add a focused regression test when feasible.
3. Ship fix in a dedicated patch release.
