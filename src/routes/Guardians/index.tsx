import { useNavigate } from 'react-router-dom'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { GuardianType, UserType } from '@/types/UserType'
import CreateGuardianDialog from './CreateGuardianDialog'
import { useGuardianStore } from '@/store/GuardianStore'
import { useTranslation } from 'react-i18next'
import SearchBar from '@/components/SearchBar'
import GuardianDrawer from './GuardianDrawer'
import { useAdminStore } from '@/store/AdminStore'
import { useRiderStore } from '@/store/RiderStore'

export interface CreateGuardianInput {
    given_name: string
    family_name: string
    email: string
    address: string
}

interface GuardiansProps {
    activeGuardian?: string
}

const Guardians = ({ activeGuardian }: GuardiansProps) => {
    const { guardians, getGuardians, changeSearchArg } = useGuardianStore()
    const getRiders = useRiderStore().getRiders
    const { createGuardian } = useAdminStore()
    const navigate = useNavigate()
    const [isAddingGuardian, setIsAddingGuardian] = useState<boolean>(false)
    const { t } = useTranslation('guardians')

    useEffect(() => {
        getGuardians()
        getRiders()
    }, [getGuardians, getRiders])

    const createGuardianAction = async (guardian: CreateGuardianInput) => {

        await createGuardian(guardian)

        toggleShowModal()
    }

    const generateGridColumns = (): GridColDef[] => {
        const initialGridColumns: GridColDef[] = [
            { field: 'firstName',  headerName: 'First Name', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'lastName',  headerName: 'Last Name', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'riderIds',  headerName: 'Riders', flex: 1, align: 'center', headerAlign: 'center', valueFormatter: (value: string[] | null) => {
                return Array.isArray(value) ? value.filter((v) => v !== '').length : 0
            } }
        ]

        return initialGridColumns
    }

    const processRowUpdate = async (updatedRow: UserType) => {
        return updatedRow
    }

    const toggleShowModal = () => {
        setIsAddingGuardian((cur) => !cur)
    }

    const handleRowClick = (id: string) => {
        navigate(`/app/guardians/${id}`)
    }

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box marginBottom='2rem' display='flex' flexDirection='row'>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h2'>
                        {t('guardians')}
                    </Typography>
                </Box>
                <Box padding='2rem' flex='1' display='flex' flexDirection='row' justifyContent='flex-end'>
                    <Button variant='contained' onClick={toggleShowModal}>
                        <Box display='flex' flexDirection='row'>
                            <AddCircleIcon />
                            <Box flex='1' marginLeft='1rem'>
                                <Typography>{t('addGuardian')}</Typography>
                            </Box>
                        </Box>
                    </Button>
                </Box>
            </Box>
            <GuardianDrawer open={!!activeGuardian} guardian={guardians.find((g: GuardianType) => g.id === activeGuardian)} />
            <CreateGuardianDialog createGuardian={createGuardianAction} isAddingGuardian={isAddingGuardian} cancel={toggleShowModal} />
            <Box sx={{ mb: '2rem' }}>
                <SearchBar onChange={changeSearchArg} fullWidth />
            </Box>
            <Box flex='1'>
                <Box sx={{ height: '100%', width: '100%' }}>
                    {guardians ?
                        <DataGrid
                            rows={guardians}
                            columns={generateGridColumns()}
                            rowHeight={100}
                            processRowUpdate={processRowUpdate}
                            onRowClick={(params) => handleRowClick(params.row.id)}
                        />
                        :
                        null
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default Guardians