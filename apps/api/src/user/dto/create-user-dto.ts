import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import type { AccountStatus } from '../../database/schema'

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'vfanlee' })
  username!: string

  @ApiProperty({ description: '密码', example: 'secret' })
  password!: string

  @ApiPropertyOptional({ description: '昵称，不传则随机生成', example: '小明' })
  nickname?: string

  @ApiPropertyOptional({
    description: '账号状态',
    enum: ['active', 'disabled'],
    default: 'active',
  })
  status?: AccountStatus
}
