import { Box, Button, Modal, Typography } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../contexts/RoleContext"
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
    createEntity(_token: string, _body: T): Promise<Response>
    fetchForOrg?: boolean
    entityFactory: (args: string[]) => T 
    getEntities(_token: string, id?: string): void
    entities: T[]
    modalFormInputs?: FormDataType
    gridColumns: GridColDef[]
    titleSingular: string
    titlePlural: string
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
    }, [roleContext.token])

    const updateEntities = () => {
        getEntities(roleContext.token, id)
    }

    const toggleShowModal = () => {
        setShowModal((cur: boolean) => !cur)
    }

    const submitAction = async (newEntity: T) => {
        modalFormInputs && toggleShowModal()
        await createEntity(roleContext.token, newEntity)
        updateEntities()
    }

    return (
        <Box height='100%' width='100%' flexDirection='column'>
            {modalFormInputs ?
                <Modal open={showModal} onClose={toggleShowModal} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <AddEntityModal<T> cancelAction={toggleShowModal} entityFactory={entityFactory} submitAction={submitAction} titleSingular={titleSingular} formDefaultValues={modalFormInputs} organizationId={id} />
                </Modal>
                :
                null
            }
            <Box marginBottom='2rem'>
                <Typography variant='h2'>
                    {titlePlural}
                </Typography>
            </Box>
            <Box flex='1' borderTop='1px solid #000'>
                <DataGrid autoHeight rows={entities} columns={gridColumns} />
            </Box>
            {modalFormInputs ? 
                <Box padding='2rem'>
                    <Button variant='contained' onClick={toggleShowModal}>
                        <Box display='flex' flexDirection='row' justifyContent=''>
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
    )
}

export default EntityViewer