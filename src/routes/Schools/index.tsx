import { SchoolType } from '@/types/SchoolType'
import { useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box, Button, Typography } from '@mui/material'
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AddressType } from '@/types/AddressType'
import { useUserStore } from '@/store/UserStore'
import SchoolDrawer from './SchoolDrawer'
import CreateSchoolDialog from './CreateSchoolDialog'
import { useSchoolStore } from '@/store/SchoolStore'
import { useAddressStore } from '@/store/AddressStore'

interface SchoolsProps {
    activeSchool?: string
}

const Schools = ({ activeSchool }: SchoolsProps) => {
    const [isAddingSchool, setIsAddingSchool] = useState<boolean>(false)
    const [addresses, setAddresses] = useState<AddressType[]>([])
    const { heaviestRole } = useUserStore()
    const { createSchool, getSchools, schools } = useSchoolStore()
    const { getBulkAddressesById } = useAddressStore()
    const canEditSchool = RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.UPDATE_SCHOOL)
    const navigate = useNavigate()
    const { t } = useTranslation('schools')

    useEffect(() => {
        const updateSchools = async () => {
            getSchools()
            const addressIds = schools.map((s: SchoolType) => s.address)

            if (addressIds) {
                const fetchedAddresses = await getBulkAddressesById(addressIds)
                setAddresses(fetchedAddresses ?? [])
            }
        }

        updateSchools()
    }, [getBulkAddressesById, getSchools, schools])

    const createSchoolAction = async (newSchool: SchoolType) => {
        await createSchool(newSchool)

        getSchools()
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
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box marginBottom='2rem' display='flex' flexDirection='row'>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h2'>
                        {t('schools')}
                    </Typography>
                </Box>
                <Box padding='2rem' flex='1' display='flex' flexDirection='row' justifyContent='flex-end'>
                    <Button variant='contained' onClick={toggleAddingSchool}>
                        <Box display='flex' flexDirection='row'>
                            <AddCircleIcon />
                            <Box flex='1' marginLeft='1rem'>
                                <Typography>{t('addSchool')}</Typography>
                            </Box>
                        </Box>
                    </Button>
                </Box>
            </Box>
            <SchoolDrawer open={!!activeSchool} schoolId={activeSchool ?? ''} />
            <CreateSchoolDialog createSchool={createSchoolAction} cancelAction={toggleAddingSchool} open={isAddingSchool} />
            <Box flex='1'>
                <Box sx={{ height: '100%', width: '100%' }}>
                    {schools ?
                        <DataGrid
                            rows={schools}
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

export default Schools