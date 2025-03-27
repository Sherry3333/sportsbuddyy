import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        // 全局变量/混入（可选配置）
        additionalData: `@import "@/assets/variables.less";`,
        modifyVars: {
          // 修改变量（可选）
          "primary-color": "#1890ff"
        },
        javascriptEnabled: true // 支持 Less 中的 JavaScript 表达式
      }
    }
  },
  resolve: {
    // https://cn.vitejs.dev/config/#resolve-alias
    alias: {
      // config path
      "~": path.resolve(__dirname, "./"),
      // config another name
      "@": path.resolve(__dirname, "./src")
    },
    // https://cn.vitejs.dev/config/#resolve-extensions
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"]
  },
  assetsInclude: ["**/*.svg", "**/*.eot", "**/*.woff", "**/*.woff2", "**/*.ttf"],
  server: {
    port: 90,
    host: true,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000", //http://192.168.1.111:7878？
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, "/api")
      }
    }
  },
  build: {
    target: "esnext"
  }
});
