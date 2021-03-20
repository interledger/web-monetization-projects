//! prototype use only

import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  FormControlLabel,
  styled,
  TextField,
  RadioGroup,
  Radio,
  Checkbox
} from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState, ISettingsUpdate } from '@coil/extension-popup/redux/models'
import { defaultState } from '@coil/extension-popup/redux/reducer'
import * as actions from '@coil/extension-popup/redux/actions'
import { HotkeySetting } from '@coil/extension-popup/types'
import { designIterationsList } from '@coil/extension-popup/components/DesignIterations/list'
import { getHotkeyAmounts } from '@coil/extension-popup/utils/get-amount-data.utils'

//
// Styles
//
const ComponentWrapper = styled('div')(({ open }: { open: boolean }) => ({
  position: 'absolute',
  height: 'calc(100vh - 40px)',
  overflowY: 'auto',
  width: '800px',
  backgroundColor: '#FCFCFC',
  border: '1px solid #B2B2B2',
  boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.25)',
  display: open ? 'block' : 'none',
  padding: '24px',
  fontWeight: 'normal',
  '& .note': {
    fontStyle: 'italic',
    color: '#b2b2b2',
    fontSize: '12px'
  },
  '& .radio-group': {
    display: 'flex',
    flexDirection: 'row',
    '& > label': {
      flex: '1'
    }
  },
  '& .default-values': {
    display: 'inline-block',
    width: '40px',
    height: '30px',
    padding: '4px',
    backgroundColor: '#dddddd',
    borderRadius: '5px',
    marginRight: '25px',
    fontWeight: 'bold',
    textAlign: 'center'
  }
}))

//
// Models
//
const schema = yup.object().shape({
  minimumTipAmount: yup.number().required('gotta insert something'),
  maximumTipAmount: yup.number().required('password is required'),
  maxDailyLimit: yup.number().required('password is required'),
  tipCredits: yup.number().required(),
  creditCardOnFile: yup.boolean()
})
interface IFormData {
  maximumTipAmount: number
  creditCardOnFile: boolean
  minimumTipAmount: number
  maxDailyLimit: number
  tipCredits: number
  customOne: number
  customTwo: number
  customThree: number
  customFour: number
  hotkeyMethod: HotkeySetting
  hotkeysSubmit: boolean
  designIteration: number
}

