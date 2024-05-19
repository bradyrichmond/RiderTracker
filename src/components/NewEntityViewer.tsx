import { Box, Button, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { ComponentType } from 'react'
import { BusType } from '../types/BusType'
import { OrganizationType } from '../types/OrganizationType'
import { RiderType } from '../types/RiderType'
import { ScanType } from '../types/ScanType'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { SchoolType } from '@/types/SchoolType'
import { StopType } from '@/types/StopType'
import { GuardianType, UserType } from '@/types/UserType'

interface NewEntityViewerProps<T> {
    entities: T[]
    gridColumns: GridColDef[]
    titleSingular?: string
    titlePlural?: string
    processRowUpdate(updatedRow: T, originalRow: T): Promise<T>
    Modal?: ComponentType
    toggleShowModal: () => void
}


const NewEntityViewer = <T extends BusType | GuardianType | OrganizationType | RiderType | ScanType | SchoolType | StopType | UserType>(
    { entities, gridColumns, titleSingular, titlePlural, processRowUpdate, Modal, toggleShowModal }: NewEntityViewerProps<T>) => {

    return (
        <Box height='100%' width='100%' display='flex' flexDirection='column'>
            {Modal ?
                <Modal />
                :
                null
            }
            <Box marginBottom='2rem' display='flex' flexDirection='row'>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h2'>
                        {titlePlural}
                    </Typography>
                </Box>
                {Modal ?
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
                <DataGrid rows={entities} columns={gridColumns} rowHeight={100} processRowUpdate={processRowUpdate} />
            </Box>
        </Box>
    )
}

export default NewEntityViewer