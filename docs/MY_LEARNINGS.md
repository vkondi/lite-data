# My Learnings

**Last Updated:** 2026-02-10

## Technical Learnings

### Full-Stack Architecture: Next.js + Flask
- I learned to build a hybrid architecture where Next.js serves as both frontend framework and API proxy, while Flask handles data generation on a separate port
- I realized that using `rewrites` in `next.config.ts` enables seamless environment switching: dev routes to `localhost:5328`, production routes to serverless functions
- I discovered that this decoupling allows independent scaling and deployment—Next.js on Vercel, Flask anywhere
- I learned that setting `responseType: 'blob'` in axios is essential for binary file downloads (CSV, Excel, etc.)

### React 19 Patterns
- I adopted `useActionState()` for form submission instead of traditional event handlers—it simplifies async state management and loading states
- I realized that React 19's server actions pattern reduces boilerplate compared to `useState + useEffect + fetch`
- I learned to use `useCallback()` extensively to prevent unnecessary re-renders, especially in context providers
- I discovered that `useMemo()` for rendered lists improves performance when fields change frequently

### Context API for Global State
- I implemented a nested provider pattern: `ThemeProvider` wraps `DataSelectorProvider` to ensure theme applies globally
- I learned to create custom hooks (`useDataSelectorContext`, `useThemeContext`) that throw errors if used outside providers—prevents silent bugs
- I realized that separating concerns into distinct contexts (theme vs. data) makes testing and maintenance easier
- I discovered that persisting theme preference to `localStorage` in a `useEffect` creates a seamless UX across sessions

### TypeScript Configuration
- I used path aliases (`@/*`) to eliminate relative import hell (`../../../components`)
- I enabled `strict: true` which caught null/undefined bugs early during development
- I learned that `incremental: true` significantly speeds up development builds
- I realized that targeting `ES2017` balances modern syntax with browser compatibility

### Data Generation with Faker.js
- I implemented a centralized `DATA_GENERATORS` dictionary that maps field types to lambda functions—this prevents typos and enables validation
- I learned that special cases like `auto_increment` need row index as parameter: `lambda n: n` vs. parameterless generators
- I discovered that treating generators as first-class functions enables easy extension—adding a new type is just one dictionary entry
- I realized that validating field types server-side before generation prevents wasted computation

### Export Format Implementation
- I learned that all export formats can stream through `io.BytesIO()` buffer, avoiding disk I/O
- I discovered that Pandas provides native converters for CSV, JSON, XML, HTML, and Excel—no manual serialization needed
- I realized that XML column names must be sanitized (replace spaces with underscores) to be valid XML tags
- I learned to reset buffer position with `buffer.seek(0)` before `send_file()` to avoid empty responses
- I implemented timestamped filenames (`generated_data_2026-02-10_13-30-45.csv`) to prevent download collisions

### Frontend Download Pattern
- I discovered the blob URL + DOM anchor click pattern for browser-based downloads:
  ```typescript
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  link.click();
  ```
- I learned that this approach works across all modern browsers without server-side filename handling

## Code Quality & Maintainability

### Component Organization
- I structured components by feature folders (e.g., `Footer/Footer.tsx`, `Header/Header.tsx`) rather than flat files
- I learned that co-locating component-specific CSS modules keeps styles scoped and reduces naming conflicts
- I realized that marking components with `"use client"` at the top prevents accidental server/client boundary issues
- I adopted a pattern where each component exports a single default component with clear JSDoc comments

### Modular Backend Routing
- I implemented Flask Blueprints to separate concerns: `health_bp`, `common_bp`, `data_bp` each handle distinct responsibilities
- I learned that registering blueprints with URL prefixes (`/api/health`, `/api/data`) creates clean, RESTful routes
- I discovered that Flask's factory pattern (`create_app()`) enables easier testing by creating app instances on demand

### Naming Conventions
- I used descriptive variable names that reveal intent: `file_format`, `data_request`, `rowCount` instead of abbreviations
- I learned to name generator functions after their output type: `nameGenerator`, `emailGenerator`—makes code self-documenting
- I adopted PascalCase for React components, camelCase for functions/variables, snake_case for Python (following language conventions)

### Error Handling
- I implemented graceful error handling in data generation: return error dict with 400 status instead of throwing exceptions
- I learned to use try-catch with axios and display user-friendly messages via Snackbar instead of console errors
- I discovered that validating inputs server-side (field types, count) prevents invalid data generation attempts
- I realized that logging errors with context (`logger.info(f"file_name: {file_name}")`) aids debugging in production

## Architecture & Design Decisions

### Why Next.js + Flask Instead of Next.js API Routes
- I chose Flask for data generation because Python has mature libraries (Faker, Pandas) that would require JS ports in Node
- I realized that Python's Pandas DataFrame API makes export format conversion trivial (one method call per format)
- I learned that keeping Flask separate allows me to deploy it independently or replace it with FastAPI later
- I discovered that reverse proxying in Next.js makes this architecture transparent to the frontend

