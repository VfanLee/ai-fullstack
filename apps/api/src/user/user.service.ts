import { Inject, Injectable } from '@nestjs/common'
import { eq, ilike } from 'drizzle-orm'
import { DATABASE } from '../database/database.constants'
import type { Database } from '../database/database.module'
import { users } from '../database/schema'
import { CreateUserDto } from './dto/create-user-dto'
import { UpdateUserDto } from './dto/update-user-dto'

@Injectable()
export class UserService {
  constructor(@Inject(DATABASE) private readonly db: Database) {}

  findAll(name?: string) {
    if (!name) {
      return this.db.select().from(users)
    }

    return this.db.select().from(users).where(ilike(users.name, `%${name}%`))
  }

  async findOne(id: number) {
    const [user] = await this.db.select().from(users).where(eq(users.id, id)).limit(1)
    return user
  }

  async create(createUserDto: CreateUserDto) {
    const [user] = await this.db.insert(users).values(createUserDto).returning()
    return user
  }

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

  async remove(id: number) {
    const [user] = await this.db.delete(users).where(eq(users.id, id)).returning()
    return user
  }
}
