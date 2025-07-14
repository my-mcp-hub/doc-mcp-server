import 'dotenv/config'
import { afterAll, beforeAll } from 'vitest'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'

beforeAll(async () => {
  const serverParams = new StdioClientTransport({
    command: 'c8',
    args: ['--reporter=lcov', '--reporter=text', 'tsx', './src/index.ts'],
    env: {
      ...process.env,
      NODE_V8_COVERAGE: './coverage/tmp',
    },
  })
  const client = new Client({
    name: 'doc-mcp-client',
    version: '1.0.0',
  })
  await client.connect(serverParams)
  global.client = client
})

afterAll(async () => {
  await global.client.close()
})
