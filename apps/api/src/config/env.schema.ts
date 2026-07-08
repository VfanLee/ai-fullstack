import { z } from 'zod'
import { appEnvValues } from './env'

export const envSchema = z.object({
  APP_ENV: z.enum(appEnvValues).default('local'),
  NODE_ENV: z.string().optional(),
  DATABASE_URL: z.string().url(),
  DATABASE_POOL_SIZE: z.coerce.number().int().positive().default(10),
})

export type Env = z.infer<typeof envSchema>

export function validateEnv(config: Record<string, unknown>) {
  const result = envSchema.safeParse(config)

  if (!result.success) {
    throw new Error(`Environment validation failed: ${z.prettifyError(result.error)}`)
  }

  return result.data
}
