/// <reference types="vite/client" />

declare module 'vue' {
  interface HTMLAttributes {
    popover?: 'auto' | 'manual' | true
    onToggle?: ((payload: ToggleEvent) => void) | undefined
    onBeforeToggle?: ((payload: ToggleEvent) => void) | undefined
  }

  interface DialogHTMLAttributes {
    onCancel?: ((payload: Event) => void) | undefined
  }
}

export {}
