# React + Vite Authentication Demo

Lightweight React starter using Vite, Tailwind CSS and Firebase authentication. This project
includes email/password + Google sign-in, protected routes and a demo reviews UI.

## Contents

- Features
- Prerequisites
- Quick start
- Environment variables
- Common scripts
- Firebase deploy
- Troubleshooting

## Features

- Email/password + Google authentication (Firebase)
- Protected routes and user context
- Profile editing and avatar support
- Review submission UI with previews
- Responsive UI with Tailwind CSS

## Prerequisites

- Node.js >= 16 and npm (or yarn)
- A Firebase project (for Auth + Hosting)

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Create environment variables (see next section).

3. Start development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
npm run preview
```

## Environment variables

Create a `.env.local` file in the project root and add your Firebase config (Vite expects the `VITE_` prefix):

```env
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
```

The app reads these values in `src/component/fireBase/FireBaseConfig.js` — update that file if you prefer a different approach.

## Common scripts

- `npm run dev` — start development server with HMR
- `npm run build` — create production build
- `npm run preview` — locally preview production build
- `npm run lint` — run ESLint (if configured)

Example:

```bash
npm install
npm run dev
```

## Firebase deploy (Hosting)

1. Install Firebase CLI globally if needed:

```bash
npm install -g firebase-tools
```

2. Login and initialize (one-time):

```bash
firebase login
firebase init hosting
```

3. Build and deploy:

```bash
npm run build
firebase deploy --only hosting
```

Ensure the `public` folder and hosting target in `firebase.json` match your build output (Vite's `dist` folder by default).

## Troubleshooting

- Backend endpoints: this project may reference a separate backend. Check files like `src/component/Page/Add Review/AddReview.jsx` for endpoint URLs and update them if needed.
- CORS/network errors: confirm the backend allows requests from your app origin.
- Missing env vars: Vite only exposes variables prefixed with `VITE_`.

## Next steps

- Add automated tests, CI, and preview deploys for PRs.
- Add image validation and upload for reviews.

If you'd like, I can also update the repo's `package.json` scripts, add lint/format commands, or wire the Add Review title into the live preview.
