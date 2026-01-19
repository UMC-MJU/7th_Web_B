import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import {
  PageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const n2m = new NotionToMarkdown({ notionClient: notion })

export interface Post {
  id: string
  title: string
  createdTime: string
  tags?: string[]
}

export async function getPosts(): Promise<Post[]> {
  const response: QueryDatabaseResponse = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    sorts: [{ property: 'Date', direction: 'descending' }],
  })

  return response.results.map((page) => {
    const pageObj = page as PageObjectResponse
    return {
      id: pageObj.id,
      title:
        (pageObj.properties.Name?.type === 'title' &&
          pageObj.properties.Name.title[0]?.plain_text) ||
        'Untitled',
      createdTime: pageObj.created_time,
      tags:
        pageObj.properties.Tags?.type === 'multi_select'
          ? pageObj.properties.Tags.multi_select.map((tag) => tag.name)
          : [],
    }
  })
}

export async function getPost(pageId: string) {
  const mdblocks = await n2m.pageToMarkdown(pageId)
  const mdString = n2m.toMarkdownString(mdblocks)

  const page = await notion.pages.retrieve({ page_id: pageId })
  const pageObj = page as PageObjectResponse

  return {
    content: mdString.parent,
    title:
      (pageObj.properties.Name?.type === 'title' &&
        pageObj.properties.Name.title[0]?.plain_text) ||
      'Untitled',
    createdTime: pageObj.created_time,
  }
}
