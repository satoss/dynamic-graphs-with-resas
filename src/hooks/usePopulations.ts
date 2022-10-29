import { api } from '../api/api'
import { AxiosRequestConfig } from 'axios'
import { useQueries } from '@tanstack/react-query'
import type { PrefSelection } from '../components/TotalPopulation'

export interface Params {
  prefs: PrefSelection[]
  params?: AxiosRequestConfig<any> | undefined
}

export const usePopulations = ({ prefs, params }: Params): { populations: any[]; isLoading: boolean } => {
  const result = useQueries({
    queries: prefs?.map(({ prefCode, prefName }) => ({
      queryKey: ['population', prefCode],
      queryFn: async () => {
        try {
          const res = await api.get(`population/composition/perYear?cityCode=-&prefCode=${prefCode}`, { params })
          return res.data
        } catch (e) {
          console.log(e)
        }
      },
      select: (json: any) => ({ prefCode, prefName, population: json.result.data[0].data }),
    })),
  })

  const populations = result.map(({ data }) => data).filter(Boolean)
  const isLoading = result.some(({ isLoading }) => isLoading)

  return { populations, isLoading }
}
