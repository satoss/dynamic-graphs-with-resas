import { FC } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'
import LoadingOverlay from 'react-loading-overlay-ts'
import type { Pref } from './'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

const colors = [
  '#4E79A7',
  '#F28E2B',
  '#E15759',
  '#76B7B2',
  '#59A14F',
  '#EDC948',
  '#B07AA1',
  '#FF9DA7',
  '#9C755F',
  '#BAB0AC',
] as const

interface Props {
  populations: (Pref & { population: { year: number; value: number }[] })[]
  isLoading: boolean
}

export const Graph: FC<Props> = ({ populations, isLoading }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
    },
  }

  const labels = populations.length !== 0 ? populations[0].population?.map(({ year }) => year) : []
  const data = {
    labels,
    datasets: populations.map(({ prefName, population }, i) => ({
      label: prefName,
      data: population?.map(({ value }) => value),
      backgroundColor: colors[i],
      borderColor: colors[i],
    })),
  }
  return (
    <LoadingOverlay active={isLoading} spinner text="Loading graph...">
      <Line options={options} data={data} />
    </LoadingOverlay>
  )
}
