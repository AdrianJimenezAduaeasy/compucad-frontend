import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'agricolato.com',
      'agricola-front-85340514893.us-east1.run.app',
      'agricola-front-85340514893.us-east1.run.app/8080'
    ],
    host: '0.0.0.0',
    //port: 8080
    port: 5173,
  },
})
