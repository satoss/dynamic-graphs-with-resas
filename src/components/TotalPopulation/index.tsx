import React, { FC } from 'react'
import styled from 'styled-components'
import { RotatingLines } from 'react-loader-spinner'
import { PrefSelect } from './PrefSelect'
import { Graph } from './Graph'
import { usePrefectures } from '../../hooks/usePrefectures'
import { usePopulations } from '../../hooks/usePopulations'

export interface Pref {
  prefCode: number
  prefName: string
}

export type PrefSelection = Pref & { checked: boolean }

export const TotalPopulation: FC = () => {
  const {
    isLoading: isLoadingPrefs,
    prefs,
    onChangePrefs,
    isDisablePrefs,
  } = usePrefectures({ options: { staleTime: 1000 } })
  const { populations, isLoading: isLoadingPopulations } = usePopulations({
    prefs: prefs?.filter(({ checked }) => checked) ?? [],
  })

  if (isLoadingPrefs) {
    return (
      <Loading>
        <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="50" />
      </Loading>
    )
  }

  return (
    <>
      <h1>都道府県別の総人口推移グラフ</h1>
      <PrefSelect prefs={prefs} onChangePrefs={onChangePrefs} disabled={isDisablePrefs} />
      <br />
      <Graph populations={populations} isLoading={isLoadingPopulations} />
    </>
  )
}

const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`
