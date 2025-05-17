import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // ✅ Use this port

    host: true, // 👈 allow LAN access
    proxy: {
      '/api': 'http://localhost:8080',
      '/analytics': 'http://localhost:8080',
      '/logout': 'http://localhost:8080',
    }
  },
});