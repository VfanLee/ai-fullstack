import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user-dto'
import { UpdateUserDto } from './dto/update-user-dto'
import { UserService } from './user.service'

/** 用户相关 */
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** 查询用户列表 */
  @Get()
  getUsers(@Query('name') name?: string) {
    return this.userService.findAll(name)
  }

  /** 查询单个用户 */
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.findOne(Number(id))
  }

  /** 创建用户 */
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto)
    return {
      data: user,
      message: 'User created successfully',
    }
  }

  /** 更新用户 */
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(Number(id), updateUserDto)
    return {
      data: user,
      message: 'User updated successfully',
    }
  }

  /** 删除用户 */
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.userService.remove(Number(id))
    return {
      data: user,
      message: 'User deleted successfully',
    }
  }
}
