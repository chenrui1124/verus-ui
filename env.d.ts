/// <reference types="vite/client" />

declare module 'vue' {
  interface DialogHTMLAttributes {
    onCancel?: ((payload: Event) => void) | undefined
  }
}

export {}
