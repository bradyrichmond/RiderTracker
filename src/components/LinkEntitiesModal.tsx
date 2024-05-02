import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { RiderType } from "../types/RiderType"
import { OptionsType } from '../types/FormTypes'
import { GuardianType } from '@/types/UserType'

interface LinkEntitiesModalProps<T> {
    cancelAction: () => void
    entity: T
    submitAction: (riderId: string) => Promise<void>
    title: string
    submitButtonText: string
    open: boolean
    options: OptionsType[]
}

const LinkEntitiesModal = <T extends 
        GuardianType | RiderType>({ 
        cancelAction, submitAction, title, submitButtonText, open, options
    }: LinkEntitiesModalProps<T>) => {
    const [disableButtons, setDisabledButtons] = useState(false)
    const [selectedRider, setSelectedRider] = useState('')

    const handleCreateEntity = () => {
        setDisabledButtons(true)
        submitAction(selectedRider)
        setDisabledButtons(false)
    }

    const handleChange = (_e: SyntheticEvent, value: OptionsType | null) => {
        setSelectedRider(value?.id ?? '')
    }

    return (
        <Dialog
            open={open}
            onClose={cancelAction}
            PaperProps={{
                component: 'form',
                onSubmit: handleCreateEntity,
                sx: { padding: '2rem', minWidth: '25%' }
            }}
        >
            <DialogTitle textAlign='center'>{title}</DialogTitle>
            <DialogContent>
                <Box marginTop='2rem'>
                <FormControl fullWidth>
                    <Autocomplete
                        id={`riderIdSelectAutoComplete`}
                        options={options}
                        getOptionLabel={(option: OptionsType) => option.label}
                        filterSelectedOptions
                        onChange={handleChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='riderIdSelect'
                                id={`riderIdSelectLabel`}
                            />
                        )}
                    />
                </FormControl>
                </Box>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancelAction}>Cancel</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{submitButtonText}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default LinkEntitiesModal
