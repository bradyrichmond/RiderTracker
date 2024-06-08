import { SchoolType } from '@/types/SchoolType'
import { useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box, Button, Typography } from '@mui/material'
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/UserStore'
import SchoolDrawer from './SchoolDrawer'
import CreateSchoolDialog from './CreateSchoolDialog'
import { useSchoolStore } from '@/store/SchoolStore'
import { useAddressStore } from '@/store/AddressStore'
import { useRiderStore } from '@/store/RiderStore'
import Grid from '@mui/material/Unstable_Grid2'

interface SchoolsProps {
    activeSchool?: string
}

const Schools = ({ activeSchool }: SchoolsProps) => {
    const [isAddingSchool, setIsAddingSchool] = useState<boolean>(false)
    const { heaviestRole } = useUserStore()
    const { createSchool, getSchools, schools } = useSchoolStore()
    const addresses = useAddressStore().addresses
    const updateAddresses = useAddressStore().updateAddresses
    const getRiders = useRiderStore().getRiders
    const canEditSchool = RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.UPDATE_SCHOOL)
    const navigate = useNavigate()
    const { t } = useTranslation('schools')

    useEffect(() => {
        getSchools()
        updateAddresses()
        getRiders()
    }, [getSchools, updateAddresses, getRiders])

    const createSchoolAction = async (newSchool: SchoolType) => {
        await createSchool(newSchool)

        getSchools()
        updateAddresses()
    }

    const getFormattedAddressById = (addressId: string) => {
        return addresses.find((a) => a.id === addressId)?.formatted
    }

    const generateGridColumns = (): GridColDef[] => {
        const initialGridColumns: GridColDef[] = [
            {
                field: 'schoolName',
                headerName: 'School Name',
                flex: 1,
                align: 'center',
                headerAlign: 'center',
                editable: canEditSchool
            },
            {
                field: 'address',
                headerName: 'Address',
                flex: 1, align: 'center',
                headerAlign: 'center',
                valueGetter: (value: string) => getFormattedAddressById(value)
            }
        ]

        return initialGridColumns
    }

    const processRowUpdate = async (_updatedRow: SchoolType, originalRow: SchoolType) => {
        return originalRow
    }

    const handleRowClick = (id: string) => {
        navigate(`/app/schools/${id}`)
    }

    const toggleAddingSchool = () => {
        setIsAddingSchool((current) => !current)
    }

    return (
        <Grid container spacing={2}>
            <SchoolDrawer open={!!activeSchool} school={schools.find((s: SchoolType) => s.id === activeSchool)} />
            <CreateSchoolDialog createSchool={createSchoolAction} cancelAction={toggleAddingSchool} open={isAddingSchool} />
            <Grid xs={12} md={6}>
                <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                    <Typography variant='h2'>
                        {t('schools')}
                    </Typography>
                </Box>
            </Grid>
            <Grid xs={12} md={6}>
                <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.CREATE_SCHOOL) ?
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button variant='contained' onClick={toggleAddingSchool}>
                                <Box display='flex' flexDirection='row'>
                                    <AddCircleIcon />
                                    <Box sx={{ flex: 1, ml: 2 }}>
                                        <Typography>{t('addSchool')}</Typography>
                                    </Box>
                                </Box>
                            </Button>
                        </Box>
                        :
                        null
                    }
                </Box>
            </Grid>
            <Grid xs>
                <Box sx={{ height: '100%', width: '100%' }}>
                    {schools ?
                        <DataGrid
                            rows={schools}
                            columns={generateGridColumns()}
                            rowHeight={100}
                            processRowUpdate={processRowUpdate}
                            onRowClick={(params) => handleRowClick(params.row.id)}
                            initialState={{
                                sorting: {
                                  sortModel: [{ field: 'schoolName', sort: 'asc' }],
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

export default Schools