import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'
import { getEnvFilePaths } from './src/config/env'

config({ path: getEnvFilePaths() })

export default defineConfig({
  schema: './src/database/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? '',
  },
})
