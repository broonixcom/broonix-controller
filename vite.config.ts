import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@api': 'src/api',
      '@components': '/src/components',
      '@dictionary': '/src/dictionary',
      '@fonts': '/src/fonts',
      '@helpers': '/src/helpers',
      '@hooks': '/src/hooks',
      '@lib': '/src/lib',
      '@pages': '/src/pages',
      '@context': '/src/context',
      '@src': '/src',
    },
  },
})
