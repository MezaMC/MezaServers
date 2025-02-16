import {
    defineConfig,
    transformerVariantGroup,
    transformerDirectives
} from 'unocss'

export default defineConfig({
    // ...UnoCSS options

    rules: [
        ["font-mono", {"font-family": `"JetBrains Mono", monospace`}]
    ],

    theme: {
        breakpoints: {
            'phone': '440px',
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
                card: 'var(--c-bg-card)',
                cardalt: 'var(--c-bg-card-alt)'
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