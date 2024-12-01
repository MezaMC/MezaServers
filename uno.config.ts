import { defineConfig } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
    // ...UnoCSS options

    theme: {
        breakpoints: {
            'phone': '420px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px'
        },
        colors: {
            brand: 'var(--c-brand)',
            sep: 'var(--c-sep)',
            sepacc: 'var(--c-sep-accent)',
            bg: {
                body: 'var(--c-bg-body)',
                main: 'var(--c-bg-main)',
                card: 'var(--c-bg-card)'
            },
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