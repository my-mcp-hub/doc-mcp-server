export interface DocSearchHitType {
  objectID: string
  anchor: string | null
  content: string | null
  url: string
}

export interface SearchAlgoliaParamsType {
  appId: string
  apiKey: string
  indexName: string
  query: string
}
