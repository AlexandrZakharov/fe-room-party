import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';
import url from 'url';
import basicSsl from '@vitejs/plugin-basic-ssl'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    proxy: {
      '/api': 'https://193.42.110.148:443'
    }
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
