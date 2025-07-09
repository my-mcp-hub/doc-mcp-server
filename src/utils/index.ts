import { algoliasearch, type SearchResponse } from 'algoliasearch'
import * as cheerio from 'cheerio'
import html2md from 'html-to-md'
import type { ArgumentsCamelCase } from 'yargs'
import type { DocSearchHitType, OptionsType, SearchAlgoliaParamsType } from '@/types'

export function getOptions(argv: ArgumentsCamelCase) {
  return {
    url: argv.url,
    key: argv.key,
    secretKey: argv.secret_key,
    port: argv.port,
  } as OptionsType
}

export async function searchAlgolia(params: SearchAlgoliaParamsType) {
  const urls = new Set<string>()
  const client = algoliasearch(params.appId, params.apiKey)
  const { results } = (await client.search({
    requests: [
      {
        indexName: params.indexName,
        query: params.query,
        attributesToRetrieve: [
          'hierarchy.lvl0',
          'hierarchy.lvl1',
          'hierarchy.lvl2',
          'hierarchy.lvl3',
          'hierarchy.lvl4',
          'hierarchy.lvl5',
          'hierarchy.lvl6',
          'content',
          'url',
        ],
        attributesToSnippet: [
          'hierarchy.lvl1:10',
          'hierarchy.lvl2:10',
          'hierarchy.lvl3:10',
          'hierarchy.lvl4:10',
          'hierarchy.lvl5:10',
          'hierarchy.lvl6:10',
          'content:10',
        ],
        snippetEllipsisText: '…',
        hitsPerPage: 2,
      },
    ],
  })) as { results: SearchResponse<DocSearchHitType>[] }
  results.forEach(result => {
    result.hits.forEach(hit => {
      const url = new URL(hit.url)
      urls.add(`${url.origin}${url.pathname}${url.search}`)
    })
  })
  const pages = (
    await Promise.allSettled(
      Array.from(urls).map(async url => {
        return fetch(url, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
          },
        }).then(res => {
          if (res.ok) {
            return res.text()
          } else {
            console.error(`Could not fetch docs: ${res.status} ${res.statusText}`)
            return null
          }
        })
      }),
    )
  ).filter(page => page.status === 'fulfilled')
  return pages.map(page => page.value || '')
}

export function getPagesContent(pages: string[], selector: string) {
  const result: string[] = []
  pages.forEach(page => {
    const $ = cheerio.load(page)
    const html = $(selector).html()
    if (html) {
      const md = html2md(html)
      result.push(md)
    }
  })
  return result
}
