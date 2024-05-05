# Profile Web App

## Overview

This web app is built using ReactJs (frontend) and ExpressJs (server) and allows users to create their own profile and share it with a qr code.

## Tech Stack

- **Frontend**: React.js,
- **Backend**: Express.js
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Form Validation and Management**: React Hook Form
- **Auth Management**: Firebase
- **Icons**: React-Icons,
- **Toast**: React-Hot-Toast,

### Prerequisites

List of software and tools required to run the project locally.

- Node.js
- npm or yarn

### Installation

Steps to install project dependencies and get the project running locally.

1. Clone the repository:

   ```sh
   git clone https://github.com/fayzanrj/profile-web-app.git

   ```

2. Install dependencies

   npm install

   For both client and server in their respective folders

3. Include environment variables

- For Client
- - VITE_SERVER_HOST
- - VITE_HOST_URL

#FIREBASE

- - VITE_FIREBASE_API_KEY
- - VITE_FIREBASE_AUTH_DOMAIN
- - VITE_FIREBASE_PROJECT_ID
- - VITE_FIREBASE_STORAGE_BUCKET
- - VITE_FIREBASE_MESSAGING_SENDER_ID
- - VITE_FIREBASE_APP_ID
- - VITE_FIREBASE_MEASUREMENT_ID

- For Server
- - DATABASE_URI

#FIRBASE ADMIN SDK

- - FIREBASE_PROJECT_ID
- - FIREBASE_CLIENT_EMAIL
- - FIREBASE_PRIVATE_KEY=

4. Running

   npm run dev for client

   npm run nodemon for server
