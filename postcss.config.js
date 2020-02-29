const autoprefixer = require('autoprefixer')
const tailwindcss = require('tailwindcss')
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    autoprefixer,
    tailwindcss,
    ...(process.env.NODE_ENV === 'production'
      ? [
          purgecss({
            content: ['./src/**/*.vue'],
            // https://medium.com/@kyis/vue-tailwind-purgecss-the-right-way-c70d04461475
            defaultExtractor: content => {
              const contentWithoutStyleBlocks = content.replace(
                /<style[^]+?<\/style>/gi,
                ''
              )
              return (
                contentWithoutStyleBlocks.match(
                  /[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g
                ) || []
              )
            },
            whitelistPatterns: [
              /-(leave|enter|appear)(|-(to|from|active))$/,
              /^(?!cursor-move).+-move$/,
              /^router-link(|-exact)-active$/
            ]
          })
        ]
      : [])
  ]
}
