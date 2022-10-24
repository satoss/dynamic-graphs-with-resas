import React, { FC, useState, useEffect } from 'react'
import axios from 'axios'
import { useQuery, useQueries } from '@tanstack/react-query'
import { PrefectureArea } from './PrefectureArea'
import { GraphArea } from './GraphArea'

export interface Prefecture {
  prefCode: number
  prefName: string
}

export type Prefs = Array<Prefecture & { checked: boolean; data?: Array<{ year: number; value: number }> }>

export const TotalPopulation: FC = () => {
  const [prefs, setPrefs] = useState<Prefs>([])
  const [checkDisabled, setCheckDisabled] = useState<boolean>(false)

  useEffect(() => {
    setCheckDisabled(() => prefs.filter(({ checked }) => checked).length >= 10)
  }, [prefs.filter(({ checked }) => checked)])

  useQuery<{ result: Prefecture[] }>(
    ['pref'],
    (): any =>
      axios
        .get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
          headers: { 'X-API-KEY': import.meta.env.VITE_API_KEY },
        })
        .then((res) => res.data),
    {
      onSuccess({ result }) {
        setPrefs(result?.map((p) => ({ ...p, checked: false })))
      },
      enabled: prefs.length === 0,
    }
  )

  useQueries({
    queries: prefs
      .filter(({ checked }) => checked)
      .map(({ prefCode }) => ({
        queryKey: ['population', prefCode],
        queryFn: (): any =>
          axios
            .get(
              `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
              {
                headers: { 'X-API-KEY': import.meta.env.VITE_API_KEY },
              }
            )
            .then((res) => res.data),
        onSuccess({ result }: any) {
          setPrefs((prev) =>
            prev.map((p) =>
              prefCode === p.prefCode
                ? { ...p, data: result.data.find(({ label }: any) => label === '総人口')?.data }
                : p
            )
          )
        },
      })),
  })

  const onChangePrefs = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPrefs((prev) => prev.map((p) => (e.target.id === p.prefCode.toString() ? { ...p, checked: !p.checked } : p)))
  }

  return (
    <>
      <h1>都道府県別の総人口推移グラフ</h1>
      <PrefectureArea prefs={prefs} onChangePrefs={onChangePrefs} disabled={checkDisabled} />
      <br />
      {prefs.filter(({ checked }) => checked).length !== 0 && (
        <GraphArea prefs={prefs.filter(({ checked }) => checked)} />
      )}
    </>
  )
}
