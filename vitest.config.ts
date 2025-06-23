import { defineVitestConfig } from '@nuxt/test-utils/config'
import { fileURLToPath, URL } from 'node:url'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    // you can optionally set Nuxt-specific environment options
    environmentOptions: {
      nuxt: {
        rootDir: fileURLToPath(new URL('./playground', import.meta.url)),
        domEnvironment: 'jsdom', // 'happy-dom' (default) or 'jsdom'
        overrides: {
          // other Nuxt config you want to pass
        }
      }
    }
  }
})
