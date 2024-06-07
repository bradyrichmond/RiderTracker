import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { SnackbarContext } from '@/contexts/SnackbarContextProvider'
import { Transition } from '@/components/Transition'
import { OptionsType } from '@/types/FormTypes'
import { yupResolver } from '@hookform/resolvers/yup'
import { scanSchema } from '@/validation/scanSchema'

interface ScanInput {
    riderIds: string[]
    stopId: string
    guardianIds?: string[]
}

interface CreateScanDialogProps {
    cancel(): void
    createScan(input: ScanInput ): Promise<void>
    isAddingScan: boolean
    allStops: OptionsType[]
    allRiders: OptionsType[]
    allGuardians: OptionsType[]
}

const CreateScanDialog = ({ cancel, createScan, isAddingScan, allStops, allRiders, allGuardians }: CreateScanDialogProps) => {
    const [disableButtons, setDisableButtons] = useState<boolean>(false)
    const { t } = useTranslation(['scans', 'common'])
    const { showErrorSnackbar } = useContext(SnackbarContext)
    const {
        handleSubmit,
        setValue,
        reset,
        formState: {
            errors
        }
    } = useForm<ScanInput>({ resolver: yupResolver(scanSchema) })

    const createScanAction = async (scan: ScanInput) => {
        try {
            setDisableButtons(true)
            await createScan(scan)
            setDisableButtons(false)
            reset()
        } catch (e) {
            // TODO: Need better error handling
            console.error(e as string)
            setDisableButtons(false)
            showErrorSnackbar('Error creating Scan.')
        }
    }

    return (
        <Dialog
            open={isAddingScan}
            onClose={cancel}
            TransitionComponent={Transition}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(createScanAction),
                sx: { padding: '2rem', minWidth: '25%' }
            }}
        >
            <DialogTitle textAlign='center'>{t('addScan')}</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <Autocomplete
                        multiple
                        id='RidersAutoComplete'
                        options={allRiders}
                        getOptionLabel={(option: OptionsType) => option.label}
                        filterSelectedOptions
                        onChange={(_e, values: OptionsType[]) => setValue('riderIds', values.map((v: OptionsType) => v.id))}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={t('riders', { ns: 'common' })}
                                id='RidersLabel'
                                error={!!errors.riderIds?.message}
                                helperText={errors.riderIds?.message ? t(errors.riderIds.message, { ns: 'common' }) : ''}
                            />
                        )}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <Autocomplete
                        id='StopAutoComplete'
                        options={allStops}
                        getOptionLabel={(option: OptionsType) => option.label}
                        filterSelectedOptions
                        onChange={(_e, value: OptionsType | null) => setValue('stopId', value?.id ?? '')}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={t('stop', { ns: 'common' })}
                                id='StopLabel'
                                error={!!errors.stopId?.message}
                                helperText={errors.stopId?.message ? t(errors.stopId.message, { ns: 'common' }) : ''}
                            />
                        )}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <Autocomplete
                        multiple
                        id='GuardiansAutoComplete'
                        options={allGuardians}
                        getOptionLabel={(option: OptionsType) => option.label}
                        filterSelectedOptions
                        onChange={(_e, values: OptionsType[]) => setValue('guardianIds', values.map((v: OptionsType) => v.id))}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={t('guardians', { ns: 'common' })}
                                id='GuardiansLabel'
                                error={!!errors.guardianIds?.message}
                                helperText={errors.guardianIds?.message ? t(errors.guardianIds.message, { ns: 'common' }) : ''}
                            />
                        )}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancel}>{t('cancel', { ns: 'common' })}</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{t('createScan')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateScanDialog