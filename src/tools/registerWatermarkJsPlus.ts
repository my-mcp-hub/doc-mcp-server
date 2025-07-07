import { z } from 'zod'
import { getPagesContent, searchAlgolia } from '@/utils'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import type { OptionsType } from '@/types'

export default function register(server: McpServer, options: OptionsType) {
  server.registerTool(
    'query-watermark-js-plus',
    {
      title: 'Query Watermark Js Plus',
      description:
        'Query Watermark JS Plus description: This tool allows you to search for official documentation and information about watermark-js-plus, a JavaScript library for generating watermarks in browsers. It is particularly useful for finding information about its features such as text watermarking, image watermarking, and various configuration options for creating watermarks with different effects and styles. ',
      inputSchema: {
        keyword: z.string().describe('search keyword'),
      },
    },
    async ({ keyword }) => {
      const contents = await queryWatermarkJsPlusDoc(keyword, options)
      return {
        content: contents.map(content => ({
          type: 'text',
          text: content,
        })),
      }
    },
  )
}

export const queryWatermarkJsPlusDoc = async (keyword: string, options: OptionsType) => {
  const pages = await searchAlgolia({
    appId: 'V6CF28P0PS',
    apiKey: '692752b7b3c6f794997d8ae22aed79fa',
    indexName: 'dev_docs',
    query: keyword,
  })
  return getPagesContent(pages, 'main')
}
