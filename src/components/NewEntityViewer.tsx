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
import SearchBar from './SearchBar'
import SyncIcon from '@mui/icons-material/Sync'

interface NewEntityViewerProps<T> {
    entities: T[]
    gridColumns: GridColDef[]
    titleSingular?: string
    titlePlural?: string
    processRowUpdate(updatedRow: T, originalRow: T): Promise<T>
    Modal?: ComponentType
    toggleShowModal: () => void
    searchAction?: (searchArg: string) => Promise<void>
    refreshAction?(): void
}


const NewEntityViewer = <T extends BusType | GuardianType | OrganizationType | RiderType | ScanType | SchoolType | StopType | UserType>(
    { entities, gridColumns, titleSingular, titlePlural, processRowUpdate, Modal, toggleShowModal, searchAction, refreshAction }: NewEntityViewerProps<T>) => {

    return (
        <Box height='100%' width='100%' display='flex' flexDirection='column'>
            {Modal ?
                <Modal />
                :
                null
            }
            <Box display='flex' flexDirection='row'>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h2'>
                        {titlePlural}
                    </Typography>
                </Box>
                <Box padding='2rem' flex='1' display='flex' flexDirection='row' justifyContent='flex-end'>
                    {refreshAction ?
                        <Box sx={{ mr: '2rem', ml: '2rem' }}>
                            <Button variant='contained' onClick={() => refreshAction()}><SyncIcon fontSize='large' /></Button>
                        </Box>
                        :
                        null
                    }
                    {Modal ?
                        <Button variant='contained' onClick={toggleShowModal}>
                            <Box display='flex' flexDirection='row'>
                                <AddCircleIcon />
                                <Box flex='1' marginLeft='1rem'>
                                    <Typography>Add {titleSingular}</Typography>
                                </Box>
                            </Box>
                        </Button>
                        :
                        null
                    }
                </Box>
            </Box>
            <Box sx={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                <Box>
                    {searchAction ?
                        <Box sx={{ mb: '2rem' }}>
                            <SearchBar onChange={searchAction} debounceMs={300} fullWidth />
                        </Box>
                        :
                        null
                    }
                </Box>
                <Box sx={{ flex: '1' }}>
                    <DataGrid
                        rows={entities}
                        columns={gridColumns}
                        rowHeight={100}
                        processRowUpdate={processRowUpdate}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default NewEntityViewer