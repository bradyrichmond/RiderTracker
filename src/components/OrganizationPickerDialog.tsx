import { OptionsType } from '@/types/FormTypes'
import { OrganizationType } from '@/types/OrganizationType'
import { Alert, Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Snackbar, TextField } from '@mui/material'
import { SyntheticEvent, useMemo, useState } from 'react'

interface OrganizationPickerDialogProps {
    open: boolean
    handleSelectOrganization(_orgId: string): void
    organizations: OrganizationType[]
}

const OrganizationPickerDialog = ({ open, handleSelectOrganization, organizations }: OrganizationPickerDialogProps) => {
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [selectedOrganizationId, setSelectedOrganizationId] = useState('')

    const mappedOrganizations: OptionsType[] = useMemo(() =>
        organizations.map((o) => ({
            label: o.orgName ?? o.id,
            value: o.id,
            id: o.id
        })), [organizations])

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        if (!selectedOrganizationId) {
            showNoOrgSelectedSnackbar()
            return
        }

        handleSelectOrganization(selectedOrganizationId)
    }

    const showNoOrgSelectedSnackbar = () => {
        setSnackbarMessage('You must select an organization to continue.')
    }

    const onSnackbarClose = () => {
        setSnackbarMessage('')
    }

    return (
        <>
            <Snackbar open={!!snackbarMessage} autoHideDuration={5000} onClose={onSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert
                    onClose={onSnackbarClose}
                    severity='error'
                    variant='filled'
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Dialog
                open={open}
                PaperProps={{
                    component: 'form',
                    onSubmit: onSubmit,
                    sx: { padding: '2rem', minWidth: '25%' }
                }}
            >
                <DialogTitle textAlign='center'>Select Organization</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <Autocomplete
                            id='orgId'
                            options={mappedOrganizations}
                            getOptionLabel={(option: OptionsType) => option.label}
                            filterSelectedOptions
                            onChange={(_e: SyntheticEvent, v: OptionsType | null) => setSelectedOrganizationId(v?.id ?? '')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    id={`${params.id}Label`}
                                />
                            )}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Button variant='contained' type="submit">Select Organization</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default OrganizationPickerDialog