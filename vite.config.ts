import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

type MyServerOptions = {
  host?: string | boolean;
  port?: number;
  strictPort?: boolean;
  https?: boolean;
  open?: boolean | string;
};

export default defineConfig({
  // base: '/',
  base: '/hh-fe2/',
  plugins: [react()],
  server: {
    fs: {
      strict: false,
      historyApiFallback: true,
    },
    host: '0.0.0.0',
    port: 5173,
  } as MyServerOptions,
});
