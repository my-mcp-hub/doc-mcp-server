import { describe, expect, test } from 'vitest'

describe('watermarkJsPlusDocTool', () => {
  test('returns data for a valid input', async () => {
    const res = (await global.client.callTool({
      name: 'query-watermark-js-plus',
      arguments: {
        keyword: 'On Demand',
      },
    })) as { content: unknown[] }

    expect(res.content.length).toBeGreaterThan(0)
  }, 20000)

  test('returns a "not found" response for an unrecognized input', async () => {
    const res = (await global.client.callTool({
      name: 'query-watermark-js-plus',
      arguments: {
        keyword: 'ESLint',
      },
    })) as { content: unknown[] }
    expect(res.content.length).toEqual(0)
  }, 20000)
})
