# Doc MCP Server

A doc MCP Server

## Setup

### Usage
To use with `Desktop APP`, such as Claude, VSCode, [Cline](https://cline.bot/mcp-marketplace), Cherry Studio, Cursor, and so on, add the MCP server config below.

On Mac system:
```json
{
  "mcpServers": {
    "doc-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "@my-mcp-hub/doc-mcp-server"
      ]
    }
  }
}
```

On Window system:

```json
{
  "mcpServers": {
    "doc-mcp-server": {
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "-y",
        "@my-mcp-hub/doc-mcp-server"
      ]
    }
  }
}
```
