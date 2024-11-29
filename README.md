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

Here’s the structure of the project along with a brief explanation of each directory and its contents.

```

┣ 📂public
┃ ┗ 📜vite.svg <!-- Static assets like images, fonts, and other public files -->
┣ 📂src
┃ ┣ 📂api
┃ ┃ ┣ 📜commentFetch.jsx <!-- API calls related to comments -->
┃ ┃ ┣ 📜index.jsx <!-- Entry point for API requests -->
┃ ┃ ┣ 📜likesFetch.jsx <!-- API call to manage likes -->
┃ ┃ ┣ 📜loginFetch.jsx <!-- API call for login -->
┃ ┃ ┣ 📜postsFetch.jsx <!-- API call to fetch posts -->
┃ ┃ ┣ 📜signupFetch.jsx <!-- API call for signup -->
┃ ┃ ┗ 📜tagsFetch.jsx <!-- API call for tags -->
┃ ┣ 📂assets
┃ ┃ ┗ 📜blog-logo.webp <!-- Image and media files for the app -->
┃ ┣ 📂components
┃ ┃ ┣ 📂ui
┃ ┃ ┃ ┣ 📜alert-dialog.jsx <!-- UI component for alert dialog -->
┃ ┃ ┃ ┣ 📜alert.jsx <!-- UI component for general alerts -->
┃ ┃ ┃ ┣ 📜button.jsx <!-- UI component for button -->
┃ ┃ ┃ ┣ 📜dialog.jsx <!-- UI component for dialog box -->
┃ ┃ ┃ ┣ 📜dropdown-menu.jsx <!-- UI component for dropdown menus -->
┃ ┃ ┃ ┣ 📜input.jsx <!-- UI component for input fields -->
┃ ┃ ┃ ┗ 📜loading.jsx <!-- UI component for loading state -->
┃ ┃ ┣ 📜About.jsx <!-- About page component -->
┃ ┃ ┣ 📜BlogCard.jsx <!-- Component for displaying individual blog cards -->
┃ ┃ ┣ 📜BlogDetail.jsx <!-- Component for displaying detailed blog -->
┃ ┃ ┣ 📜CommentIcon.jsx <!-- Icon component for comments -->
┃ ┃ ┣ 📜Comments.jsx <!-- Comments section component -->
┃ ┃ ┣ 📜CreateCommentForm.jsx <!-- Component for creating a comment -->
┃ ┃ ┣ 📜Header.jsx <!-- Header component -->
┃ ┃ ┣ 📜LikeIcon.jsx <!-- Icon component for likes -->
┃ ┃ ┣ 📜LoginButton.jsx <!-- Button component for login -->
┃ ┃ ┣ 📜LoginForm.jsx <!-- Login form component -->
┃ ┃ ┣ 📜NabBar.jsx <!-- Navigation bar component -->
┃ ┃ ┣ 📜PostForm.jsx <!-- Form component for creating posts -->
┃ ┃ ┣ 📜PostManagementMenu.jsx <!-- Menu for managing posts -->
┃ ┃ ┣ 📜PostsList.jsx <!-- List of posts component -->
┃ ┃ ┣ 📜SignUpForm.jsx <!-- Signup form component -->
┃ ┃ ┣ 📜SuccessAlert.jsx <!-- Success message alert component -->
┃ ┃ ┣ 📜TagManager.jsx <!-- Component for managing tags -->
┃ ┃ ┗ 📜UserProfile.jsx <!-- Component for displaying user profile -->
┃ ┣ 📂context
┃ ┃ ┣ 📜AuthContext.jsx <!-- Context for managing authentication state -->
┃ ┃ ┣ 📜PostContext.jsx <!-- Context for managing post-related state -->
┃ ┃ ┗ 📜TagsContext.jsx <!-- Context for managing tags-related state -->
┃ ┣ 📂hooks
┃ ┃ ┣ 📜useAuth.jsx <!-- Custom hook for handling authentication -->
┃ ┃ ┣ 📜useCreateComment.jsx <!-- Custom hook for creating comments -->
┃ ┃ ┣ 📜useLikes.jsx <!-- Custom hook for managing likes -->
┃ ┃ ┣ 📜useLoginAfterSignup.jsx <!-- Custom hook to handle login post-signup -->
┃ ┃ ┣ 📜usePostContext.jsx <!-- Custom hook for using PostContext -->
┃ ┃ ┣ 📜usePostForm.jsx <!-- Custom hook for handling post form logic -->
┃ ┃ ┗ 📜useTagsContext.jsx <!-- Custom hook for using TagsContext -->
┃ ┣ 📂lib
┃ ┃ ┣ 📜cookies.js <!-- Utility functions for handling cookies -->
┃ ┃ ┣ 📜encryptedStorage.js <!-- Utilities for encrypted storage -->
┃ ┃ ┣ 📜errorHandler.js <!-- Error handling utilities -->
┃ ┃ ┗ 📜utils.js <!-- General utility functions -->
┃ ┣ 📂pages
┃ ┃ ┣ 📜CreatePostPage.jsx <!-- Page for creating posts -->
┃ ┃ ┣ 📜ErrorPage.jsx <!-- Error page to handle errors -->
┃ ┃ ┣ 📜Home.jsx <!-- Home page component -->
┃ ┃ ┣ 📜LoginPage.jsx <!-- Login page component -->
┃ ┃ ┗ 📜SignUpPage.jsx <!-- Signup page component -->
┃ ┣ 📂routes
┃ ┃ ┣ 📜ProtectedRoute.jsx <!-- Protected route component -->
┃ ┃ ┗ 📜index.jsx <!-- Routing logic -->
┃ ┣ 📜App.jsx <!-- Main app component -->
┃ ┣ 📜index.css <!-- Global styles -->
┃ ┗ 📜main.jsx <!-- Entry point for React app -->

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

````

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
````
