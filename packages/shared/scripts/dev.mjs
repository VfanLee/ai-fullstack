import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const packageRoot = dirname(scriptDir)
const distDir = join(packageRoot, 'dist')

function writeModulePackageJson(directory, type) {
  mkdirSync(directory, { recursive: true })
  writeFileSync(
    join(directory, 'package.json'),
    `${JSON.stringify({ type }, null, 2)}\n`,
    'utf8',
  )
}

function watch(tsconfigFile) {
  return spawn(
    'tsc',
    ['-p', tsconfigFile, '--watch', '--preserveWatchOutput'],
    {
      cwd: packageRoot,
      stdio: 'inherit',
      shell: true,
    },
  )
}

writeModulePackageJson(join(distDir, 'esm'), 'module')
writeModulePackageJson(join(distDir, 'cjs'), 'commonjs')

const processes = [watch('tsconfig.esm.json'), watch('tsconfig.cjs.json')]

function shutdown() {
  for (const child of processes) {
    if (!child.killed) {
      child.kill()
    }
  }
}

process.on('SIGINT', () => {
  shutdown()
  process.exit(0)
})

process.on('SIGTERM', () => {
  shutdown()
  process.exit(0)
})

for (const child of processes) {
  child.on('exit', (code) => {
    if (code && code !== 0) {
      shutdown()
      process.exit(code)
    }
  })
}
