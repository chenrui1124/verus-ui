import { generateOptions } from './utils'

export type Direction = 'row' | 'column'
export type DirectionProp<T extends Direction = Direction> = T
export const directionOptions = generateOptions<Direction>(['row', 'column'])

export type FontWeight = 'normal' | 'semibold' | 'bold'
export type FontWeightProp<T extends FontWeight = FontWeight> = T
export const fontWeightOptions = generateOptions<FontWeight>(['normal', 'semibold', 'bold'])

export type Side = 'top' | 'right' | 'bottom' | 'left'
export type SideProp<T extends Side = Side> = T
export const sideOptions = generateOptions<Side>(['top', 'right', 'bottom', 'left'])

export type Size = 'sm' | 'md' | 'lg'
export type SizeProp<T extends Size = Size> = T
export const sizeOptions = generateOptions<Size>(['sm', 'md', 'lg'])

export type TextTransform = 'uppercase' | 'lowercase' | 'capitalize'
export type TextTransformProp<T extends TextTransform = TextTransform> = T
export const textTransformOptions = generateOptions<TextTransform>([
  'uppercase',
  'lowercase',
  'capitalize'
])

export type Variant = 'solid' | 'tonal' | 'outlined' | 'clean'
export type VariantProp<T extends Variant = Variant> = T
export const variantOptions = generateOptions<Variant>(['solid', 'tonal', 'outlined', 'clean'])
