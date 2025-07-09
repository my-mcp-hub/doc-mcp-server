import { describe, expect, test } from 'vitest'
import { queryWatermarkJsPlusDoc } from '../../src/tools/registerWatermarkJsPlus'
import { getOptions } from '../utils'

describe('queryWatermarkJsPlusDoc', () => {
  const options = getOptions()
  test('returns data for a valid input', async () => {
    expect((await queryWatermarkJsPlusDoc('On Demand', options)).length).toBeGreaterThan(0)
  }, 20000)

  test('returns a "not found" response for an unrecognized input', async () => {
    expect((await queryWatermarkJsPlusDoc('ESLint', options)).length).toEqual(0)
  }, 20000)
})
