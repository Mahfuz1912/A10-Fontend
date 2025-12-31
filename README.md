# React + Vite Authentication Demo

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules. It includes a demo authentication system using Firebase.


## Features

- User registration and login (email/password and Google)
- Profile management with edit functionality
- Protected routes
- Error page for 404s
- Contact page for support inquiries
- Responsive design with Tailwind CSS

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Firebase config in `FireBaseConfig.js`
4. Run the development server: `npm run dev`


## 🔑 Firebase Configuration

To connect this project to your Firebase project, you need to set up environment variables.

1.  Create a file named `.env.local` in the root directory of your project.
2.  Add the following variables, replacing the values with your Firebase configuration keys:

```env
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
```

> **Note:** You can find these values in your Firebase Console under Project Settings > General > Your apps > SDK setup and configuration.