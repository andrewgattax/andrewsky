import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import vike from 'vike/plugin'
import { sitemapPlugin } from './vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    vike(),
    sitemapPlugin({
      baseUrl: 'https://queuer.com',
      outDir: path.resolve(__dirname, 'dist/client')
    })
  ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        fs: {
            allow: [
                // percorso della root della monorepo
                path.resolve(__dirname, ".."),

                // se hai anche altri package nella stessa dir
                path.resolve(__dirname, "../../packages"),
            ]
        }
    },
  // envDir: path.resolve(__dirname),
})
