export function add(left: number, right: number): number {
  return left + right
}

export function subtract(left: number, right: number): number {
  return left - right
}

export function multiply(left: number, right: number): number {
  return left * right
}

export function divide(left: number, right: number): number {
  if (right === 0) {
    throw new RangeError('Cannot divide by zero')
  }

  return left / right
}

export function modulo(left: number, right: number): number {
  if (right === 0) {
    throw new RangeError('Cannot calculate modulo by zero')
  }

  return left % right
}