### Why Material-UI (MUI)
- I selected MUI because it provides accessible, production-ready components out of the box
- I learned that MUI's theming system integrates well with custom React Context for dark/light mode
- I realized that responsive utilities like `useMediaQuery` eliminate the need for custom breakpoint logic
- I discovered that MUI components follow WCAG guidelines, improving accessibility without extra effort

### Why Context API Instead of Redux/Zustand
- I chose Context API because this app's state is simple: field configuration and theme preference
- I realized that Context API is built into React, reducing bundle size and dependency complexity
- I learned that for this use case, Context's re-render behavior is acceptable—field changes aren't frequent enough to warrant optimization
- I discovered that custom hooks wrapping `useContext` provide type safety and better DX than raw context

### Why Vitest Instead of Jest
- I selected Vitest because it integrates natively with Vite/Turbopack used by Next.js—no Babel config needed
- I learned that Vitest's ESM-first approach avoids the `require` vs. `import` issues common in Jest
- I realized that Vitest's API is Jest-compatible, making migration easy if needed
- I discovered that Vitest's coverage reporting (via v8) is faster than Jest's Istanbul

### Trade-Offs Made
- I traded server-side rendering benefits for client-side simplicity—all interactive components use `"use client"`
- I realized this is acceptable because data generation is a client-side action, not SEO-critical content
- I chose in-memory `BytesIO` buffers over temp files for simplicity, limiting max dataset size to available RAM
- I learned that for the target use case (mock data under 10,000 rows), this trade-off is reasonable

## Tooling & Developer Experience

### Concurrent Development Servers
- I used `concurrently` package to run Next.js and Flask with a single `yarn dev` command
- I learned to configure separate `next-dev` and `flask-dev` scripts for debugging individual services
- I discovered that Flask's auto-reload (`flask run`) pairs well with Next.js Turbopack for instant feedback

### Linting with ESLint Flat Config
- I adopted ESLint's new flat config format (`eslint.config.mjs`) instead of legacy `.eslintrc`
- I learned to use `@eslint/eslintrc` for backward compatibility with `next/core-web-vitals` and `next/typescript` presets
- I realized that flat config will become the standard, making this setup future-proof

### Testing Infrastructure
- I configured Vitest with `jsdom` environment to test React components
- I learned to mock axios globally in `vitest.setup.ts` to prevent real HTTP calls during tests
- I discovered that `@testing-library/react` encourages testing user behavior, not implementation details
- I realized that coverage exclusions (e.g., `exclude: ['**/test-utils/**']`) keep reports focused on meaningful metrics

### Git Ignore Strategy
- I configured `.gitignore` to exclude `node_modules`, `.next`, `__pycache__`, and Python virtual environments
- I learned to ignore coverage reports but commit test files for CI/CD reproducibility
- I realized that excluding `yarn.lock` or `requirements.txt` would break deterministic builds, so I keep them committed

### Environment Detection
- I implemented environment detection in Flask using `ENVIRONMENT` or `VERCEL` env vars
- I learned to disable debug mode in production to prevent security leaks
- I discovered that Next.js automatically sets `NODE_ENV`, but Flask requires manual config

## What I'd Do Differently Next Time

### Add Input Validation on Frontend
- I realized too late that client-side validation (e.g., max row count) would improve UX by preventing unnecessary API calls
- I would implement field name uniqueness checks to avoid duplicate column names in exports
- I learned that displaying validation errors inline (near inputs) is better than generic Snackbar messages

### Implement Caching for Config Endpoint
- I discovered that the `/api/common/get-config` endpoint is called on every page load but returns static data
- I would cache this response in Context or LocalStorage to reduce redundant API calls
- I realized that SWR or React Query would make this trivial with built-in caching

### Add Loading States for File Generation
- I learned that large datasets (1000+ rows) can take 2-3 seconds to generate, but there's no progress indicator
- I would implement a progress bar or percentage counter for better perceived performance
- I realized that streaming responses could enable incremental download for huge datasets

### Improve Error Messages
- I discovered that backend errors return generic "Error generating data" to the frontend
- I would parse backend error responses and display specific messages (e.g., "Invalid field type: xyz")
- I learned that exposing validation errors helps users fix issues faster

### Add E2E Tests
- I realized that while unit tests cover components, there's no test for the full data generation flow
- I would add Playwright or Cypress tests to validate: field addition → export → file download
- I learned that E2E tests catch integration bugs that unit tests miss (e.g., CORS issues, file encoding)

### Use Docker for Local Development
- I discovered that setting up Flask requires Python 3.x and pip, which can vary across machines
- I would containerize both services (Next.js + Flask) for consistent dev environments
- I realized that Docker Compose could replace `concurrently` and simplify onboarding new developers

### Add Rate Limiting
- I learned that the export endpoint has no rate limiting, making it vulnerable to abuse
- I would implement Flask-Limiter to restrict requests per IP (e.g., 10 requests/minute)
- I realized that adding this early prevents production issues later

### TypeScript Strict Null Checks on Frontend
- I discovered some places where I use optional chaining (`field?.name`) but don't handle undefined cases
- I would refactor to ensure all nullable values have explicit null checks or default values
- I learned that TypeScript's strict mode catches these, but I need to be more disciplined in addressing warnings
