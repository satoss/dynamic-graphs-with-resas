import { FC } from 'react'
import styled from 'styled-components'
import type { PrefSelection } from './'

interface Props {
  prefs: PrefSelection[]
  onChangePrefs: (event: React.ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
}

export const PrefectureArea: FC<Props> = ({ prefs, onChangePrefs, disabled }) => {
  return (
    <Container>
      <legend>
        都道府県<small style={{ marginLeft: '.5rem' }}>一度に10都道府県まで指定できます</small>
      </legend>
      {prefs?.map(({ prefCode, prefName, checked }) => (
        <label key={prefCode}>
          <input
            id={prefCode.toString()}
            type="checkbox"
            checked={checked}
            onChange={onChangePrefs}
            disabled={!checked && disabled}
          />
          {prefName}
        </label>
      ))}
    </Container>
  )
}

const Container = styled.fieldset`
  > legend {
    font-size: 1.5rem;

    > small {
      font-size: 0.667em;
    }
  }
  > label {
    margin-right: 1rem;
    display: inline-block;
  }
`
