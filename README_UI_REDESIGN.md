# ThreatForge XDR — UI Redesign Patch

This is a **file overlay patch** for the existing Vite + React frontend. It keeps the existing package manifest and installed dependencies; no new npm package is required.

## Apply it on Windows

1. Stop the frontend dev server (`Ctrl + C`).
2. Back up your current folder first, for example copy `C:\Users\Public\ThreatForge-XDR\frontend\src` to `src-backup`.
3. Extract this ZIP into `C:\Users\Public\ThreatForge-XDR\` (the ZIP already contains the `frontend\...` paths). Allow files to merge/overwrite.
4. Open CMD and run:

   ```cmd
   cd /d C:\Users\Public\ThreatForge-XDR\frontend
   npm run dev
   ```

5. Open `http://localhost:5173`.

If dependencies are not installed in your existing frontend, run `npm install` once before `npm run dev`.

## What changed

- New Midnight Obsidian / Tactical Cyan design system, responsive navigation and mobile sidebar.
- Redesigned landing, features, pricing, about, contact and API documentation pages.
- Redesigned sign-in, registration and password-recovery screens while retaining the existing auth API calls.
- Redesigned dashboard, alert queue, analytics, reports and local preferences pages.
- Added a File Scanner screen for individual files and folder selection. It uses the existing `/uploads` API routes, sends 16 MiB chunks, checks the combined 12,000,000,000-byte client-side limit, finalizes the job and polls its status.
- Removed sensitive bearer-token console logging from the Axios request interceptor.
- Added a React Hot Toast host to the app entry point.

## Compatibility notes

- The patch expects the backend routes already discussed in this project: `POST /uploads/init`, `PUT /uploads/{job_id}/files/{file_id}/chunk`, `GET /uploads/{job_id}` and `POST /uploads/{job_id}/finalize`.
- The scanner page requires a valid sign-in token. It does not execute uploaded files.
- File-level details shown by the UI are limited to what the current upload status API returns. The status endpoint in this backend build returns each file's status/path/size, but not the stored SHA-256 or full engine output yet.
- The password-recovery page is informational because the current backend has no reset-email endpoint. Google/GitHub buttons were removed because no frontend SSO flow was configured.
- Settings are browser-local only; they do not modify server-side scan policy.
- Commercial pricing is not fabricated; the pricing page explains that this project build has no published subscription rates.

## Validation

All 99 TypeScript/TSX source files passed a TypeScript syntax transpilation check, and relative imports were checked for missing local files. A complete Vite/TypeScript build could not be run in this environment because npm package downloads failed with DNS `EAI_AGAIN`; please run `npm run build` locally after applying the patch.
