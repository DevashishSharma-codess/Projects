import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchRepos } from '../api/fetchRepos'

export function useRepos(page: number, perPage: number = 30) {
  return useQuery({
    queryKey: ['repos', page, perPage],
    queryFn: () => fetchRepos(page, perPage),
    placeholderData: keepPreviousData,
  })
}
