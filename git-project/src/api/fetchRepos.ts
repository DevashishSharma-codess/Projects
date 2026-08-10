export type GitHubRepo = {
  id: number
  name: string
  full_name: string
  description: string
  stargazers_count: number
  forks_count: number
  language: string
  html_url: string
  owner: {
    login: string
    avatar_url: string
  }
}

export type ReposResponse = {
  repos: GitHubRepo[]
  totalCount: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export async function fetchRepos(page: number, perPage: number = 30): Promise<ReposResponse> {
  const res = await fetch(
    `https://api.github.com/search/repositories?q=stars:>50000&sort=stars&per_page=${perPage}&page=${page}`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch repositories')
  }

  const data = await res.json()

  return {
    repos: data.items ?? [],
    totalCount: data.total_count ?? 0,
    hasNextPage: page * perPage < (data.total_count ?? 0),
    hasPrevPage: page > 1,
  }
}
