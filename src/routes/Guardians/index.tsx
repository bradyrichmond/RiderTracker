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
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { useUserStore } from '@/store/UserStore'
import Grid from '@mui/material/Unstable_Grid2'

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
    const heaviestRole = useUserStore().heaviestRole
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
            { field: 'firstName', headerName: 'First Name', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'lastName', headerName: 'Last Name', flex: 1, align: 'center', headerAlign: 'center' },
            {
                field: 'riderIds', headerName: 'Riders', flex: 1, align: 'center', headerAlign: 'center', valueFormatter: (value: string[] | null) => {
                    return Array.isArray(value) ? value.filter((v) => v !== '').length : 0
                }
            }
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
        <Grid container spacing={2}>
            <GuardianDrawer open={!!activeGuardian} guardian={guardians.find((g: GuardianType) => g.id === activeGuardian)} />
            <CreateGuardianDialog createGuardian={createGuardianAction} isAddingGuardian={isAddingGuardian} cancel={toggleShowModal} />
            <Grid xs={12} md={6}>
                <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '1rem' }}>
                    <Typography variant='h2'>
                        {t('guardians')}
                    </Typography>
                </Box>
            </Grid>
            <Grid xs={12} md={6}>
                <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.CREATE_GUARDIAN) ?
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button variant='contained' onClick={toggleShowModal}>
                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <AddCircleIcon />
                                    <Box flex='1' marginLeft='1rem'>
                                        <Typography>{t('addGuardian')}</Typography>
                                    </Box>
                                </Box>
                            </Button>
                        </Box>
                        :
                        null
                    }
                </Box>
            </Grid>
            <Grid xs={12}>
                <Box sx={{ mb: '1rem' }}>
                    <SearchBar onChange={changeSearchArg} fullWidth />
                </Box>
            </Grid>
            <Grid xs>
                <Box sx={{ height: '100%', width: '100%' }}>
                    {guardians ?
                        <DataGrid
                            rows={guardians}
                            columns={generateGridColumns()}
                            rowHeight={100}
                            processRowUpdate={processRowUpdate}
                            onRowClick={(params) => handleRowClick(params.row.id)}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'lastName', sort: 'asc' }],
                                },
                            }}
                        />
                        :
                        null
                    }
                </Box>
            </Grid>
        </Grid>
    )
}

export default Guardians