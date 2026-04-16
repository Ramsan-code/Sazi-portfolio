import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('Deployment Configuration Regression', () => {
  it('REGRESSION: next.config.ts must NOT contain outputFileTracingRoot (Vercel path bug fix)', () => {
    const configPath = path.resolve(process.cwd(), 'next.config.ts')
    const configContent = fs.readFileSync(configPath, 'utf8')
    
    // This is the specific line that caused the lstat error on Vercel
    expect(configContent).not.toContain('outputFileTracingRoot')
    expect(configContent).not.toContain('../../')
  })

  it('contains essential deployment settings', () => {
    const configPath = path.resolve(process.cwd(), 'next.config.ts')
    const configContent = fs.readFileSync(configPath, 'utf8')
    
    expect(configContent).toContain('ignoreDuringBuilds')
  })
})
