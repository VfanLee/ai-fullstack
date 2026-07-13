import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'vfanlee' })
  name!: string
}
