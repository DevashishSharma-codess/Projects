import type { GitHubRepo } from './fetchRepos'

export type SearchReposResponse = {
  repos: GitHubRepo[]
  totalCount: number
}

export async function searchRepos(
  query: string,
  perPage: number = 8
): Promise<SearchReposResponse> {
  if (!query.trim()) {
    return { repos: [], totalCount: 0 }
  }

  const res = await fetch(
    `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${perPage}`
  )

  if (!res.ok) {
    throw new Error('Failed to search repositories')
  }

  const data = await res.json()

  return {
    repos: data.items ?? [],
    totalCount: data.total_count ?? 0,
  }
}
