# Release Checklist

## Pre-release
1. Confirm working tree scope and exclude non-release artifacts.
2. Run quality checks:
   - `npm run lint`
   - `npm test`
   - `npm run build`
3. Verify critical manual routes:
   - `/app/main/dashboard`
   - `/app/users`
   - `/app/forms/validation`
   - `/app/grid`
   - `/app/charts/highcharts`
4. Confirm `README.md`, `changelog.md`, and migration docs reflect shipped behavior.

## Versioning
1. Bump `package.json` version.
2. Add changelog entry under a dated release section.
3. Commit with release message.

## Tagging
1. Create annotated tag:
   - `git tag -a vX.Y.Z -m "Release vX.Y.Z"`
2. Verify tag points to expected commit:
   - `git show --no-patch --oneline vX.Y.Z`

## Post-release Verification
1. Fresh install in clean workspace.
2. Build artifact smoke check (`npm run build` + `npm run preview`).
3. Rollback command path validated (previous tag deployable).
