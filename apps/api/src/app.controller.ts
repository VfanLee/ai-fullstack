import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

/** 应用根相关 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /** 健康检查 */
  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
