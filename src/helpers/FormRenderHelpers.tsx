import { Autocomplete, Box, Button, FormControl, TextField, Tooltip } from "@mui/material"
import { FormDataType, FormInputType, OptionsType } from "../types/FormTypes"
import { useFormContext } from "react-hook-form"
import { useRandomNameGenerator } from "@/hooks/useRandomNameGenerator"
import { useContext, useEffect } from "react"
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn'
import DebouncedTextField from "@/components/DebouncedTextfield"
import { SnackbarContext } from "@/contexts/SnackbarContextProvider"

export const pickRenderElement = (field: FormInputType, index: number) => {
    const { register, setValue, resetField } = useFormContext<FormDataType>()
    const { randomName, generateRandomName } = useRandomNameGenerator()
    // @ts-ignore I want these to be used later
    const { setSnackbarMessage, setSnackbarSeverity, setSnackbarVariant, setSnackbarVisibilityMs } = useContext(SnackbarContext)

    const updateRandomName = (fieldName: `inputs.${number}.name`) => {
        generateRandomName()
        setValue(fieldName, randomName)
    }

    useEffect(() => {
        if (field.options) {
            resetField(`inputs.${index}.name`, { defaultValue: field.options[0].id })
        }
    }, [field.options])

    if (!register) {
        const error = 'This method needs to be wrapped in <FormProvider {...methods}>.'
        console.error(error)
        throw error
    }

    const handleEmailValidation = (val: string) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

        if (!val) {
            setSnackbarMessage('Email address is required')
        }
        
        if (!val.match(emailPattern)) {
            setSnackbarMessage('Invalid email address')
        }
    }

    switch (field.inputType) {
        case "select":
            return (
                <>
                    {field.options ?
                        <FormControl fullWidth>
                            <Autocomplete
                                id={`${field.name}AutoComplete`}
                                options={field.options ?? []}
                                getOptionLabel={(option: OptionsType) => option.label}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={field.name}
                                        id={`${field.name}Label`}
                                    />
                                )}
                            />
                        </FormControl>
                        :
                        null
                    }
                </>
            )
            case "selectMultiple":
                return (
                    <>
                        {field.options ?
                            <FormControl fullWidth>
                                <Autocomplete
                                    multiple
                                    id={`${field.name}AutoComplete`}
                                    options={field.options ?? []}
                                    getOptionLabel={(option: OptionsType) => option.label}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={field.name}
                                            id={`${field.name}Label`}
                                        />
                                    )}
                                />
                            </FormControl>
                            :
                            null
                        }
                    </>
                )
        case "randomNameGenerator":
            const fieldName: `inputs.${number}.name` = `inputs.${index}.name`
            useEffect(() => {
                updateRandomName(fieldName)
            }, [fieldName])

            return (
                <Box display='flex' flexDirection='row' alignItems='center'>
                   <TextField fullWidth label='Random Name' 
                        sx={{"& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000" },}} 
                        inputProps={
                            { readOnly: true }
                        }
                        {...register(fieldName)}
                    /> 
                    <Box paddingLeft='1rem' paddingTop='1rem'>
                        <Button variant='contained' sx={{ padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => updateRandomName(fieldName)}>
                            <Tooltip title='Generate a new random name'>
                                <ShuffleOnIcon />
                            </Tooltip>
                        </Button>
                    </Box>
                </Box>
            )
        case "address":
            return (
                <>
                    <TextField 
                        fullWidth
                        autoComplete='off'
                        label={field.name}
                        {...register(`inputs.${index}.name` as const)}

                    />
                </>
            )
        case "email":
            return (
                <>
                    <DebouncedTextField
                        fullWidth
                        autoComplete='off'
                        label={field.name}
                        {...register(`inputs.${index}.name` as const, { required: true })}
                        onChange={handleEmailValidation}
                        debounceMs={500}
                    />
                </>
            )
        case "hiddenTextfield":
            return (
                <Box sx={{ height: 0, overflow: 'hidden', padding: 0, mt: 0 }}>
                     <TextField 
                        fullWidth
                        inputProps={
                            { readOnly: true }
                        }
                        label={field.name}
                        {...register(`inputs.${index}.name` as const)}

                    />
                </Box>
            )
        default:
            return (
                <TextField 
                    label={field.name}
                    autoComplete='off'
                    fullWidth {...register(`inputs.${index}.name` as const)}
                />
            )
    }
}