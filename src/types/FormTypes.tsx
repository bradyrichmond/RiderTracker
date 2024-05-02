export interface AddEntityModalProps<T> {
    orgId?: string
    cancelAction: () => void
    entityFactory: (args: string[]) => T
    formDefaultValues: FormDataType
    submitAction: (newEntity: T) => Promise<void>
    titleSingular: string
    open: boolean
}

export interface FormInputType {
    name: string
    inputType?: string
    options?: OptionsType[]
}

export interface FormDataType {
    inputs: FormInputType[]
}

export interface OptionsType {
    label: string
    id: string
}