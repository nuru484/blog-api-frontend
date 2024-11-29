# Blog Frontend Application

## Overview

A modern, responsive blog frontend built with React, providing a seamless user experience for reading and managing blog content.

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
- npm or yarn

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

## Project Structure

```
📦blog-api
 ┣
 ┃ ┃ ┃ ┗ 📜migration.sql
 ┃ ┃ ┣ 📂20241031162415_init
 ┃ ┃ ┃ ┗ 📜migration.sql
 ┃ ┃ ┗ 📜migration_lock.toml
 ┃ ┗ 📜schema.prisma
 ┣ 📂src
 ┃ ┣ 📂authentication
 ┃ ┃ ┣ 📜jwtAuthentication.js
 ┃ ┃ ┗ 📜refreshToken.js
 ┃ ┣ 📂controllers
 ┃ ┃ ┣ 📂validators
 ┃ ┃ ┃ ┣ 📜commentValidator.js
 ┃ ┃ ┃ ┣ 📜loginValidators.js
 ┃ ┃ ┃ ┣ 📜signupValidators.js
 ┃ ┃ ┃ ┗ 📜tagValidator.js
 ┃ ┃ ┣ 📜adminController.js
 ┃ ┃ ┣ 📜commentsController.js
 ┃ ┃ ┣ 📜likesController.js
 ┃ ┃ ┣ 📜loginController.js
 ┃ ┃ ┣ 📜postsController.js
 ┃ ┃ ┣ 📜signupController.js
 ┃ ┃ ┣ 📜tagsController.js
 ┃ ┃ ┣ 📜userController.js
 ┃ ┃ ┗ 📜viewsController.js
 ┃ ┣ 📂middleware
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┗ 📜authorizeRole.js
 ┃ ┃ ┣ 📜error-handler.js
 ┃ ┃ ┗ 📜rateLimit.js
 ┃ ┣ 📂public
 ┃ ┗ 📂routes
 ┃ ┃ ┣ 📜admin.js
 ┃ ┃ ┣ 📜comments.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜likes.js
 ┃ ┃ ┣ 📜login.js
 ┃ ┃ ┣ 📜posts.js
 ┃ ┃ ┣ 📜refreshToken.js
 ┃ ┃ ┣ 📜signup.js
 ┃ ┃ ┣ 📜tags.js
 ┃ ┃ ┣ 📜user.js
 ┃ ┃ ┗ 📜views.js
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜server.js📦blog-api-frontend
 ┣
 ┣ 📂public
 ┃ ┗ 📜vite.svg
 ┣ 📂src
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📜commentFetch.jsx
 ┃ ┃ ┣ 📜index.jsx
 ┃ ┃ ┣ 📜likesFetch.jsx
 ┃ ┃ ┣ 📜loginFetch.jsx
 ┃ ┃ ┣ 📜postsFetch.jsx
 ┃ ┃ ┣ 📜signupFetch.jsx
 ┃ ┃ ┗ 📜tagsFetch.jsx
 ┃ ┣ 📂assets
 ┃ ┃ ┗ 📜blog-logo.webp
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂ui
 ┃ ┃ ┃ ┣ 📜alert-dialog.jsx
 ┃ ┃ ┃ ┣ 📜alert.jsx
 ┃ ┃ ┃ ┣ 📜button.jsx
 ┃ ┃ ┃ ┣ 📜dialog.jsx
 ┃ ┃ ┃ ┣ 📜dropdown-menu.jsx
 ┃ ┃ ┃ ┣ 📜input.jsx
 ┃ ┃ ┃ ┗ 📜loading.jsx
 ┃ ┃ ┣ 📜About.jsx
 ┃ ┃ ┣ 📜BlogCard.jsx
 ┃ ┃ ┣ 📜BlogDetail.jsx
 ┃ ┃ ┣ 📜CommentIcon.jsx
 ┃ ┃ ┣ 📜Comments.jsx
 ┃ ┃ ┣ 📜CreateCommentForm.jsx
 ┃ ┃ ┣ 📜Header.jsx
 ┃ ┃ ┣ 📜LikeIcon.jsx
 ┃ ┃ ┣ 📜LoginButton.jsx
 ┃ ┃ ┣ 📜LoginForm.jsx
 ┃ ┃ ┣ 📜NabBar.jsx
 ┃ ┃ ┣ 📜PostForm.jsx
 ┃ ┃ ┣ 📜PostManagementMenu.jsx
 ┃ ┃ ┣ 📜PostsList.jsx
 ┃ ┃ ┣ 📜SignUpForm.jsx
 ┃ ┃ ┣ 📜SuccessAlert.jsx
 ┃ ┃ ┣ 📜TagManager.jsx
 ┃ ┃ ┗ 📜UserProfile.jsx
 ┃ ┣ 📂context
 ┃ ┃ ┣ 📜AuthContext.jsx
 ┃ ┃ ┣ 📜PostContext.jsx
 ┃ ┃ ┗ 📜TagsContext.jsx
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜useAuth.jsx
 ┃ ┃ ┣ 📜useCreateComment.jsx
 ┃ ┃ ┣ 📜useLikes.jsx
 ┃ ┃ ┣ 📜useLoginAfterSignup.jsx
 ┃ ┃ ┣ 📜usePostContext.jsx
 ┃ ┃ ┣ 📜usePostForm.jsx
 ┃ ┃ ┗ 📜useTagsContext.jsx
 ┃ ┣ 📂lib
 ┃ ┃ ┣ 📜cookies.js
 ┃ ┃ ┣ 📜encryptedStorage.js
 ┃ ┃ ┣ 📜errorHandler.js
 ┃ ┃ ┗ 📜utils.js
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📜CreatePostPage.jsx
 ┃ ┃ ┣ 📜ErrorPage.jsx
 ┃ ┃ ┣ 📜Home.jsx
 ┃ ┃ ┣ 📜LoginPage.jsx
 ┃ ┃ ┗ 📜SignUpPage.jsx
 ┃ ┣ 📂routes
 ┃ ┃ ┣ 📜ProtectedRoute.jsx
 ┃ ┃ ┗ 📜index.jsx
 ┃ ┣ 📜App.jsx
 ┃ ┣ 📜index.css
 ┃ ┗ 📜main.jsx
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┣ 📜components.json
 ┣ 📜eslint.config.js
 ┣ 📜index.html
 ┣ 📜jsconfig.json
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜postcss.config.js
 ┣ 📜tailwind.config.js
 ┣ 📜vercel.json
 ┗ 📜vite.config.js
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

## 📄 License

© Nurudeen Abdul-Majeed - All Rights Reserved

**Private & Proprietary**

- This project is **private** and **proprietary**.
- All content, code, and design are exclusive to the owner.
- **Unauthorized copying, modification, distribution, or use is strictly prohibited.**
- Written permission is required for any use or access beyond what is explicitly granted.

---

## Contact

Nurudeen Abdul-Majeed - abdulmajeednurudeen48@gmail.com
