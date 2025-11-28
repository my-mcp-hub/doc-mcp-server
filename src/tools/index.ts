import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import type { OptionsType } from '@/types'
import registerWatermarkJsPlus from './registerWatermarkJsPlus'

export const registerTools = (server: McpServer, options: OptionsType) => {
  registerWatermarkJsPlus(server, options)
}
