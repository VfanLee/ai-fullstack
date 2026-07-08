import { registerAs } from '@nestjs/config'
import { envSchema } from './env.schema'

export default registerAs('database', () => {
  const env = envSchema.parse(process.env)

  return {
    url: env.DATABASE_URL,
    poolSize: env.DATABASE_POOL_SIZE,
  }
})
