import { BusType } from '@/types/BusType'
import { Box, Button, Tooltip, Typography } from '@mui/material'
import NoTransferIcon from '@mui/icons-material/NoTransfer'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useBusStore } from '@/store/BusStore'
import { useEffect } from 'react'

const Buses = () => {
    const { buses, updateBuses, deleteBus, createBus } = useBusStore()
    const { t } = useTranslation(['buses', 'common'])

    useEffect(() => {
        updateBuses()
    }, [updateBuses])

    const deleteBusAction = async (busId: string) => {
        await deleteBus(busId)
        await updateBuses()
    }

    const createBusAction = async () => {
        // Need to add form for this, and unique bus identifications
        await createBus('42')
    }

    const generateGridColumns = (): GridColDef[] => {
        const initialGridColumns: GridColDef[] = [
            { field: 'id', headerName: 'ID', flex: 1, align: 'center', headerAlign: 'center' }
        ]

        initialGridColumns.push({
            field: 'delete',
            headerName: '',
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => deleteBusAction(params.row.id)}
                    >
                        <Tooltip title='Delete Bus?'>
                            <NoTransferIcon />
                        </Tooltip>
                    </Button>
                )
            }
        })

        return initialGridColumns
    }

    const processRowUpdate = async (updatedRow: BusType) => {
        return updatedRow
    }

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 4, display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant='h2'>
                        {t('buses')}
                    </Typography>
                </Box>
                <Box sx={{ p: 4, flex: 1, display: 'flex', justifyContent: 'flex-end', flexDirection: 'row' }}>
                    <Button variant='contained' onClick={createBusAction}>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <AddCircleIcon />
                            <Box sx={{ flex: 1, ml: 2 }}>
                                <Typography>{t('addBus')}</Typography>
                            </Box>
                        </Box>
                    </Button>
                </Box>
            </Box>
            <Box flex='1'>
                <Box sx={{ height: '100%', width: '100%' }}>
                    {buses ?
                        <DataGrid
                            rows={buses}
                            columns={generateGridColumns()}
                            rowHeight={100}
                            processRowUpdate={processRowUpdate}
                        />
                        :
                        null
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default Buses