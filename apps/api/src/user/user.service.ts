import { Inject, Injectable } from '@nestjs/common'
import { eq, getTableColumns, ilike } from 'drizzle-orm'
import { DATABASE } from '../database/database.constants'
import type { Database } from '../database/database.module'
import { users, type User } from '../database/schema'
import { CreateUserDto } from './dto/create-user-dto'
import { UpdateUserDto } from './dto/update-user-dto'

const { password: _password, ...publicUserColumns } = getTableColumns(users)

/** 用户相关 */
@Injectable()
export class UserService {
  constructor(@Inject(DATABASE) private readonly db: Database) {}

  /** 用户列表 */
  findAll(username?: string) {
    const query = this.db.select(publicUserColumns).from(users)

    if (!username) {
      return query
    }

    return query.where(ilike(users.username, `%${username}%`))
  }

  /** 单个用户 */
  async findOne(id: number) {
    const [user] = await this.db.select(publicUserColumns).from(users).where(eq(users.id, id)).limit(1)
    return user
  }

  /** 创建用户 */
  async create(createUserDto: CreateUserDto) {
    const [user] = await this.db.insert(users).values(createUserDto).returning(publicUserColumns)
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
      .returning(publicUserColumns)

    return user
  }

  /** 删除用户 */
  async remove(id: number) {
    const [user] = await this.db.delete(users).where(eq(users.id, id)).returning(publicUserColumns)
    return user
  }
}

export type PublicUser = Omit<User, 'password'>
