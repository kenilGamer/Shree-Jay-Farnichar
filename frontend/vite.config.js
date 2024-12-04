import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://37.114.37.82:5000', // Backend URL
                changeOrigin: true,
            },
        },
    },
});
