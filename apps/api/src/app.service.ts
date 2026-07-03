import { add, divide, modulo, multiply, subtract } from '@ai-fullstack/shared'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return [
      `1 + 2 = ${add(1, 2)}`,
      `5 - 3 = ${subtract(5, 3)}`,
      `4 * 6 = ${multiply(4, 6)}`,
      `8 / 2 = ${divide(8, 2)}`,
      `7 % 4 = ${modulo(7, 4)}`,
    ].join('\n')
  }
}
