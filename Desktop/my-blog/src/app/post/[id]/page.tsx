import { getPost } from '@/lib/notion'
import ReactMarkdown from 'react-markdown'
import Comments from '@/components/Comments'
import Link from 'next/link'

interface PostPageProps {
  params: Promise<{ id: string }>
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params
  const post = await getPost(id)

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
      >
        ← 목록으로
      </Link>

      <article className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
          {new Date(post.createdTime).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        <div className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>

      <Comments />
    </main>
  )
}
