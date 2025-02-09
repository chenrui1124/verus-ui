import { generateOptions } from './utils'

export type SizeProp = 'sm' | 'md' | 'lg'
export const sizeOptions = generateOptions<SizeProp>(['sm', 'md', 'lg'])

export type TextTransformProp = 'uppercase' | 'lowercase' | 'capitalize'
export const textTransformOptions = generateOptions<TextTransformProp>([
  'uppercase',
  'lowercase',
  'capitalize'
])

export type VariantProp = 'solid' | 'tonal' | 'outlined' | 'clean'
export const variantOptions = generateOptions<VariantProp>(['solid', 'tonal', 'outlined', 'clean'])

export type FontWeightProp = 'normal' | 'semibold' | 'bold'
export const fontWeightOptions = generateOptions<FontWeightProp>(['normal', 'semibold', 'bold'])