//
// Component
//
export const SettingsPanel = (props: {
  isOpen: boolean
}): React.ReactElement => {
  const state = useSelector((state: IRootState) => state)
  const dispatch = useDispatch()
  const [hotkeyView, setHotkeyView] = useState<HotkeySetting>(
    state.hotkeySetting
  )

  const { formState, handleSubmit, control, setValue, reset, watch } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  })
  const watchHotkeyMethod = watch('hotkeyMethod')

  const setInitialValues = (): IFormData => {
    return {
      maximumTipAmount: state.maximumTipLimit,
      creditCardOnFile: true,
      minimumTipAmount: state.minimumTipLimit,
      maxDailyLimit: state.maximumDailyTipLimit,
      tipCredits: state.tipCreditBalance,
      customOne: state.hotkeyAmounts[0],
      customTwo: state.hotkeyAmounts[1],
      customThree: state.hotkeyAmounts[2],
      customFour: state.hotkeyAmounts[3],
      hotkeyMethod: state.hotkeySetting,
      hotkeysSubmit: state.hotkeysSubmit,
      designIteration: state.designIteration
    }
  }

  let initialValues: IFormData = setInitialValues()

  // update tip credits - need to manually update the tip balance so if the settings are open it acurately reflects the balance as tips happen
  useEffect(() => {
    initialValues = setInitialValues()
    setValue('tipCredits', state.tipCreditBalance)
  }, [state])

  // update hotkey button views - need to manually do this since the 'watch' method only fires onChange and does not populate an initial value
  useEffect(() => {
    setHotkeyView(watchHotkeyMethod)
  }, [watchHotkeyMethod])

  // saves form values to state
  const onSubmit = (values: IFormData) => {
    // create a new state object to update the store based on form values
    const settingsUpdate: ISettingsUpdate = {
      maximumTipLimit: values.maximumTipAmount,
      maximumDailyTipLimit: values.maxDailyLimit,
      minimumTipLimit: values.minimumTipAmount,
      tipCreditBalance: values.tipCredits,
      hotkeyAmounts: [
        Number(values.customOne || defaultState.defaultHotkeyAmounts[0]),
        Number(values.customTwo || defaultState.defaultHotkeyAmounts[1]),
        Number(values.customThree || defaultState.defaultHotkeyAmounts[2]),
        Number(values.customFour || defaultState.defaultHotkeyAmounts[3])
      ],
      hotkeySetting: values.hotkeyMethod,
      hotkeysSubmit: values.hotkeysSubmit,
      designIteration: Number(values.designIteration)
    }
    // update the store
    dispatch(actions.update_from_settings(settingsUpdate))
  }

  // cancels any unsaved changes and closes form
  const handleCancelForm = () => {
    reset(initialValues)
    dispatch(actions.toggle_settings())
  }

  // sets the state and the form values to the default settings
  const handleResetSettingsToDefault = () => {
    dispatch(actions.reset_defaults_from_settings())
    const defaultFormState: IFormData = {
      maximumTipAmount: defaultState.maximumTipLimit,
      creditCardOnFile: true,
      minimumTipAmount: defaultState.minimumTipLimit,
      maxDailyLimit: defaultState.maximumDailyTipLimit,
      tipCredits: defaultState.tipCreditBalance,
      customOne: defaultState.defaultHotkeyAmounts[0],
      customTwo: defaultState.defaultHotkeyAmounts[1],
      customThree: defaultState.defaultHotkeyAmounts[2],
      customFour: defaultState.defaultHotkeyAmounts[3],
      hotkeyMethod: defaultState.hotkeySetting,
      hotkeysSubmit: defaultState.hotkeysSubmit,
      designIteration: defaultState.designIteration
    }
    reset(defaultFormState)
  }

  const handleHistoryReset = () => {
    dispatch(actions.clear_tip_to_history())
  }

  return (
    <ComponentWrapper open={props.isOpen}>
      <h2>Prototype Settings</h2>
      <p>
        These settings will allow you to adjust your prototype experience only.
        Please note that this UI does not reflect the UI that will be used for
        these settings in the real application, this is only for testing.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box pb={2}>
          <h3>Design Iteration</h3>
          <Controller
            name='designIteration'
            defaultValue={initialValues.designIteration}
            control={control}
            render={({ onChange, value }) => (
              <RadioGroup
                aria-label='hotkey method'
                name='hotkeyMethod'
                value={value.toString()}
                onChange={onChange}
                color='primary'
                className='radio-group'
              >
                {
                  // not elegant but works for now
                  designIterationsList.map((design, index) => {
                    return (
                      <FormControlLabel
                        key={`design-radio-${index}`}
                        value={design.toString()}
                        control={<Radio color='primary' />}
                        label={`Design ${design}`}
                      />
                    )
                  })
                }
              </RadioGroup>
            )}
          />
        </Box>
        {/* <Box py={2}>
          <h3>User settings</h3>
          <p>The options below represent the settings users will be able to set on their own accounts for tipping.</p>
          <Box py={1}>
            <Controller
              name="maximumTipAmount"
              defaultValue={initialValues.maximumTipAmount}
              control={control}
              render={({ onChange, value }) => (
                <TextField
                  fullWidth
                  onChange={onChange}
                  value={value}
                  variant="filled"
                  label="Maximum tip amount"
                  error={formState?.errors?.maximumTipAmount != null}
                  helperText={formState?.errors?.maximumTipAmount?.message}
                />
              )}
            />
          </Box>
        </Box> */}

        <Box py={2}>
          <h3>Tip Limit Settings</h3>
          <p>
            The options below represent the defaults/settings determined by
            Coil.
          </p>
          <Box py={1}>
            <Controller
              name='minimumTipAmount'
              defaultValue={initialValues.minimumTipAmount}
              control={control}
              render={({ onChange, value }) => (
                <TextField
                  fullWidth
                  onChange={onChange}
                  value={value}
                  variant='filled'
                  label='Minimum tip amount'
                  error={formState?.errors?.minimumTipAmount != null}
                  helperText={formState?.errors?.minimumTipAmount?.message}
                />
              )}
            />
          </Box>
          <Box py={1}>
            <span className='note'>
              In the prototype the maximum daily limit will not effect your
              ability to tip within a day. Instead it will just operate as you
              maximum tip amount before you have to reset your tip history. It
              will also be used to calculate the predefined hotkey amounts it
              when they are set to be configured by the limits
            </span>
            <Controller
              name='maxDailyLimit'
              defaultValue={initialValues.maxDailyLimit}
              control={control}
              render={({ onChange, value }) => (
                <TextField
                  fullWidth
                  onChange={onChange}
                  value={value}
                  variant='filled'
                  label='Max daily tip limit'
                  error={formState?.errors?.maxDailyLimit != null}
                  helperText={formState?.errors?.maxDailyLimit?.message}
                />
              )}
            />
          </Box>
          <Box py={1}>
            <Controller
              name='tipCredits'
              defaultValue={initialValues.designIteration} // this field gets manually set when state changes.
              control={control}
              render={({ onChange, value }) => (
                <TextField
                  fullWidth
                  onChange={onChange}
                  value={value}
                  variant='filled'
                  label='Tip credits'
                  error={formState?.errors?.tipCredits != null}
                  helperText={formState?.errors?.tipCredits?.message}
                />
              )}
            />
          </Box>
        </Box>

        <Box py={2}>
          <h3>Hotkey settings</h3>
          <p>
            The options below represent different settings that only apply to
            the prototype.
          </p>

          <Box>
            <Box py={1}>
              <Controller
                name='hotkeysSubmit'
                defaultValue={initialValues.hotkeysSubmit}
                control={control}
                render={({ value }) => (
                  <FormControlLabel
                    checked={value}
                    control={
                      <Checkbox
                        onChange={() => setValue('hotkeysSubmit', !value)}
                        color='primary'
                      />
                    }
                    label='Hotkeys submit when selected'
                  />
                )}
              />
            </Box>
            <strong>Hotkey Values</strong>
            <Controller
              name='hotkeyMethod'
              defaultValue={initialValues.hotkeyMethod}
              control={control}
              render={({ onChange, value }) => (
                <RadioGroup
                  aria-label='hotkey method'
                  name='hotkeyMethod'
                  value={value}
                  onChange={onChange}
                  color='primary'
                  className='radio-group'
                >
                  <FormControlLabel
                    value={HotkeySetting.Default}
                    control={<Radio color='primary' />}
                    label='Default'
                  />
                  <FormControlLabel
                    value={HotkeySetting.User_defined}
                    control={<Radio color='primary' />}
                    label='User defined'
                  />
                  <FormControlLabel
                    value={HotkeySetting.History_defined}
                    control={<Radio color='primary' />}
                    label='History based'
                  />
                  <FormControlLabel
                    value={HotkeySetting.Limit_defined}
                    control={<Radio color='primary' />}
                    label='Limit based'
                  />
                </RadioGroup>
              )}
            />
          </Box>
          {hotkeyView === HotkeySetting.Default && (
            <>
              <p>
                Default hotkey values
                <br />
                <span className='note'>
                  These are the default values that would be set by the system
                </span>
              </p>
              <Box className='default-values'>
                ${defaultState.defaultHotkeyAmounts[0]}
              </Box>
              <Box className='default-values'>
                ${defaultState.defaultHotkeyAmounts[1]}
              </Box>
              <Box className='default-values'>
                ${defaultState.defaultHotkeyAmounts[2]}
              </Box>
              <Box className='default-values'>
                ${defaultState.defaultHotkeyAmounts[3]}
              </Box>
            </>
          )}
          {hotkeyView === HotkeySetting.User_defined && (
            <>
              <p>
                User defined values
                <br />
                <span className='note'>
                  Using the fields below you can set the values of your hotkey
                  buttons
                </span>
                <br />
                <span className='note'>
                  There is no validation on this to prevent you from entering in
                  values out of order or check your values against max an min
                  values
                </span>
              </p>
              <Box display='flex' marginBottom={5}>
                <Box marginRight={2}>
                  <Controller
                    name='customOne'
                    defaultValue={initialValues.customOne}
                    control={control}
                    render={({ onChange, value }) => (
                      <TextField
                        fullWidth
                        onChange={onChange}
                        value={value}
                        variant='filled'
                        label='First'
                        type='number'
                        error={formState?.errors?.customOne != null}
                        helperText={formState?.errors?.customOne?.message}
                      />
                    )}
                  />
                </Box>
                <Box marginRight={2}>
                  <Controller
                    name='customTwo'
                    defaultValue={initialValues.customTwo}
                    control={control}
                    render={({ onChange, value }) => (
                      <TextField
                        fullWidth
                        onChange={onChange}
                        value={value}
                        variant='filled'
                        label='Second'
                        type='number'
                        error={formState?.errors?.customTwo != null}
                        helperText={formState?.errors?.customTwo?.message}
                      />
                    )}
                  />
                </Box>
                <Box marginRight={2}>
                  <Controller
                    name='customThree'
                    defaultValue={initialValues.customThree}
                    control={control}
                    render={({ onChange, value }) => (
                      <TextField
                        fullWidth
                        onChange={onChange}
                        value={value}
                        variant='filled'
                        label='Third'
                        type='number'
                        error={formState?.errors?.customThree != null}
                        helperText={formState?.errors?.customThree?.message}
                      />
                    )}
                  />
                </Box>
                <Box marginRight={2}>
                  <Controller
                    name='customFour'
                    defaultValue={initialValues.customFour}
                    control={control}
                    render={({ onChange, value }) => (
                      <TextField
                        fullWidth
                        onChange={onChange}
                        value={value}
                        variant='filled'
                        label='Fourth'
                        type='number'
                        error={formState?.errors?.customFour != null}
                        helperText={formState?.errors?.customFour?.message}
                      />
                    )}
                  />
                </Box>
              </Box>
            </>
          )}
          {hotkeyView === HotkeySetting.History_defined && (
            <Box>
              <p>
                History based values
                <br />
                <span className='note'>
                  The hotkey buttons can be configured to create the
                  predetermined tip amounts based off your tip history. There
                  needs to be at least 10 tips in your history for it to begin
                  calculating your new hotkey values.
                </span>
              </p>
              <Box>
                <p>
                  <strong>Hotkey amounts </strong>
                  <span>(must save form to update): </span>
                  {getHotkeyAmounts().map((amount, index) => {
                    return (
                      <span
                        style={{ marginRight: '5px' }}
                        key={`amount-${index}`}
                      >
                        ${amount}
                        {index + 1 !== getHotkeyAmounts().length && ', '}
                      </span>
                    )
                  })}
                </p>
              </Box>
            </Box>
          )}
          {hotkeyView === HotkeySetting.Limit_defined && (
            <>
              <p>
                Limit based values
                <br />
                <span>
                  The limit based values will be calculated based off your user
                  set daily tip limit
                </span>
              </p>
            </>
          )}
        </Box>
        <Box py={2}>
          <h3>Tip History</h3>
          <Box mb={2}>
            {state.tipHistory.length <= 0 && <span>No tips in history</span>}
            {[...state.tipHistory]
              .reverse()
              .map((tip: number, index: number) => {
                return (
                  <span style={{ marginRight: '5px' }} key={`tip-${index}`}>
                    ${tip}
                    {index + 1 !== state.tipHistory.length && ', '}
                  </span>
                )
              })}
          </Box>
          <Button type='button' onClick={handleHistoryReset}>
            Clear tip history
          </Button>
        </Box>
        <hr />
        <Box mt={3} display='flex' justifyContent='space-between'>
          <Button type='reset' onClick={handleResetSettingsToDefault}>
            Reset all settings to default values
          </Button>
          <Button type='reset' onClick={handleCancelForm}>
            Cancel
          </Button>
          <Button
            color='primary'
            type='submit'
            disabled={!formState.isValid || formState.isSubmitting}
          >
            Save
          </Button>
        </Box>
      </form>
    </ComponentWrapper>
  )
}
