# Changelog

## [Unreleased] - 2026-02-22
- Phase 1 modernization baseline fixes:
  - fixed dead fallback redirect in app shell (`/app/main/visits` -> `/app/main/dashboard`);
  - hardened `AuthRoute` against missing `location.state`;
  - normalized login/register/forgot links to absolute auth routes;
  - replaced obsolete layout test with route-guard smoke tests;
  - removed conflicting project-level `babel.config.js` to align with CRA toolchain.
- Tooling baseline updates:
  - added explicit `ajv@^8.18.0` dev dependency to fix webpack/schema-utils `ajv` resolution during build;
  - documented working install path (`npm install --legacy-peer-deps`) in README.
- Phase 2 modernization updates:
  - migrated build/dev/preview workflow to Vite + SWC (`vite.config.js`, root `index.html`);
  - removed CRA/rewired build overrides (`config-overrides.js`, `public/index.html`, `react-app-rewired`, `react-scripts`);
  - migrated test runner to Vitest and retained route-guard smoke coverage;
  - migrated runtime env handling to Vite-compatible app env bridge (`VITE_BACKEND` + `__APP_ENV__`);
  - kept build output compatibility (`build/`) and added Node memory guard for large production bundle builds;
  - standardized lockfile strategy to npm (`package-lock.json`).
- Dependency refresh batch 1:
  - low-risk update: `bootstrap` upgraded within major (`5.2.3` -> `5.3.8`);
  - major update block A: `axios` (`0.27.2` -> `1.13.5`), `jsonwebtoken` (`8.5.1` -> `9.0.3`), `cross-env` (`7.0.3` -> `10.1.0`);
  - adjusted SCSS override to keep build compatibility with Bootstrap 5.3 variable changes.
- Dependency refresh batch 2:
  - updated `react-slick` (`0.30.3` -> `0.31.0`), `showdown` (`1.9.1` -> `2.1.0`), and `uuid` (`8.3.2` -> `13.0.0`);
  - fixed `redux-thunk` import usage for v3 named export (`ReduxThunk` -> `thunk`) to restore production build compatibility.
- Dependency refresh batch 3:
  - updated form/data libs: `formik` (`1.5.8` -> `2.4.9`), `yup` (`0.32.11` -> `1.7.1`), `react-toastify` (`6.2.0` -> `11.0.5`), `react-select` (`3.2.0` -> `5.10.2`), `filesize` (`6.4.0` -> `11.0.13`);
  - updated utility libs: `formsy-react` (`0.19.5` -> `2.3.2`) and `styled-components` (`5.3.11` -> `6.3.11`).
- Dependency refresh batch 4:
  - updated UI/demo libs: `react-dropzone` (`11.7.1` -> `15.0.0`), `react-autosize-textarea` (`5.0.1` -> `7.1.0`), `react-syntax-highlighter` (`13.5.3` -> `16.1.0`), `react-animate-height` (`2.1.2` -> `3.2.3`), `rc-slider` (`9.7.5` -> `11.1.9`), `react-bootstrap-table-next` (`3.3.5` -> `4.0.3`), `react-bootstrap-table2-toolkit` (`1.4.2` -> `2.1.3`);
  - migrated removed `rc-slider` tooltip helper API usage to v11-compatible slider usage in documentation/forms pages.
- Dependency refresh batch 5:
  - updated chart libs: `highcharts` (`10.3.3` -> `12.5.0`), `apexcharts` (`3.54.1` -> `5.6.0`), `react-apexcharts` (`1.9.0` -> `2.0.1`);
  - updated calendar stack to `@fullcalendar/*` `6.1.20` and adapted calendar config for v6 (`initialView`, list view target `listWeek`, removed deprecated plugin CSS imports).
