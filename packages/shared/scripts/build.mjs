import { execSync } from 'node:child_process'
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const packageRoot = dirname(scriptDir)
const distDir = join(packageRoot, 'dist')

function run(command) {
  execSync(command, {
    cwd: packageRoot,
    stdio: 'inherit',
    shell: true,
  })
}

function writeModulePackageJson(directory, type) {
  mkdirSync(directory, { recursive: true })
  writeFileSync(
    join(directory, 'package.json'),
    `${JSON.stringify({ type }, null, 2)}\n`,
    'utf8',
  )
}

rmSync(distDir, { recursive: true, force: true })
run('tsc -p tsconfig.esm.json')
run('tsc -p tsconfig.cjs.json')
writeModulePackageJson(join(distDir, 'esm'), 'module')
writeModulePackageJson(join(distDir, 'cjs'), 'commonjs')
