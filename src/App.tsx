import { FC } from 'react'
import styled from 'styled-components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TotalPopulation } from './components/TotalPopulation'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const App: FC = () => {
  return (
    <Wrap className="App">
      <QueryClientProvider client={queryClient}>
        <TotalPopulation />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Wrap>
  )
}

export default App

const Wrap = styled.div`
  padding: 0 1rem;
`
