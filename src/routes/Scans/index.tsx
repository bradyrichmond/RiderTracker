import { ScanType } from '@/types/ScanType'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box, Button, Tooltip, Typography } from '@mui/material'
import { useDeviceLocation } from '@/hooks/useDeviceLocation'
import { locationFactory } from './LocationFactory'
import { AppShortcut } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import CreateScanDialog from './CreateScanDialog'
import { useRiderStore } from '@/store/RiderStore'
import { useStopStore } from '@/store/StopStore'
import { useGuardianStore } from '@/store/GuardianStore'
import { RiderType } from '@/types/RiderType'
import { StopType } from '@/types/StopType'
import { GuardianType } from '@/types/UserType'
import { useScanStore } from '@/store/ScanStore'
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { useUserStore } from '@/store/UserStore'
import Grid from '@mui/material/Unstable_Grid2'

const Scans = () => {
    const [isAddingScan, setIsAddingScan] = useState(false)
    const { scans, updateScans, createScan } = useScanStore()
    const { riders, getRiders } = useRiderStore()
    const { stops, getStops } = useStopStore()
    const { guardians, getGuardians } = useGuardianStore()
    const heaviestRole = useUserStore().heaviestRole
    const navigate = useNavigate()
    const { getCurrentPosition } = useDeviceLocation()
    const { t } = useTranslation('scans')

    const createScanAction = async (newScan: ScanType) => {
        try {
            const fetchedLocation = await getCurrentPosition()
            const generatedLocation = locationFactory(fetchedLocation)
            const scanWithLocation = { ...newScan, deviceLocationOnSubmit: generatedLocation, manualScan: true }
            await createScan(scanWithLocation)
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
            } }
        ]

        return initialGridColumns
    }

    const allRiders = useMemo(() => riders.map((r: RiderType) => ({ id: r.id, label: `${r.firstName} ${r.lastName}` })), [riders])
    const allStops = useMemo(() => stops.map((s: StopType) => ({ id: s.id, label: s.stopName })), [stops])
    const allGuardians = useMemo(() => guardians.map((g: GuardianType) => ({ id: g.id, label: `${g.firstName} ${g.lastName}` })), [guardians])

    useEffect(() => {
        const updateData = async () => {
            await updateScans()
            await getRiders()
            await getStops()
            await getGuardians()
        }

        updateData()
    }, [updateScans, getRiders, getStops, getGuardians])

    const handleRowClick = (scanId: string) => {
        navigate(`/scans/${scanId}`)
    }

    const toggleAddingScan = () => {
        setIsAddingScan((current) => !current)
    }

    const processRowUpdate = async (updatedRow: ScanType) => {
        return updatedRow
    }

    return (
        <Grid container spacing={2}>
            <CreateScanDialog
                cancel={toggleAddingScan}
                isAddingScan={isAddingScan}
                createScan={createScanAction}
                allStops={allStops}
                allGuardians={allGuardians}
                allRiders={allRiders}
            />
            <Grid xs={12} md={6}>
                <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '1rem' }}>
                    <Typography variant='h2'>
                        {t('scans')}
                    </Typography>
                </Box>
            </Grid>
            <Grid xs={12} md={6}>
                <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.CREATE_SCAN) ?
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button variant='contained' onClick={toggleAddingScan}>
                                <Box display='flex' flexDirection='row'>
                                    <AddCircleIcon />
                                    <Box flex='1' marginLeft='1rem'>
                                        <Typography>{t('addScan')}</Typography>
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
                    {scans ?
                        <DataGrid
                            rows={scans}
                            columns={generateGridColumns()}
                            rowHeight={100}
                            processRowUpdate={processRowUpdate}
                            onRowClick={(params) => handleRowClick(params.row.id)}
                        />
                        :
                        null
                    }
                </Box>
            </Grid>
        </Grid>
    )
}

export default Scans