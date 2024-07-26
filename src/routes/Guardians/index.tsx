import { useNavigate } from 'react-router-dom'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useEffect, useMemo, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import CreateGuardianDialog from './CreateGuardianDialog'
import { useTranslation } from 'react-i18next'
import SearchBar from '@/components/SearchBar'
import GuardianDrawer from './GuardianDrawer'
import { useRiderStore } from '@/store/RiderStore'
import Grid from '@mui/material/Unstable_Grid2'
import { UpdateUserTypeInput, UserType } from '@/types/AmplifyTypes'
import { useUserStore } from '@/store/UserStore'

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
    const users = useUserStore().users
    const updateUsers = useUserStore().updateUsers
    const updateRiders = useRiderStore().updateRiders
    const navigate = useNavigate()
    const [isAddingGuardian, setIsAddingGuardian] = useState<boolean>(false)
    const { t } = useTranslation('guardians')

    useEffect(() => {
        updateUsers()
        updateRiders()
    }, [updateUsers, updateRiders])

    const guardians = useMemo(() => {
        const items = users.filter((u) => u.isGuardian)
        return items
    }, [users])

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

    const processRowUpdate = async (updatedRow: UpdateUserTypeInput) => {
        return updatedRow
    }

    const toggleShowModal = () => {
        setIsAddingGuardian((cur) => !cur)
    }

    const handleRowClick = (id: string) => {
        navigate(`/app/guardians/${id}`)
    }

    const handleSearchChange = async (val: string) => {
        console.log(`filter by ${val}`)
    }

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box>
                <Grid container spacing={2} sx={{ height: '100%' }}>
                    <GuardianDrawer open={!!activeGuardian} guardian={guardians.find((g: UserType) => g.id === activeGuardian)} />
                    <CreateGuardianDialog isAddingGuardian={isAddingGuardian} cancel={toggleShowModal} />
                    <Grid xs={12} md={6}>
                        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant='h2'>
                                {t('guardians')}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button variant='contained' onClick={toggleShowModal}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                        <AddCircleIcon />
                                        <Box sx={{ flex: 1, ml: 2 }}>
                                            <Typography>{t('addGuardian')}</Typography>
                                        </Box>
                                    </Box>
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ mb: 2 }}>
                <SearchBar onChange={handleSearchChange} fullWidth />
            </Box>
            <Box sx={{ width: '100%', flex: 1 }}>
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
        </Box>
    )
}

export default Guardians