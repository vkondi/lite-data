# My Learnings

**Last Updated:** 2026-02-10

## Technical Learnings

### Full-Stack Architecture: Next.js + Flask
- Hybrid architecture: Next.js as frontend/proxy, Flask handles data generation on port 5328
- `rewrites` in `next.config.ts` enables environment switching: dev → `localhost:5328`, production → serverless functions
- Decoupling allows independent deployment (Next.js on Vercel, Flask anywhere)
- `responseType: 'blob'` in axios required for binary file downloads

### React 19 & State Management
- `useActionState()` for form submission simplifies async state and loading states vs traditional handlers
- Nested provider pattern: `ThemeProvider` wraps `DataSelectorProvider` for proper scope
- Custom hooks (`useDataSelectorContext`) throw errors when used outside providers—prevents silent bugs

### Data Generation with Faker.js
- Centralized `DATA_GENERATORS` dictionary maps field types to lambda functions—enables validation and prevents typos
- `auto_increment` requires row index parameter: `lambda n: n` vs parameterless generators
- First-class function approach enables easy extension (one dictionary entry per type)

### Export Format Implementation
- All formats stream through `io.BytesIO()` buffer—avoids disk I/O
- Pandas native converters handle CSV, JSON, XML, HTML, Excel
- XML column names must be sanitized (spaces → underscores) for valid tags
- `buffer.seek(0)` before `send_file()` prevents empty responses
- Timestamped filenames prevent download collisions

### Frontend Download Pattern
- Blob URL + DOM anchor click for browser downloads:
  ```typescript
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  link.click();
  ```

## Code Quality & Maintainability

### Modular Backend Routing
- Flask Blueprints separate concerns: `health_bp`, `common_bp`, `data_bp` with distinct responsibilities
- URL prefixes (`/api/health`, `/api/data`) create clean REST routes
- Factory pattern (`create_app()`) enables easier testing

### Error Handling
- Data generation returns error dict with 400 status instead of exceptions
- Server-side validation (field types, count) prevents invalid generation attempts
- Context logging (`logger.info(f"file_name: {file_name}")`) aids production debugging

## Architecture & Design Decisions

### Why Next.js + Flask
- Python's mature libraries (Faker, Pandas) avoid JS port dependencies
- Pandas DataFrame API enables trivial export conversion (one method call per format)
- Flask separation allows independent deployment or future FastAPI migration
- Next.js reverse proxy makes architecture transparent to frontend

### Why Context API vs Redux/Zustand
- Simple state (field config, theme) doesn't warrant external library
- Built into React—smaller bundle, zero dependencies
- Re-render behavior acceptable for infrequent field changes

### Why Vitest vs Jest
- Native Vite/Turbopack integration—no Babel config
- ESM-first avoids `require` vs `import` issues
- Jest-compatible API enables easy migration
- v8 coverage reporting faster than Istanbul

### Trade-Offs Made
- Client-side rendering over SSR—acceptable for non-SEO-critical data generation tool
- In-memory `BytesIO` buffers limit dataset size to RAM but simplify implementation (target: <10k rows)

## Tooling & Developer Experience

### Development Setup
- `concurrently` runs Next.js + Flask with single `yarn dev` command
- Separate `next-dev` and `flask-dev` scripts enable individual service debugging
- ESLint flat config (`eslint.config.mjs`) with `@eslint/eslintrc` for backward compatibility

### Testing Infrastructure
- Vitest with `jsdom` environment for React components
- Global axios mocking in `vitest.setup.ts` prevents real HTTP calls
- Coverage exclusions keep reports focused on meaningful code

### Environment Detection
- Flask uses `ENVIRONMENT` or `VERCEL` env vars for production detection
- Debug mode disabled in production to prevent security leaks
- Next.js auto-sets `NODE_ENV`, Flask requires manual config

## What I'd Do Differently Next Time

### Frontend Validation
- Client-side validation (max row count, field name uniqueness) would prevent unnecessary API calls
- Inline validation errors beat generic Snackbar messages

### Caching & Performance
- `/api/common/get-config` returns static data but isn't cached—SWR/React Query would eliminate redundant calls
- Progress indicators for large datasets (1000+ rows take 2-3s)
- Streaming responses for incremental downloads

### Error Handling & Testing
- Parse backend errors for specific messages vs generic "Error generating data"
- E2E tests (Playwright/Cypress) catch integration bugs (CORS, encoding) missed by unit tests

### Infrastructure
- Docker containerization for consistent dev environments across machines
- Rate limiting on export endpoint (Flask-Limiter) prevents abuse
- Stricter TypeScript null handling on optional chaining usage
