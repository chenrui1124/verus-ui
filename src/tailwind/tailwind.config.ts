import type { Config } from 'tailwindcss'

import { addDynamicIconSelectors } from '@iconify/tailwind'

export default {
  plugins: [addDynamicIconSelectors({ prefix: 'i' })]
} satisfies Config
