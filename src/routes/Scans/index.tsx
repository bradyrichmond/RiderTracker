import EntityViewer from "@/components/EntityViewer"
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from "@/constants/Roles"
import { ApiContext } from "@/contexts/ApiContextProvider"
import { RoleContext } from "@/contexts/RoleContextProvider"
import { ScanType } from "@/types/ScanType"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { scanFactory } from './ScanFactory'
import { GridColDef } from "@mui/x-data-grid"
import { Box, Button, Tooltip } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info'
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove'
import { OptionsType } from "@/types/FormTypes"
import { RiderType } from "@/types/RiderType"
import { DriverType } from "@/types/DriverType"
import { useDeviceLocation } from "@/hooks/useDeviceLocation"
import { locationFactory } from "./LocationFactory"
import { AppShortcut } from "@mui/icons-material"

const Scans = () => {
    const [scans, setScans] = useState<ScanType[]>([])
    const [riders, setRiders] = useState<OptionsType[]>([])
    const [drivers, setDrivers] = useState<OptionsType[]>([])
    const { api } = useContext(ApiContext)
    const { heaviestRole } = useContext(RoleContext)
    const { id: organizationId } = useParams()
    const navigate = useNavigate()
    const { getCurrentPosition } = useDeviceLocation()

    useEffect(() => {
        updateAllRiders()
        updateAllDrivers()
    }, [organizationId])

    const updateAllRiders = async () => {
        const riderData = await api.execute(organizationId ? api.riders.getRidersForOrganization : api.riders.getRiders, [organizationId])

        try {
            const mapped = riderData.map((r: RiderType) => {
                return { label: `${r.firstName} ${r.lastName}`, id: r.id }
            })
            
            setRiders(mapped)
        } catch {
            setRiders([])
        }
    }

    const updateAllDrivers = async () => {
        const driverData = await api.execute(organizationId ? api.drivers.getDriversForOrganization : api.drivers.getDrivers, [organizationId])

        try {
            const mapped = driverData.map((r: DriverType) => {
                return { label: `${r.firstName} ${r.lastName}`, id: r.id }
            })
            
            setDrivers(mapped)
        } catch {
            setDrivers([])
        }
    }

    const getScansFunction = (organizationId) ? api.scans.getScansForOrganization : api.scans.getScans

    const getScansAction = async (id?: string) => {
        const scans = await api.execute(getScansFunction, [id ?? ''])
        setScans(scans)
    }

    const viewScanDetails = (scanId: string) => {
        navigate(`/scans/${scanId}`)
    }

    const deleteScanAction = async (scanId: string) => {
        await api.execute(api.scans.deleteScan, [scanId])
    }

    const createScan = async (newScan: ScanType) => {
        try {
            const fetchedLocation = await getCurrentPosition()
            const generatedLocation = locationFactory(fetchedLocation)
            const scanWithLocation = { ...newScan, deviceLocationOnSubmit: generatedLocation, manualScan: true }
            await api.execute(api.scans.createScan, [scanWithLocation])
        } catch (e) {
            console.log(e)
        }
    }

    const generateGridColumns = (): GridColDef[] => {
        const initialGridColumns: GridColDef[] = [
            { field: 'stopId',  headerName: 'Stop Id', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'manualScan', headerName: '', renderCell: (params) => {
                return  (
                    <>
                        {params.row.manualScan ?
                            <Box height='100%' width='100%' display='flex' justifyContent='center' alignItems='center'>
                                <Tooltip title='Manually entered scan'>
                                    <AppShortcut />
                                </Tooltip>
                            </Box>
                            :
                            null
                        }
                    </>
                )
            }},
            { field: 'driverId',  headerName: 'Driver Id', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'riderCount',  headerName: 'Rider Count', flex: 1, align: 'center', headerAlign: 'center', renderCell: (params) => {
                const riderIds = params.row.riderIds ?? []

                return riderIds.length
            }},
            { field: 'deviceLocation',  headerName: 'Scan Location', flex: 1, align: 'center', headerAlign: 'center', renderCell: (params) => {
                const { lat, lon } = params.row.deviceLocationOnSubmit ?? { lat: '', lon: '' }

                return (!lat || !lon) ? 'Unknown' : `(${lat}, ${lon})`
            }},
            { field: 'viewDetails', headerName: '', align: 'center', headerAlign: 'center', renderCell: (params) => {
                return (
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => viewScanDetails(params.row.id)}
                    >
                        <Tooltip title='View Details'>
                            <InfoIcon />
                        </Tooltip>
                    </Button>
                )
            }}
        ]

        if (RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.DELETE_SCAN)) {
            initialGridColumns.push({
                field: 'delete', headerName: '', align: 'center', headerAlign: 'center', renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => deleteScanAction(params.row.id)}
                        >
                            <Tooltip title='Delete Scan?'>
                                <PlaylistRemoveIcon />
                            </Tooltip>
                        </Button>
                    )
                }
            })
        }

        return initialGridColumns
    }

    return (
        <>
            {riders.length > 0 && drivers.length > 0 ?
                <EntityViewer<ScanType>
                    createEntity={RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.CREATE_SCAN) ? createScan : undefined}
                    entityFactory={scanFactory}
                    getEntities={getScansAction}
                    modalFormInputs={{inputs: [
                        { name: "Organization Id", inputType: "select" },
                        { name: "Driver", inputType: "select", options: drivers },
                        { name: "Rider", inputType: "select", options: riders },
                        { name: "Stop Id" }
                    ]}}
                    entities={scans}
                    gridColumns={generateGridColumns()}
                    titleSingular='Scan'
                    titlePlural='Scans'
                />
                :
                null
            }
        </>
    )
}

export default Scans