import { AxiosResponse } from 'axios'
import { useQuery, QueryKey, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'

interface Props<T> {
  queryKey?: string
  deps?: QueryKey
  options?: Omit<UseQueryOptions<unknown, unknown, unknown, any[]>, 'queryFn' | 'queryKey' | 'initialData'>
  req: () => Promise<AxiosResponse<T>>
}

export const useQueryWrapper = <T>({ queryKey, deps = [], options, req }: Props<T>): UseQueryResult<T> => {
  const k = Array.isArray(deps) ? [queryKey, ...deps] : [queryKey]
  const result = useQuery(
    k,
    async () => {
      try {
        const res = await req()
        return res.data
      } catch (e) {
        console.log(e)
      }
    },
    options
  ) as UseQueryResult<T>

  return result
}
