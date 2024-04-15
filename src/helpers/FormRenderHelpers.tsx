import { Autocomplete, Box, Button, FormControl, TextField, Tooltip } from "@mui/material"
import { FormDataType, FormInputType, OptionsType } from "../types/FormTypes"
import { useFormContext } from "react-hook-form"
import { useRandomNameGenerator } from "@/hooks/useRandomNameGenerator"
import { useEffect } from "react"
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn'

export const pickRenderElement = (field: FormInputType, index: number) => {
    const { register, setValue, resetField } = useFormContext<FormDataType>()
    const { randomName, generateRandomName } = useRandomNameGenerator()

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
                <Box display='flex' flexDirection='row'>
                   <TextField fullWidth helperText='Random Name' 
                        sx={{"& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000000" },}} 
                        disabled  {...register(fieldName)}
                    /> 
                    <Box paddingLeft='1rem'>
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
                    <TextField label={field.name} 
                        fullWidth
                        autoComplete='off'
                        {...register(`inputs.${index}.name`)}
                    />
                </>
            )
        default:
            return <TextField label={field.name} autoComplete='off' fullWidth {...register(`inputs.${index}.name`)}/>
    }
}