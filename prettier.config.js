/** @type {import("prettier").Config} */
export default {
  bracketSameLine: false,
  jsxSingleQuote: true,
  printWidth: 100,
  semi: false,
  singleAttributePerLine: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  arrowParens: 'avoid',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/tailwind/tailwind.css',
  tailwindFunctions: ['clsx', 'cn', 'twMerge'],
  tailwindAttributes: [
    'class',
    'enterFromClass',
    'enterActiveClass',
    'enterToClass',
    'leaveFromClass',
    'leaveActiveClass',
    'leaveToClass',
    'enter-from-class',
    'enter-active-class',
    'enter-to-class',
    'leave-from-class',
    'leave-active-class',
    'leave-to-class'
  ]
}
