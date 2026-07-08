import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import databaseConfig from './config/database.config'
import { getEnvFilePaths } from './config/env'
import { validateEnv } from './config/env.schema'
import { DatabaseModule } from './database/database.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePaths(),
      load: [databaseConfig],
      cache: true,
      validate: validateEnv,
    }),
    DatabaseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
