import { relations } from 'drizzle-orm'
import { integer, pgEnum, pgTable, serial, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'

export const accountStatusEnum = pgEnum('account_status', ['active', 'disabled'])

function randomNickname() {
  return `user_${Math.random().toString(36).slice(2, 10)}`
}

/** 客户端真实用户 */
export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    username: text('username').notNull(),
    password: text('password').notNull(),
    nickname: text('nickname').notNull().$defaultFn(randomNickname),
    status: accountStatusEnum('status').notNull().default('active'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex('users_username_unique').on(table.username)],
)

/** 运营后台账号 */
export const admins = pgTable(
  'admins',
  {
    id: serial('id').primaryKey(),
    username: text('username').notNull(),
    password: text('password').notNull(),
    nickname: text('nickname').notNull().$defaultFn(randomNickname),
    status: accountStatusEnum('status').notNull().default('active'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex('admins_username_unique').on(table.username)],
)

/** 后台角色 */
export const roles = pgTable(
  'roles',
  {
    id: serial('id').primaryKey(),
    code: text('code').notNull(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex('roles_code_unique').on(table.code)],
)

/** 运营账号与角色关联 */
export const adminRoles = pgTable(
  'admin_roles',
  {
    id: serial('id').primaryKey(),
    adminId: integer('admin_id')
      .notNull()
      .references(() => admins.id, { onDelete: 'cascade' }),
    roleId: integer('role_id')
      .notNull()
      .references(() => roles.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex('admin_roles_admin_id_role_id_unique').on(table.adminId, table.roleId)],
)

export const adminsRelations = relations(admins, ({ many }) => ({
  adminRoles: many(adminRoles),
}))

export const rolesRelations = relations(roles, ({ many }) => ({
  adminRoles: many(adminRoles),
}))

export const adminRolesRelations = relations(adminRoles, ({ one }) => ({
  admin: one(admins, {
    fields: [adminRoles.adminId],
    references: [admins.id],
  }),
  role: one(roles, {
    fields: [adminRoles.roleId],
    references: [roles.id],
  }),
}))

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Admin = typeof admins.$inferSelect
export type NewAdmin = typeof admins.$inferInsert
export type Role = typeof roles.$inferSelect
export type NewRole = typeof roles.$inferInsert
export type AdminRole = typeof adminRoles.$inferSelect
export type NewAdminRole = typeof adminRoles.$inferInsert
export type AccountStatus = (typeof accountStatusEnum.enumValues)[number]
