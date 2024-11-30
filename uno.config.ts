import { defineConfig } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
    // ...UnoCSS options

    theme: {
        colors: {
            brand: 'var(--c-brand)',
            t: {
                primary: 'var(--c-text-primary)',
                secondary: 'var(--c-text-secondary)',
                contrast: 'var(--c-text-contrast)'
            }
        }
    },

    transformers: [
        transformerVariantGroup(),
        transformerDirectives()
    ],

})