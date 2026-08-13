import { describe, before, after, test } from 'node:test'
import assert from 'node:assert/strict'
import { transformSync } from '@babel/core'

describe('inline-env-plugin', () => {
  let prev
  before(() => {
    prev = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'
  })
  after(() => {
    process.env.NODE_ENV = prev
  })

  test('should inline environment variables', () => {
    const { code } = transformSync('process.env.NODE_ENV', {
      plugins: ['./index.js'],
    })
    assert.equal(code, '"development";')
  })

  test('should not inline environment variables if it is on left side of assigment expression', () => {
    const { code } = transformSync('process.env.NODE_ENV = "development";', {
      plugins: ['./index.js'],
    })
    assert.equal(code, 'process.env.NODE_ENV = "development";')
  })

  test('should inline environment vars in computed forms', () => {
    const { code } = transformSync('process.env["NODE_ENV"]', {
      plugins: ['./index.js'],
    })
    assert.equal(code, '"development";')
  })

  test('should only include whitelisted variables if include option is specified', () => {
    const { code } = transformSync('process.env.NODE_ENV', {
      plugins: [['./index.js', { include: ['IS_ELECTRON'] }]],
    })
    assert.equal(code, 'process.env.NODE_ENV;')
  })

  test('should not include blacklisted variables if exclude option is specified', () => {
    const { code } = transformSync('process.env.NODE_ENV', {
      plugins: [['./index.js', { exclude: ['NODE_ENV'] }]],
    })
    assert.equal(code, 'process.env.NODE_ENV;')
  })
})
