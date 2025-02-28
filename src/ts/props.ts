import { generateOptions } from './utils'

type Direction = 'row' | 'column'
export type DirectionProp<T extends Direction = Direction> = T
export const directionOptions = generateOptions<Direction>(['row', 'column'])

type FontWeight = 'normal' | 'semibold' | 'bold'
export type FontWeightProp<T extends FontWeight = FontWeight> = T
export const fontWeightOptions = generateOptions<FontWeight>(['normal', 'semibold', 'bold'])

type Side = 'top' | 'right' | 'bottom' | 'left'
export type SideProp<T extends Side = Side> = T
export const sideOptions = generateOptions<Side>(['top', 'right', 'bottom', 'left'])

type Size = 'sm' | 'md' | 'lg'
export type SizeProp<T extends Size = Size> = T
export const sizeOptions = generateOptions<Size>(['sm', 'md', 'lg'])

type TextTransform = 'uppercase' | 'lowercase' | 'capitalize'
export type TextTransformProp<T extends TextTransform = TextTransform> = T
export const textTransformOptions = generateOptions<TextTransform>([
  'uppercase',
  'lowercase',
  'capitalize'
])

type Variant = 'solid' | 'tonal' | 'outlined' | 'clean'
export type VariantProp<T extends Variant = Variant> = T
export const variantOptions = generateOptions<Variant>(['solid', 'tonal', 'outlined', 'clean'])
