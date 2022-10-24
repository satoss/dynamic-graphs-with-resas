import { FC } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'
import type { Prefs } from './'

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
  prefs: Prefs
}

export const GraphArea: FC<Props> = ({ prefs }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }

  const labels = prefs.length !== 0 ? prefs[0].data?.map(({ year }) => year) : []
  const data = {
    labels,
    datasets: prefs.map(({ prefName, data }, i) => ({
      label: prefName,
      data: data?.map(({ value }) => value),
      backgroundColor: colors[i],
      borderColor: colors[i],
    })),
  }

  return <Line options={options} data={data} />
}
