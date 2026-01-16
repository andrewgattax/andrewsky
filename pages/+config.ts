import type { Config } from 'vike/types'
import vikeReact from 'vike-react/config'

export default {

  // Enable Static Site Generation (SSG)
  prerender: true,

  // Enable SSR for SEO-friendly HTML
  ssr: true,

  // Extend vike-react for React support
  extends: [vikeReact],

  // Optional: Configure page title
  title: 'QueueR - Home',

  htmlAttributes: {
    class: ""
  },

  // Optional: Configure meta tags
  description: 'Transform physical nightclub queues into seamless digital experiences. No more waiting in line, just scan, join, and enjoy.',
} satisfies Config
