import { Inject, Injectable } from '@nestjs/common'
import { eq, ilike } from 'drizzle-orm'
import { DATABASE } from '../database/database.constants'
import type { Database } from '../database/database.module'
import { users } from '../database/schema'
import { CreateUserDto } from './dto/create-user-dto'
import { UpdateUserDto } from './dto/update-user-dto'

/** 用户相关 */
@Injectable()
export class UserService {
  constructor(@Inject(DATABASE) private readonly db: Database) {}

  /** 查询用户列表 */
  findAll(name?: string) {
    if (!name) {
      return this.db.select().from(users)
    }

    return this.db
      .select()
      .from(users)
      .where(ilike(users.name, `%${name}%`))
  }

  /** 查询单个用户 */
  async findOne(id: number) {
    const [user] = await this.db.select().from(users).where(eq(users.id, id)).limit(1)
    return user
  }

  /** 创建用户 */
  async create(createUserDto: CreateUserDto) {
    const [user] = await this.db.insert(users).values(createUserDto).returning()
    return user
  }

  /** 更新用户 */
  async update(id: number, updateUserDto: UpdateUserDto) {
    const [user] = await this.db
      .update(users)
      .set({
        ...updateUserDto,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning()

    return user
  }

  /** 删除用户 */
  async remove(id: number) {
    const [user] = await this.db.delete(users).where(eq(users.id, id)).returning()
    return user
  }
}
