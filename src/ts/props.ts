import { optionsCreator } from './utils'

export const enum Align {
  Left = 'left',
  Center = 'center',
  Right = 'right'
}
export type AlignProp<T extends Align = Align> = `${T}`
export const alignOptions = optionsCreator<AlignProp>([Align.Left, Align.Center, Align.Right])

export const enum Direction {
  Row = 'row',
  Column = 'column'
}
export type DirectionProp<T extends Direction = Direction> = `${T}`
export const directionOptions = optionsCreator<DirectionProp>([Direction.Row, Direction.Column])

export const enum FontWeight {
  Normal = 'normal',
  Semibold = 'semibold',
  Bold = 'bold'
}
export type FontWeightProp<T extends FontWeight = FontWeight> = `${T}`
export const fontWeightOptions = optionsCreator<FontWeightProp>([
  FontWeight.Normal,
  FontWeight.Semibold,
  FontWeight.Bold
])

export const enum Status {
  Default = 'default',
  Primary = 'primary',
  Success = 'success',
  Warning = 'warning',
  Error = 'error'
}
export type StatusProp<T extends Status = Status> = `${T}`
export const statusOptions = optionsCreator<StatusProp>([
  Status.Default,
  Status.Primary,
  Status.Success,
  Status.Warning,
  Status.Error
])

export const enum Side {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left'
}
export type SideProp<T extends Side = Side> = `${T}`
export const sideOptions = optionsCreator<SideProp>([Side.Top, Side.Right, Side.Bottom, Side.Left])

export const enum Size {
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg'
}
export type SizeProp<T extends Size = Size> = `${T}`
export const sizeOptions = optionsCreator<SizeProp>([Size.Sm, Size.Md, Size.Lg])

export const enum TextTransform {
  Uppercase = 'uppercase',
  Lowercase = 'lowercase',
  Capitalize = 'capitalize'
}
export type TextTransformProp<T extends TextTransform = TextTransform> = `${T}`
export const textTransformOptions = optionsCreator<TextTransformProp>([
  TextTransform.Uppercase,
  TextTransform.Lowercase,
  TextTransform.Capitalize
])

export const enum Variant {
  Solid = 'solid',
  Tonal = 'tonal',
  Outlined = 'outlined',
  Clean = 'clean'
}
export type VariantProp<T extends Variant = Variant> = `${T}`
export const variantOptions = optionsCreator<VariantProp>([
  Variant.Solid,
  Variant.Tonal,
  Variant.Outlined,
  Variant.Clean
])
