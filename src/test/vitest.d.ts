/// <reference types="vitest" />
import '@testing-library/jest-dom'

declare global {
  namespace Vi {
    interface Matchers<R = any> {
      toBeInTheDocument(): R
      toHaveClass(className: string): R
      toHaveAttribute(attr: string, value?: string): R
    }
  }
}
