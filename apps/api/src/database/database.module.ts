import { Global, Module } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import databaseConfig from '../config/database.config'
import { DATABASE } from './database.constants'
import * as schema from './schema'

export type Database = ReturnType<typeof drizzle<typeof schema>>

@Global()
@Module({
  providers: [
    {
      provide: DATABASE,
      inject: [databaseConfig.KEY],
      useFactory: (config: ConfigType<typeof databaseConfig>) => {
        const client = postgres(config.url, {
          max: config.poolSize,
        })

        return drizzle(client, { schema })
      },
    },
  ],
  exports: [DATABASE],
})
export class DatabaseModule {}
