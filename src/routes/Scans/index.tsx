import { RiderType, ScanType, StopType, UserType } from '@/types/AmplifyTypes'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box, Button, Tooltip, Typography } from '@mui/material'
import { useDeviceLocation } from '@/hooks/useDeviceLocation'
import { AppShortcut } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import CreateScanDialog from './CreateScanDialog'
import { useRiderStore } from '@/store/RiderStore'
import { useStopStore } from '@/store/StopStore'
import { useScanStore } from '@/store/ScanStore'
import Grid from '@mui/material/Unstable_Grid2'
import { useUserStore } from '@/store/UserStore'

const Scans = () => {
    const [isAddingScan, setIsAddingScan] = useState(false)
    const scans = useScanStore().scans
    const updateScans = useScanStore().updateScans
    const createScan = useScanStore().createScan
    const riders = useRiderStore().riders
    const updateRiders = useRiderStore().updateRiders
    const stops = useStopStore().stops
    const getStops = useStopStore().getStops
    const users = useUserStore().users
    const updateUsers = useUserStore().updateUsers
    const navigate = useNavigate()
    const { getCurrentPosition } = useDeviceLocation()
    const { t } = useTranslation('scans')

    const createScanAction = async (newScan: ScanType) => {
        try {
            const [lat, lon] = await getCurrentPosition()
            const scanWithLocation = { ...newScan, deviceLocationOnSubmit: { lat: lat.toString(), lon: lon.toString() }, manualScan: true }
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

    const guardians = useMemo(() => {
        if (users) {
            return users.filter((u) => u.isGuardian)
        }

        return []
    }, [users])
    const allRiders = useMemo(() => riders.map((r: RiderType) => ({ id: r.id, label: `${r.firstName} ${r.lastName}` })), [riders])
    const allStops = useMemo(() => stops.map((s: StopType) => ({ id: s.id, label: s.name })), [stops])
    const allGuardians = useMemo(() => guardians.map((g: UserType) => ({ id: g.id, label: `${g.firstName} ${g.lastName}` })), [guardians])

    useEffect(() => {
        const updateData = async () => {
            await updateScans()
            await updateRiders()
            await getStops()
            await updateUsers()
        }

        updateData()
    }, [updateScans, updateRiders, getStops, updateUsers])

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
                <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                    <Typography variant='h2'>
                        {t('scans')}
                    </Typography>
                </Box>
            </Grid>
            <Grid xs={12} md={6}>
                <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button variant='contained' onClick={toggleAddingScan}>
                            <Box display='flex' flexDirection='row'>
                                <AddCircleIcon />
                                <Box sx={{ flex: 1, ml: 2 }}>
                                    <Typography>{t('addScan')}</Typography>
                                </Box>
                            </Box>
                        </Button>
                    </Box>
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