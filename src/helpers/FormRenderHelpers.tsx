import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FormDataType, FormInputType } from "../types/FormTypes";
import { useFormContext } from "react-hook-form";

export const pickRenderElement = (field: FormInputType, index: number) => {
    const { register } = useFormContext<FormDataType>()

    if (!register) {
        const error = 'This method needs to be wrapped in <FormProvider {...methods}>.'
        console.error(error)
        throw error
    }

    switch (field.inputType) {
        case "select":
            return (
                <FormControl fullWidth>
                    <InputLabel id={`${field.name}Label`}>{field.name}</InputLabel>
                    <Select
                        labelId={`${field.name}Label`}
                        id={`${field.name}SelectItem`}
                        label={field.name}
                        {...register(`inputs.${index}.name`)}
                    >
                        {field.options ? field.options.map((f) => <MenuItem key={f.id} value={f.id}>{f.label}</MenuItem>) : null}
                    </Select>
                </FormControl>
            )
            break;
        default:
            return <TextField label={field.name} fullWidth {...register(`inputs.${index}.name`)}/>
    }
}