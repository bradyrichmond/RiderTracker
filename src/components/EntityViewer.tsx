import { Box, Button, Typography } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../contexts/RoleContextProvider"
import { useParams } from 'react-router-dom'
import { BusType } from "../types/BusType"
import { DriverType } from "../types/DriverType"
import { GuardianType } from "../types/GuardianType"
import { OrganizationType } from "../types/OrganizationType"
import { RiderType } from "../types/RiderType"
import { ScanType } from "../types/ScanType"
import AddEntityModal from "./AddEntityModal"
import { FormDataType } from "../types/FormTypes"
import { DataGrid, GridColDef } from '@mui/x-data-grid'

export interface ModalProps<T> {
    cancelAction: () => void
    organizationId?: string
    submitAction: (_newEntity: T) => void
    titleSingular: string
}

interface EntityViewerProps<T> {
    createEntity?(_body: T): Promise<void>
    fetchForOrg?: boolean
    entityFactory: (args: string[]) => T 
    getEntities(id?: string): void
    entities: T[]
    modalFormInputs?: FormDataType
    gridColumns: GridColDef[]
    titleSingular?: string
    titlePlural?: string
}


const EntityViewer = <T extends 
        BusType | DriverType | GuardianType | OrganizationType | RiderType | ScanType>(
    {
        createEntity, entityFactory, entities, getEntities, modalFormInputs, gridColumns, titleSingular, titlePlural
    }:EntityViewerProps<T>
) => {
    const [showModal, setShowModal] = useState(false)
    const roleContext = useContext(RoleContext)
    const { id } = useParams()

    useEffect(() => {
        updateEntities()
    }, [roleContext])

    const updateEntities = () => {
        getEntities(id)
    }

    const toggleShowModal = () => {
        setShowModal((cur: boolean) => !cur)
    }

    const submitAction = async (newEntity: T) => {
        if (modalFormInputs && createEntity) {
            modalFormInputs && toggleShowModal()
            await createEntity(newEntity)
            updateEntities()
        }
    }

    return (
        <Box height='100%' width='100%' display='flex' flexDirection='column'>
            {modalFormInputs ?
                <AddEntityModal<T> 
                    cancelAction={toggleShowModal} 
                    entityFactory={entityFactory}
                    submitAction={submitAction}
                    titleSingular={titleSingular ?? ''}
                    formDefaultValues={modalFormInputs}
                    organizationId={id}
                    open={showModal}
                />
                :
                null
            }
            <Box marginBottom='2rem' display='flex' flexDirection='row'>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h2'>
                        {titlePlural}
                    </Typography>
                </Box>
                {modalFormInputs && createEntity ? 
                    <Box padding='2rem' flex='1' display='flex' flexDirection='row' justifyContent='flex-end'>
                        <Button variant='contained' onClick={toggleShowModal}>
                            <Box display='flex' flexDirection='row'>
                                <AddCircleIcon />
                                <Box flex='1' marginLeft='1rem'>
                                    <Typography>Add {titleSingular}</Typography>
                                </Box>
                            </Box>
                        </Button>
                    </Box>
                    :
                    null
                }
            </Box>
            <Box flex='1'>
                <DataGrid rows={entities} columns={gridColumns} />
            </Box>
        </Box>
    )
}

export default EntityViewer