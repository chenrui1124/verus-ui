/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/tailwind/tailwind.css',
  tailwindFunctions: ['clsx', 'twMerge', 'cn'],
  bracketSameLine: false,
  jsxSingleQuote: true,
  printWidth: 100,
  semi: false,
  singleAttributePerLine: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  arrowParens: 'avoid'
}