- Dependency refresh batch 6:
  - removed React-16/17-locked dependencies: `connected-react-router`, `react-bootstrap-table-next`, `react-bootstrap-table2-toolkit`, `react-bootstrap-table2-paginator`, `react-google-maps`, `react-images`, `react-maskedinput`, `react-mde`, `react-shuffle`, `react-sortable-hoc`, `react-sortable-tree`, `react-table`;
  - replaced dependency-driven implementations with local/runtime-safe equivalents:
    - custom navigation action boundary + shared history singleton (no `connected-react-router`);
    - native/Reactstrap tables in users/management/dynamic pages (search + pagination preserved);
    - iframe-based map component for maps/timeline pages;
    - modal-based gallery image viewer;
    - local masked input and auto-resize textarea components;
    - local markdown editor (write/preview with Showdown);
    - native drag-and-drop sortable list implementation for list groups demo;
  - removed stale third-party CSS imports tied to deleted packages.
- Dependency refresh batch 7:
  - migrated router runtime to `react-router-dom` v7 (`Routes`/`Route`/`Navigate`) across app shell, main layout, and documentation layout;
  - removed deprecated router dependencies: `react-router`, `history`, `react-router-hash-link`;
  - replaced route guard implementation (`AdminRoute`, `UserRoute`, `AuthRoute`) with v7-compatible wrapper components and refreshed route smoke tests;
  - introduced local `withRouter` bridge (`src/components/withRouter.js`) to keep class-component routes working during phased hooks migration;
  - replaced hash-link usage in docs scrollspy with `react-router-dom` `Link`.
- Dependency refresh batch 8:
  - upgraded framework/tooling stack: `react`/`react-dom` (`18.3.1` -> `19.2.4`), `eslint` (`9.39.x` -> `10.0.1`);
  - upgraded chart/sortable stack: `echarts` (`4.9.0` -> `6.0.0`), `echarts-for-react` (`2.0.16` -> `3.0.6`), `react-sortablejs` (`1.5.1` -> `6.1.4`);
  - removed obsolete CRA-era dependencies no longer used under Vite: `react-app-polyfill`, `react-dev-utils`, `sass-loader`;
  - migrated ECharts imports to modular `echarts/core` registration compatible with ECharts 6.
- Phase 4 state modernization:
  - moved auth/users side effects to reusable service layer (`src/services/authService.js`, `src/services/usersService.js`);
  - migrated users auth-domain thunks to `async/await` with safer shared error-message handling;
  - consolidated registration state ownership in `auth` reducer and removed duplicated legacy `register` reducer/actions;
  - cleaned users state compatibility fields (`findLoading`/`loading`, list modal/delete metadata) and removed stale empty `dashboard` reducer.
- Phase 5 progress:
  - removed deprecated lifecycle methods from source components (`componentWillMount`, `componentWillReceiveProps`);
  - migrated users route-level pages (`UsersListPage`, `UsersViewPage`, `ChangePasswordFormPage`) from class components to hooks-based functional components;
  - migrated auth route-level pages (`Login`, `Register`, `Forgot`, `Reset`, `Verify`) from class components to hooks-based functional components;
  - migrated app shell components (`Layout`, `Header`, `Sidebar`) from class components to hooks-based functional components.
- Phase 6 quality hardening:
  - introduced repository lint gate with ESLint flat config and `npm run lint` command;
  - added GitHub Actions CI workflow (`.github/workflows/ci.yml`) for `npm ci`, `npm run lint`, `npm run build`, and `npm test`.
- Runtime/tooling compatibility:
  - aligned Node engine range to `^20.19.0 || >=22.12.0` to support current Node 22 environments and Vite 7 requirements.
  - `npm install` succeeds without `--legacy-peer-deps` on the migrated dependency graph.

## [8.3.1] - 26.11.2024
- Update dependencies

## [8.3.0] - 05/09/2024

- Added react-scripts version 5 along with webpack version 5 support.
- Added support for node.js version > 20
- Removed old webpack configs.
- Removed unnecessary dev dependencies.
- Replaced deprecated glyphicons-halflings icon library with bootstrap-icons

