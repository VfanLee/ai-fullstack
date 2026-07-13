import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user-dto'
import { UpdateUserDto } from './dto/update-user-dto'
import { UserService } from './user.service'

/** 用户相关 */
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** 查询用户列表 */
  @Get()
  @ApiOperation({ summary: '用户列表' })
  @ApiQuery({ name: 'name', required: false, description: '按名称模糊查询' })
  getUsers(@Query('name') name?: string) {
    return this.userService.findAll(name)
  }

  /** 查询单个用户 */
  @Get(':id')
  @ApiOperation({ summary: '单个用户' })
  @ApiParam({ name: 'id', description: '用户 ID' })
  getUser(@Param('id') id: string) {
    return this.userService.findOne(Number(id))
  }

  /** 创建用户 */
  @Post()
  @ApiOperation({ summary: '创建用户' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto)
    return {
      data: user,
      message: 'User created successfully',
    }
  }

  /** 更新用户 */
  @Put(':id')
  @ApiOperation({ summary: '更新用户' })
  @ApiParam({ name: 'id', description: '用户 ID' })
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(Number(id), updateUserDto)
    return {
      data: user,
      message: 'User updated successfully',
    }
  }

  /** 删除用户 */
  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @ApiParam({ name: 'id', description: '用户 ID' })
  async deleteUser(@Param('id') id: string) {
    const user = await this.userService.remove(Number(id))
    return {
      data: user,
      message: 'User deleted successfully',
    }
  }
}
