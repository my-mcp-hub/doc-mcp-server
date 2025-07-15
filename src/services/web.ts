import express from 'express'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import type { OptionsType } from '@/types'

export async function webServer(server: McpServer, options: OptionsType) {
  const app = express()
  app.use(express.json())

  app.post('/mcp', async (req, res) => {
    const transport: StreamableHTTPServerTransport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    })
    res.on('close', () => {
      transport.close()
      server.close()
    })
    await server.connect(transport)
    await transport.handleRequest(req, res, req.body)
  })

  const handleRequest = async (req: express.Request, res: express.Response) => {
    res.writeHead(405).end(
      JSON.stringify({
        jsonrpc: '2.0',
        error: {
          code: -32000,
          message: 'Method not allowed.',
        },
        id: null,
      }),
    )
  }

  app.get('/mcp', handleRequest)

  app.delete('/mcp', handleRequest)

  app.listen(options.port)
  console.log(`MCP server started on port ${options.port}, streamable endpoint: /mcp`)
}
