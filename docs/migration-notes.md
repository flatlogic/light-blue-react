# Migration Notes

## Scope and Status
This project is now running on:
- Vite 7 + SWC
- React Router 7 with `BrowserRouter`
- Redux Toolkit store setup
- React 19 runtime

Core routes/auth/users/dashboard/grid/charts flows were validated after migration changes.

## Major Behavior Changes
1. Routing mode switched from hash URLs to browser history URLs.
2. Legacy `jsonwebtoken` client decode path was removed; JWT payload decoding is now handled by `src/core/jwt.js`.
3. Legacy `rc-hammerjs` usage was replaced with local `SwipeArea` component.
4. Legacy chart bootstrapping was updated for modern ECharts/Highcharts module APIs.
5. Form validation widgets were adapted for modern `formsy-react` API shape.

## Dependency Cleanup Applied
Removed direct dependencies that are no longer imported by source code:
- `buffer`
- `https-browserify`
- `jsonwebtoken`
- `md5`
- `rc-hammerjs`

`yarn.lock` was removed to keep npm as the single package manager source of truth.

## Known Compatibility Constraints
The app is on React 19, while some legacy UI libraries still declare peer ranges up to React 18.
Examples: `formsy-react`, `react-draft-wysiwyg`, `react-tagsinput`, `react-popper` (via `reactstrap`).

Current practical impact:
- Runtime works for active routes.
- Clean dependency install may require peer override behavior from npm depending on local npm version/policy.

Recommended install command for this release line:
```bash
npm install --force
```

## Follow-up Work
1. Replace `formsy-react` validation demo stack with a React 19-native form solution.
2. Replace `react-draft-wysiwyg`/`draft-js` with a maintained editor stack.
3. Replace `react-tagsinput` demo usage with a React 19-compatible tags input.
4. Re-run install validation without peer overrides after replacements.

## Rollback Notes
If a release is unstable:
1. Deploy previous tag.
2. Revert dependency lockfile and package changes from the release commit.
3. Re-run `npm install`, `npm run build`, `npm test` on the rollback commit.
