import { Component, createSignal } from 'solid-js'
import Block from '../../elements/Block'
import Group from '../../elements/Group'
import TextField from '../../elements/TextField'
import Typography from '../../elements/Typography'
import { useProvider } from '../../provider'

const parseToInt = (str: string): number | 'error' => {
  const num = parseInt(str)
  if (isNaN(num) || !isFinite(num)) {
    return 'error'
  }
  return num
}

const parseLimitOfRecords = (str: string): number | 'error' => {
  const result = parseToInt(str)
  if (result === 'error') {
    return result
  }
  return result > 0 ? result : 'error'
}

const LoggingSettings: Component = () => {
  const [state, actions] = useProvider()
  const [invalidLimitOfRecords, setInvalidLimitOfRecords] = createSignal<string | undefined>(undefined)
  const [invalidRegExMsg, setInvalidReExMsg] = createSignal<string | undefined>(undefined)
  const onInputLimitOfRecords = (str: string) => {
    const result = parseLimitOfRecords(str)
    if (result === 'error') {
      setInvalidLimitOfRecords('Please enter a natural number')
    } else {
      setInvalidLimitOfRecords(undefined)
    }
  }
  const onChangeLimitOfRecords = (str: string) => {
    const result = parseLimitOfRecords(str)
    if (result !== 'error') {
      actions.updateSetting({
        db: {
          limitRecord: result
        }
      })
        .then(() => {})
        .catch((e) => {
          console.error(e)
          setInvalidLimitOfRecords('Failed to save')
        })
    }
  }
  const onChangeAllowOrigin = (str: string) => {
    try {
      const exp = new RegExp(str)
      exp.test('')
      setInvalidReExMsg(undefined)
      actions.updateSetting({
        db: {
          allowSavedOrigin: str
        }
      })
        .then(() => {})
        .catch(() => {
          setInvalidLimitOfRecords('Failed to save')
        })
    } catch (e) {
      console.error(e)
      setInvalidReExMsg('Invalid pattern')
    }
  }
  return (
    <Group>
      <div>
        <Typography size='h4'>
          Logging
        </Typography>
        <hr />
      </div>
      <Block>
        <TextField
          label='Allow saved origin (Regular expression)'
          value={state.logSettings.value?.db.allowSavedOrigin.toString() ?? '*'}
          onChange={onChangeAllowOrigin}
          errorMsg={invalidRegExMsg()}
        />
      </Block>
      <Block>
        <TextField
          label='Limit of records'
          value={state.logSettings.value?.db.limitRecord.toString() ?? ''}
          onInput={onInputLimitOfRecords}
          onChange={onChangeLimitOfRecords}
          errorMsg={invalidLimitOfRecords()}
        />
      </Block>
    </Group>
  )
}

export default LoggingSettings
