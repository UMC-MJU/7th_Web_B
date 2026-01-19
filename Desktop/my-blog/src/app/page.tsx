import Link from 'next/link'
import { getPosts } from '@/lib/notion'

export default async function Home() {
  const posts = await getPosts()

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-5xl font-bold mb-4">Tech Blog</h1>
        <p className="text-gray-600 dark:text-gray-400">
          개발 관련 글을 기록하는 공간입니다.
        </p>
      </header>

      <div className="space-y-6">
        {posts.length === 0 ? (
          <p className="text-gray-500">아직 작성된 글이 없습니다.</p>
        ) : (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.id}`}
              className="block p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow hover:border-blue-500 dark:hover:border-blue-400"
            >
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                {new Date(post.createdTime).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))
        )}
      </div>
    </main>
  )
}
