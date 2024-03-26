import { Box, Button, Modal, Typography } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { ComponentType, useContext, useEffect, useState } from "react"
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

export interface ModalProps<T> {
    cancelAction: () => void
    organizationId?: string
    submitAction: (_newEntity: T) => void
    titleSingular: string
}

interface RowProps<T> {
    entity: T
    deleteAction?: () => {}
    deleteTooltipTitle?: string
}

interface EntityViewerProps<T> {
    createEntity(_token: string, _body: T): Promise<Response>
    fetchForOrg?: boolean
    entityFactory: (args: string[]) => T 
    getEntities(_token: string, id?: string): Promise<T[]>
    modalFormInputs?: FormDataType
    Row: ComponentType<RowProps<T>>
    titleSingular: string
    titlePlural: string
}


const EntityViewer = <T extends 
        BusType | DriverType | GuardianType | OrganizationType | RiderType | ScanType>(
    {
        createEntity, entityFactory, getEntities, modalFormInputs, Row, titleSingular, titlePlural
    }:EntityViewerProps<T>
) => {
    const [showModal, setShowModal] = useState(false);
    const [entities, setEntities] = useState<T[]>([])
    const roleContext = useContext(RoleContext)
    const { id } = useParams()

    useEffect(() => {
        updateEntities()
    }, [roleContext.token])

    const updateEntities = async () => {
        const newEntities = await getEntities(roleContext.token, id)
        setEntities(newEntities)
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
        <Box height='100%' flexDirection='column'>
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
                {entities && entities.map((entity) => {
                    return (
                        <Row key={entity.id} entity={entity} />
                    )
                })}
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