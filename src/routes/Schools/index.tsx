import EntityViewer from "@/components/EntityViewer"
import { ApiContext } from "@/contexts/ApiContextProvider"
import { SchoolType } from "@/types/SchoolType"
import { useContext, useEffect, useState } from "react"
import { schoolFactory } from "./SchoolFactory"
import { GridColDef } from "@mui/x-data-grid"
import { Button, Tooltip } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info'
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from "@/constants/Roles"
import { RoleContext } from "@/contexts/RoleContextProvider"
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import { SnackbarContext } from "@/contexts/SnackbarContextProvider"
import { useTranslation } from 'react-i18next'
import { AddressType } from "@/types/AddressType"
import { OrgDataContext } from "@/contexts/OrgDataContext"

const Schools = () => {
    const [schools, setSchools] = useState<SchoolType[]>([])
    const [addresses, setAddresses] = useState<AddressType[]>([])
    const { api } = useContext(ApiContext)
    const { heaviestRole } = useContext(RoleContext)
    const { orgId } = useContext(OrgDataContext)
    const { setSnackbarSeverity, setSnackbarVisibilityMs, setSnackbarMessage } = useContext(SnackbarContext)
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
            const fetchedSchools = await api.schools.getSchools(orgId)
            const addressIds = fetchedSchools.map((s: SchoolType) => s.address)
            const fetchedAddresses = await api.addresses.getBulkAddressesByIds(orgId, addressIds)
            setAddresses(fetchedAddresses)
            setSchools(fetchedSchools)
        }
    }

    const createSchoolAction = async (newSchool: SchoolType) => {
        const validatedAddress = await api.addresses.validateAddress(newSchool.address)
        
        if (validatedAddress) {
            const newUuid = uuidv4()
            validatedAddress.id = newUuid
            await api.addresses.createAddress(orgId, validatedAddress)

            newSchool.address = validatedAddress.id
            await api.schools.createSchool(orgId, newSchool)

            updateSchools()
        } else {
            console.error('Failed to create school due to bad address.')
        }
    }

    const getFormattedAddressById = (addressId: string) => {
        return addresses.find((a) => a.id === addressId)?.formatted
    }

    const viewSchoolDetails = (schoolId: string) => {
        navigate(`/schools/${schoolId}`)
    }

    const deleteSchoolAction = async (schoolId: string) => {
        await api.schools.deleteSchool(orgId, schoolId)
        updateSchools()
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
                valueGetter: (value: string) => getFormattedAddressById(value)},
            { field: 'viewDetails', headerName: '', flex: 1, align: 'center', headerAlign: 'center', renderCell: (params) => {
                return (
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => viewSchoolDetails(params.row.id)}
                    >
                        <Tooltip title='View Details'>
                            <InfoIcon />
                        </Tooltip>
                    </Button>
                )
            }}
        ]

        if (RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.DELETE_SCHOOL)) {
            initialGridColumns.push({
                field: 'delete', headerName: '', flex: 1, align: 'center', headerAlign: 'center', renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => deleteSchoolAction(params.row.id)}
                        >
                            <Tooltip title='Delete School?'>
                                <IndeterminateCheckBoxIcon />
                            </Tooltip>
                        </Button>
                    )
                }
            })
        }

        return initialGridColumns
    }

    const processRowUpdate = async (updatedRow: SchoolType, originalRow: SchoolType) => {
        try {
            if (updatedRow !== originalRow) {
                await api.schools.updateSchool(orgId, originalRow.id, updatedRow)
                await updateSchools()
            }

            return updatedRow
        } catch {
            showUpdateError()
            return originalRow
        }
    }

    const showUpdateError = () => {
        setSnackbarSeverity('error')
        setSnackbarVisibilityMs(5000)
        setSnackbarMessage(t('schoolUpdateError'))
    }

    return (
        <EntityViewer<SchoolType>
            createEntity={RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.CREATE_SCHOOL) ? createSchoolAction : undefined}
            entities={schools}
            entityFactory={schoolFactory}
            getEntities={updateSchools}
            gridColumns={generateGridColumns()}
            processRowUpdate={processRowUpdate}
            modalFormInputs={{
                inputs: [
                    {
                        name: 'School Name'
                    },
                    {
                        name: 'Address',
                        inputType: 'address'
                    }
                ]
            }}
            titleSingular="School"
            titlePlural="Schools"
        />
    )
}

export default Schools