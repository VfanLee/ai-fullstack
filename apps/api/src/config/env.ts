export const appEnvValues = ['local', 'dev', 'test', 'prod'] as const
export type AppEnv = (typeof appEnvValues)[number]

export function getAppEnv() {
  return process.env.APP_ENV ?? 'local'
}

export function getEnvFilePaths() {
  const appEnv = getAppEnv()

  if (appEnv === 'local') {
    return ['.env.local', '.env']
  }

  return [`.env.${appEnv}.local`, `.env.${appEnv}`, '.env']
}
