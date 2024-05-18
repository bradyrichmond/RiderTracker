import { useCallback } from 'react'
import { debounce } from './debounce'
import { ChangeEvent } from 'react'
import { StandardTextFieldProps, TextField } from '@mui/material'

export interface DebouncedTextfieldProps extends Omit<StandardTextFieldProps, 'onChange'> {
    debounceMs?: number
    onChange: (val: string) => void
}

const DebouncedTextField = (props: DebouncedTextfieldProps) => {
    const { debounceMs, onChange, ...rest } = props

    const debouncedChangeHandler = useCallback(debounce(onChange, debounceMs), [])

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        debouncedChangeHandler(target.value)
    }

    return <TextField onChange={handleChange} {...rest} />
}

export default DebouncedTextField