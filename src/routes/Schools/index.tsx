import { useApiStore } from '@/store/ApiStore'
import { SchoolType } from '@/types/SchoolType'
import { useContext, useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box, Button, Typography } from '@mui/material'
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { SnackbarContext } from '@/contexts/SnackbarContextProvider'
import { useTranslation } from 'react-i18next'
import { AddressType } from '@/types/AddressType'
import { useOrgStore } from '@/store/OrgStore'
import { useUserStore } from '@/store/UserStore'
import SchoolDrawer from './SchoolDrawer'
import CreateSchoolDialog from './CreateSchoolDialog'

interface SchoolsProps {
    activeSchool?: string
}

const Schools = ({ activeSchool }: SchoolsProps) => {
    const [isAddingSchool, setIsAddingSchool] = useState<boolean>(false)
    const [schools, setSchools] = useState<SchoolType[]>([])
    const [addresses, setAddresses] = useState<AddressType[]>([])
    const { api } = useApiStore()
    const { heaviestRole } = useUserStore()
    const { orgId } = useOrgStore()
    const { showErrorSnackbar } = useContext(SnackbarContext)
    const canEditSchool = RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.UPDATE_SCHOOL)
    const navigate = useNavigate()
    const { t } = useTranslation('schools')

    useEffect(() => {
        updateSchools()

        return () => {
            setSchools([])
        }
    }, [])

    const updateSchools = async () => {
        if (orgId) {
            const fetchedSchools = await api?.schools.getSchools(orgId)
            const addressIds = fetchedSchools?.map((s: SchoolType) => s.address)

            if (addressIds) {
                const fetchedAddresses = await api?.addresses.getBulkAddressesByIds(orgId, addressIds)
                setAddresses(fetchedAddresses ?? [])
                setSchools(fetchedSchools ?? [])
            }
        }
    }

    const createSchoolAction = async (newSchool: SchoolType) => {
        const validatedAddress = await api?.addresses.validateAddress(newSchool.address)

        if (validatedAddress) {
            const newUuid = uuidv4()
            validatedAddress.id = newUuid
            await api?.addresses.createAddress(orgId, validatedAddress)

            newSchool.address = validatedAddress.id
            await api?.schools.createSchool(orgId, newSchool)

            updateSchools()
        } else {
            console.error('Failed to create school due to bad address.')
        }
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

    const processRowUpdate = async (updatedRow: SchoolType, originalRow: SchoolType) => {
        try {
            if (updatedRow !== originalRow) {
                await api?.schools.updateSchool(orgId, originalRow.id, updatedRow)
                await updateSchools()
            }

            return updatedRow
        } catch {
            showUpdateError()
            return originalRow
        }
    }

    const showUpdateError = () => {
        showErrorSnackbar(t('schoolUpdateError'))
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