import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user-dto'
import { UpdateUserDto } from './dto/update-user-dto'

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Adam Smith' },
]

@Controller('user')
export class UserController {
  @Get() // GET /user
  getUsers(@Query('name') name?: string) {
    if (!name) {
      return users
    }
    const keyword = name.toLowerCase()
    return users.filter((user) => user.name.toLowerCase().includes(keyword))
  }

  @Get(':id') // GET /user/:id
  getUser(@Param('id') id: string) {
    return users.find((user) => user.id === parseInt(id))
  }

  @Post() // POST /user
  createUser(@Body() createUserDto: CreateUserDto) {
    return {
      data: createUserDto,
      message: 'User created successfully',
    }
  }

  @Put(':id') // PUT /user/:id
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return {
      data: { id, ...updateUserDto },
      message: 'User updated successfully',
    }
  }

  @Delete(':id') // DELETE /user/:id
  deleteUser(@Param('id') id: string) {
    return {
      data: { id },
      message: 'User deleted successfully',
    }
  }
}
