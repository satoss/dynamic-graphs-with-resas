import { FC } from 'react'
import styled from 'styled-components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TotalPopulation } from './components/TotalPopulation'

const queryClient = new QueryClient()
const App: FC = () => {
  return (
    <Wrap className="App">
      <QueryClientProvider client={queryClient}>
        <TotalPopulation />
      </QueryClientProvider>
    </Wrap>
  )
}

export default App

const Wrap = styled.div`
  padding: 0 1rem;
`
