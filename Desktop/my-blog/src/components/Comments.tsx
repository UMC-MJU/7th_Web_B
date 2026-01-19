'use client'

import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'

export default function Comments() {
  const { theme } = useTheme()

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6">댓글</h2>
      <Giscus
        repo="your-username/your-repo" // TODO: GitHub 저장소로 변경
        repoId="your-repo-id" // TODO: Giscus에서 받은 ID로 변경
        category="General"
        categoryId="your-category-id" // TODO: Giscus에서 받은 ID로 변경
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === 'dark' ? 'dark' : 'light'}
        lang="ko"
        loading="lazy"
      />
    </div>
  )
}
