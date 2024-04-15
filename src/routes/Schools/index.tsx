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
import { useNavigate, useParams } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

const Schools = () => {
    const [schools, setSchools] = useState<SchoolType[]>([])
    const { api } = useContext(ApiContext)
    const { heaviestRole } = useContext(RoleContext)
    const navigate = useNavigate()
    const { id: organizationId } = useParams()

    useEffect(() => {
        updateSchools()
    }, [])

    const updateSchools = async () => {
        const fetchedSchools = await api.execute(organizationId ? api.schools.getSchoolsForOrganization : api.schools.getSchools, [organizationId])
        setSchools(fetchedSchools)
    }

    const createSchoolAction = async (newSchool: SchoolType) => {
        const validatedAddress = await api.execute(api.addresses.validateAddress, [newSchool.address])
        
        if (!!validatedAddress) {
            const newUuid = uuidv4()
            validatedAddress.id = newUuid;
            await api.execute(api.addresses.createAddress, [validatedAddress])

            newSchool.address = validatedAddress.id
            newSchool.riders = [""]
            await api.execute(api.schools.createSchool, [newSchool])

            updateSchools()
        } else {
            console.error('Failed to create school due to bad address.')
        }
    }

    const viewSchoolDetails = (schoolId: string) => {
        navigate(`/schools/${schoolId}`)
    }

    const deleteSchoolAction = async (schoolId: string) => {
        await api.execute(api.schools.deleteSchool, [schoolId])
        updateSchools()
    }

    const generateGridColumns = (): GridColDef[] => {
        const initialGridColumns: GridColDef[] = [
            { field: 'schoolName',  headerName: 'School Name', flex: 1 },
            { field: 'address',  headerName: 'Address', flex: 1 },
            { field: 'viewDetails', headerName: '', flex: 1, renderCell: (params) => {
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
                field: 'delete', headerName: '', flex: 1, renderCell: (params) => {
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

    return (
        <EntityViewer<SchoolType>
            createEntity={createSchoolAction}
            entities={schools}
            entityFactory={schoolFactory}
            getEntities={updateSchools}
            gridColumns={generateGridColumns()}
            modalFormInputs={{
                inputs: [
                    { 
                        name: "Organization Id",
                        inputType: "select" 
                    },
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