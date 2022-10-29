import React, { useState, useEffect, useCallback } from 'react'
import { api } from '../api/api'
import { AxiosRequestConfig } from 'axios'
import { QueryKey, UseQueryOptions } from '@tanstack/react-query'
import { useQueryWrapper } from './useQueryWrapper'
import { ResasResponse } from '../types'
import type { Pref, PrefSelection } from '../components/TotalPopulation'

export interface Params {
  params?: AxiosRequestConfig<any> | undefined
  deps?: QueryKey
  options?: Omit<UseQueryOptions<unknown, unknown, unknown, any[]>, 'queryFn' | 'queryKey' | 'initialData'>
}

export const usePrefectures = ({
  params,
  deps,
  options,
}: Params): {
  isLoading: boolean
  prefs: PrefSelection[]
  onChangePrefs: (e: React.ChangeEvent<HTMLInputElement>) => void
  isDisablePrefs: boolean
} => {
  const [prefs, setPrefs] = useState<PrefSelection[]>([])
  const [isDisablePrefs, setIsDisablePrefs] = useState<boolean>(false)

  const { data, isLoading } = useQueryWrapper<ResasResponse<Pref[]>>({
    queryKey: 'pref',
    deps,
    options,
    req: async () => await api.get('prefectures', { params }),
  })

  useEffect(() => {
    setPrefs(
      data?.result !== null
        ? (data?.result.map((prefecture) => ({ ...prefecture, checked: false })) as PrefSelection[])
        : []
    )
  }, [data?.result])

  useEffect(
    () => setIsDisablePrefs(() => prefs?.filter(({ checked }) => checked).length >= 10),
    [prefs?.filter(({ checked }) => checked)]
  )

  const onChangePrefs = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setPrefs((prev) => prev.map((p) => (e.target.id === p.prefCode.toString() ? { ...p, checked: !p.checked } : p)))
    },
    [setPrefs]
  )

  return { isLoading, prefs, onChangePrefs, isDisablePrefs }
}
