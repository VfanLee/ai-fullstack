import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user-dto'
import { UpdateUserDto } from './dto/update-user-dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() // GET /user
  getUsers(@Query('name') name?: string) {
    return this.userService.findAll(name)
  }

  @Get(':id') // GET /user/:id
  getUser(@Param('id') id: string) {
    return this.userService.findOne(Number(id))
  }

  @Post() // POST /user
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto)
    return {
      data: user,
      message: 'User created successfully',
    }
  }

  @Put(':id') // PUT /user/:id
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(Number(id), updateUserDto)
    return {
      data: user,
      message: 'User updated successfully',
    }
  }

  @Delete(':id') // DELETE /user/:id
  async deleteUser(@Param('id') id: string) {
    const user = await this.userService.remove(Number(id))
    return {
      data: user,
      message: 'User deleted successfully',
    }
  }
}
