import { FC } from 'react'
import styled from 'styled-components'

const App: FC = () => {
  return (
    <Wrap className="App">
      <Title>都道府県別の総人口推移グラフ</Title>
      <section>
        <h2>都道府県</h2>
      </section>
    </Wrap>
  )
}

export default App

const Wrap = styled.div`
  padding: 0 1rem;
`

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 3rem;
`
