import { Injectable } from '@nestjs/common'

/** 应用根相关 */
@Injectable()
export class AppService {
  /** 欢迎文案 */
  getHello(): string {
    return 'Hello World!'
  }
}
