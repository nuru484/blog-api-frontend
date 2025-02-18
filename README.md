# Blog Frontend Application

## Overview

A modern, responsive blog frontend built with React, providing a seamless user experience for reading and managing blog content.

[LIve Here](https://blog-api-frontend-blue.vercel.app)

[Backend Code](https://github.com/nuru484/blog-api-backend)

## Technologies Used

- React
- Vite
- Tailwind CSS
- Material UI
- Lucide React
- JWT Decode
- React Router

## Features

- Responsive design
- User authentication
- Blog post browsing
- Post filtering based on tags
- Searching for post based on names or keywords.
- Post creation and management
- Secure route protection
- Modern, clean UI

## Prerequisites

- Node.js (v16 or higher)
- npm

## Installation

1. Clone the repository

```bash
git clone git@github.com:nuru484/blog-api-frontend.git
cd blog-api-frontend
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:

```
VITE_SERVER_URL=http://localhost:8080
VITE_STORAGE_ENCRYPTION_KEY="your keys"
VITE_TINY_MCE_API_KEY="your tiny mce keys"

```

4. Start the development server

```bash
npm run dev
```

5. Build for production

```bash
npm run build
```

## Authentication Flow

- Login using JWT
- Store token in encrypted local storage
- Decode token to manage user session
- Protect routes based on authentication status

## Routing

Using React Router for navigation between:

- Home/Blog listing
- Individual blog post
- Login/Signup pages
- Post management dashboard

## Styling

- Tailwind CSS for utility-first styling
- Material UI for pre-built components
- Responsive design principles

## State Management

- React Context API for global state
- Local component state where appropriate

## Performance Optimization

- Vite for fast development and builds
- Code splitting
- Lazy loading of components

## Deployment

- Vercel

## Contributing

Although this project is private, contributions may be allowed on a case-by-case basis with explicit permission. If you are granted access and wish to contribute, please follow these steps:

1. **Fork the repository** (if access is granted).
2. Create your feature branch:

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. Commit your changes:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request for review.

---

## Contact

Nurudeen Abdul-Majeed - abdulmajeednurudeen48@gmail.com
