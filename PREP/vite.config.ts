import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  envPrefix: ['VITE_', 'AUTHORIZATION_', 'CHALLENGE_', 'ORGANIZATION_', 'SOLUTION_', 'WORKSPACE_', 'MEDIA_'],
})
