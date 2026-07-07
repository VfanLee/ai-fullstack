import { Controller, Get, Post, Query } from '@nestjs/common'

@Controller('user')
export class UserController {
  @Post()
  create() {
    return { msg: 'success' }
  }

  @Get()
  findAll(@Query() query: { k?: string; page?: number; size?: number }) {
    console.log(query)
    return []
  }
}