## [8.2.3] - 21.12.2023
- Update dependencies

## [8.2.2] - 18.05.2023
- Update dependencies
- Update react version
- Corrected minor errors

## [8.2.1] - 01.07.2022
- UI Adjust

## [8.2.0] - 17.06.2022
- Updated Bootstrap/Reactstrap
- Add theme swicther
- Updated dependencies

## [8.1.6] - 13.05.2021
- Updated blocks position in Typography, Form Validations, LB Packages, 
- Products Grid: Customize dropdowns in E-Commerce 
- Alerts:  Customize alerts notifications
- Dashboard: Fixed position pop-up alert in header
- Add function LoginOut in Login Page,   
- Following dependencies and devDependencies was updated to the recent versions
###Dependencies:
    "@fullcalendar/core": "5.3.0" -> "5.6.0",
    "@fullcalendar/daygrid": "5.3.0" -> "5.6.0",
    "@fullcalendar/interaction":  "5.3.0" -> "5.6.0",
    "@fullcalendar/list": "5.3.0" -> "5.6.0",
    "@fullcalendar/react": "5.3.0" -> "5.6.0",
    "@fullcalendar/timegrid": "5.3.0" -> "5.6.0",
    "axios": "^0.19.2" -> "^0.21.1",
    "bootstrap": "4.5.0" -> "4.6.0",`
    "classnames": "^2.2.6" -> "^2.3.1",
    "connected-react-router": "^6.8.0" -> "6.9.1",
    "draft-js": "^0.11.6" -> "^0.11.7",
    "echarts-for-react": "^2.0.16",
    "file-saver": "^2.0.2" ->  "^2.0.5",
    "filesize": "^6.1.0" -> "^6.3.0",
    "md5": "^2.2.1" -> "^2.3.0",
    "rc-slider": "^9.5.1" -> "^9.7.2",
    "react": "^16.13.1" -> "^16.14.0",
    "react-animate-height": "^2.0.21" -> "^2.0.23",
    "react-animated-number": "^0.4.4",
    "react-apexcharts": "^1.3.7" -> "^1.3.9",
    "react-app-polyfill": "^0.1.3" -> "^0.2.0",
    "react-dev-utils": "^6.0.5" -> "^6.1.1",
    "react-dom": "^16.5.2" -> "^16.14.0",
    "react-draft-wysiwyg": "1.10.12" -> "1.14.7",
    "react-dropzone": "^11.2.0" -> "^11.3.2",
    "react-mde": "^11.0.0" -> "^11.5.0",
    "react-redux": "7.2.0" -> "7.2.4",
    "react-router-hash-link": "^2.1.0" -> "^2.4.1",
    "react-scrollspy": "^3.4.2" -> "^3.4.3",
    "react-select": "^3.1.0" -> "^3.2.0",
    "react-slick": "^0.26.1" -> "^0.28.1",
    "react-sortable-tree": "^2.7.1" -> "^2.8.0",
    "react-toastify": "^6.0.8" -> "^6.2.0",
    "react-transition-group": "^4.4.1",
    "redux": "^4.0.5" -> "^4.1.0",
    "sortablejs": "1.10.2" -> "1.13.0",
    "styled-components": "^5.1.1" -> "^5.3.0",
    "uuid": "^8.3.0" -> "^8.3.2",
    "yup": "^0.29.1" -> "^0.32.9"
  
  ###DevDependencies:
    "@babel/core": "7.4.4" -> "7.14.0",
    "@babel/plugin-proposal-class-properties": "7.4.4" -> "7.13.0",
    "@babel/plugin-proposal-optional-chaining": "7.2.0" -> "^7.13.12",
    "@svgr/webpack": "4.2.0" ->"4.3.3",
    "babel-core": "7.0.0-bridge.0",
    "babel-eslint": "10.0.1" -> "10.1.0",
    "babel-jest": "24.8.0" -> "24.9.0",
    "babel-loader": "8.0.5" -> "8.2.2",
    "babel-plugin-named-asset-import": "1.0.0-next.103" -> "1.0.0-next.154",
    "babel-preset-react-app": "9.0.0" -> "9.1.2",
    "bfj": "6.1.1" -> "6.1.2",
    "case-sensitive-paths-webpack-plugin": "2.2.0" -> "2.4.0",
    "cross-env": "^7.0.2" -> "^7.0.3",
    "dotenv": "8.5.1" -> "8.5.1",
    "eslint-plugin-flowtype": "3.8.1" -> "3.13.0",
    "eslint-plugin-import": "2.17.2" -> "2.22.1",
    "eslint-plugin-jsx-a11y": "6.2.1" -> "6.4.1",
    "eslint-plugin-react": "7.13.0" -> "7.23.2",
    "eslint-plugin-react-hooks": "1.6.0" -> "1.7.0",
    "jest": "24.8.0" -> "24.9.0",
    "jest-pnp-resolver": "1.2.1" -> "1.2.2",
    "jest-resolve": "24.8.0" -> "24.9.0",
    "mini-css-extract-plugin": "0.6.0" -> "0.12.0",
    "node-sass": "4.14.0" -> "4.14.1",
    "optimize-css-assets-webpack-plugin": "5.0.1" -> "5.0.4",
    "pnp-webpack-plugin": "1.4.3" -> "1.6.4",
    "postcss-flexbugs-fixes": "4.1.0" -> "4.2.1",
    "postcss-preset-env": "6.6.0" -> "6.7.0",
    "postcss-safe-parser": "4.0.1" -> "4.0.2",
    "resolve": "1.10.1" -> "1.20.0",
    "sass-loader": "7.1.0" -> "7.3.1",
    "style-loader": "0.23.0" -> "0.23.1",
    "terser-webpack-plugin": "1.2.3" -> "1.4.4",
    "webpack": "4.31.0" -> "4.44.0",
    "webpack-dev-server": "3.3.1" -> "3.11.2",
    "webpack-manifest-plugin": "2.0.4" -> "2.2.0",
  
## [8.1.5]

- Updated documentation

## [8.1.4]

### Updated 

- Updated sidebar and header icons
- Updated sidebar and header layout

## [8.1.3]

### Fixed 

- Change badge text in the sidebar
- Change alert text in the usermanager/ecommerce

## [8.1.2]

### Fixed bugs and layout issues

- Add new images to Documentation and LB Package pages
- Change progress bars bg color
- Update main colors
- Badges and buttons: fix margins, change font colors
- Dropdowns: change paddings
- Header component: change dropdown hover states
- Charts: fix charts issues
- Fix adaptive and layout issues on pages
- Charts: fix label colors, apex dropdown text

## [8.1.1]

- Added link to flatlogic on login page

## [8.1.0]

- Updated all dependencies, cleaned up dependency tree

## [8.0.5]

- Updated fullcalendar package to v5.3.0

## [8.0.4]

- Add animation to alert in header
- Fix animated classes
- Fix colors in notifications, chart dropdown menu, tables

## [8.0.3]

- Updated line-awesome package

## [8.0.2]

### Fixed bug

- Fixed sidebar caret for Safari

## [8.0.1]

### New Features

- Added sample formik widget

## [8.0.0]

### New Features

- Added brand new Backend
- New tab to mange users
- Social login
- Manage users functionality
- Update password route
- Reset password route
- Upload avatar
- Refactored architecture

## [7.2.0]

### New Features

- Added re-usable breadcrumbs component

## [7.1.2]

### Fixed

- Fixed small calendar events

## [7.1.1]

### Fixed

- Added css fixes

## [7.1.0]

### New Features

- New color scheme

## [7.0.1]

### Fixed

- Fix bugs and css improvements

## [7.0.0]

### Updated

- Removed Jquery from core layout

### New Features

- New charts

## [6.1.0]

### New Features

- Make an api stub for non-backend mode
