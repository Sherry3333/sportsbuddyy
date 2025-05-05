# Tech Stack

1. The project uses React + Vite + Less (for CSS style management).

2. Uses Zustand for state management.

3. Uses Axios for API requests, with the encapsulated request module located at src/utils/request.js.

4. Uses react-router-dom for routing management.

5. ses Ant Design (antd) as the UI component library.

# Project Structure

```
.
├── README.md
├── eslint.config.js
├── index.html
├── jsconfig.json
├── package-lock.json
├── package.json
├── public
│   └── vite.svg
├── src
│   ├── App.jsx
│   ├── assets
│   │   ├── img              // Stores images
│   │   ├── seedToken.js     // Defines theme colors for Ant Design components
│   │   └── variables.less   // Global LESS variables
│   ├── domain               // Handles business logic for corresponding pages
│   │   ├── home  
│   │   ├── login
│   │   ├── register
│   │   └── user            // Handles user-related business logic (e.g., updating username, fetching user info)
│   ├── main.jsx
│   ├── pages                // Page components
│   │   ├── 404.jsx         // 404 page
│   │   ├── home            // Home page
│   │   ├── login           // Login page
│   │   └── register        // Registration page
│   └── utils               // Utility functions
│       └── request.js      // Axios request wrapper
├── vite.config.js
└── yarn.lock               // Uses Yarn as the package manager (version-specific dependencies)
```

# Project Setup

1. Install dependencies:

  ```
  yarn install  # or npm install
  ```

2. Start the development server:

  ```
  yarn dev      # or npm run dev
  ```

3. Build for production:

  ```
  yarn build    # or npm run build
  ```
