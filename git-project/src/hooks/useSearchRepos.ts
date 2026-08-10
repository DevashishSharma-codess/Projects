import { useQuery } from '@tanstack/react-query'
import { searchRepos } from '../api/searchRepos'

export function useSearchRepos(query: string, perPage: number = 8) {
  return useQuery({
    queryKey: ['searchRepos', query, perPage],
    queryFn: () => searchRepos(query, perPage),
    enabled: query.trim().length >= 2,
    staleTime: 1000 * 60 * 2, // Cache results for 2 minutes
    gcTime: 1000 * 60 * 5,    // Keep in garbage collection for 5 minutes
  })
}
