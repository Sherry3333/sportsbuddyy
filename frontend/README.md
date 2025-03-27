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

# 技术栈
1. 该项目使用react+ vite + less(用于管理css样式)
2. 使用zustand进行状态的管理
3. 使用axios进行接口的请求，接口封装好的文件在`src/utils/request.js`
4. 使用react-router-dom进行路由管理
5. 使用antd作为UI组件库

# 项目结构
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
│   │   ├── img //存放图片
│   │   ├── seedToken.js //存放antd UI组件库的主题色
│   │   └── variables.less //存放全局的less变量
│   ├── domain //处理对应页面的业务逻辑
│   │   ├── home  
│   │   ├── login
│   │   ├── register
│   │   └── user //处理用户相关的业务逻辑 如： 修改用户名，获取用户的登录信息等
│   ├── main.jsx
│   ├── pages //页面组件
│   │   ├── 404.jsx //404页面
│   │   ├── home //主页
│   │   ├── login //登录页面
│   │   └── register //注册页面
│   └── utils //工具函数
│       └── request.js //axios请求的封装
├── vite.config.js
└── yarn.lock //使用yarn作为包管理工具   此项目对应包的版本
```
# 项目启动
1. 安装依赖包 `yarn install` 或者 `npm install`
2. 启动项目 `yarn dev` 或者 `npm run dev`
3. 打包项目 `yarn build` 或者 `npm run build`
