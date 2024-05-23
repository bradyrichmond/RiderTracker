import EntityViewer from '@/components/EntityViewer'
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { useApiStore } from '@/store/ApiStore'
import { RoleContext } from '@/contexts/RoleContext'
import { ScanType } from '@/types/ScanType'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { scanFactory } from './ScanFactory'
import { GridColDef } from '@mui/x-data-grid'
import { Box, Button, Tooltip } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove'
import { OptionsType } from '@/types/FormTypes'
import { RiderType } from '@/types/RiderType'
import { useDeviceLocation } from '@/hooks/useDeviceLocation'
import { locationFactory } from './LocationFactory'
import { AppShortcut } from '@mui/icons-material'
import { UserType } from '@/types/UserType'
import { useOrgStore } from '@/store/OrgStore'

const Scans = () => {
    const [scans, setScans] = useState<ScanType[]>([])
    const [riders, setRiders] = useState<OptionsType[]>([])
    const [drivers, setDrivers] = useState<OptionsType[]>([])
    const { api } = useApiStore()
    const { heaviestRole } = useContext(RoleContext)
    const { orgId } = useOrgStore()
    const navigate = useNavigate()
    const { getCurrentPosition } = useDeviceLocation()

    useEffect(() => {
        updateAllRiders()
        updateAllDrivers()
        getScansAction()
    }, [orgId])

    const updateAllRiders = async () => {
        const riderData = await api.riders.getRiders(orgId)

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
        try {
            const { driverIds } = await api.organizations.getOrganizationById(orgId)

            if (driverIds) {
                const driverData = await api.users.getBulkUsersByIds(orgId, driverIds)

                try {
                    const mapped = driverData.map((r: UserType) => {
                        return { label: `${r.firstName} ${r.lastName}`, id: r.id }
                    })

                    setDrivers(mapped)
                } catch {
                    setDrivers([])
                }
            }
        } catch {
            console.error('update all drivers failed')
        }
    }

    const getScansAction = async () => {
        const scans = await api.scans.getScans(orgId)
        setScans(scans)
    }

    const viewScanDetails = (scanId: string) => {
        navigate(`/scans/${scanId}`)
    }

    const deleteScanAction = async (scanId: string) => {
        await api.scans.deleteScan(orgId, scanId)
    }

    const createScan = async (newScan: ScanType) => {
        try {
            const fetchedLocation = await getCurrentPosition()
            const generatedLocation = locationFactory(fetchedLocation)
            const scanWithLocation = { ...newScan, deviceLocationOnSubmit: generatedLocation, manualScan: true }
            await api.scans.createScan(orgId, scanWithLocation)
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
            } },
            { field: 'driverId',  headerName: 'Driver Id', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'riderCount',  headerName: 'Rider Count', flex: 1, align: 'center', headerAlign: 'center', renderCell: (params) => {
                const riderIds = params.row.riderIds ?? []

                return riderIds.length
            } },
            { field: 'deviceLocation',  headerName: 'Scan Location', flex: 1, align: 'center', headerAlign: 'center', renderCell: (params) => {
                const { lat, lon } = params.row.deviceLocationOnSubmit ?? { lat: '', lon: '' }

                return (!lat || !lon) ? 'Unknown' : `(${lat}, ${lon})`
            } },
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
            } }
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

    const processRowUpdate = async (updatedRow: ScanType) => {
        return updatedRow
    }

    return (
        <EntityViewer<ScanType>
                createEntity={RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.CREATE_SCAN) ? createScan : undefined}
                entityFactory={scanFactory}
                getEntities={getScansAction}
                modalFormInputs={{ inputs: [
                    { name: 'Driver', inputType: 'select', options: drivers },
                    { name: 'Rider', inputType: 'select', options: riders },
                    { name: 'Stop Id' }
                ] }}
                entities={scans}
                gridColumns={generateGridColumns()}
                titleSingular='Scan'
                titlePlural='Scans'
                processRowUpdate={processRowUpdate}
            />
    )
}

export default Scans