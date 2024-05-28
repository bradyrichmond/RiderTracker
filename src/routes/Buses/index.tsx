import { BusType } from '@/types/BusType'
import { Box, Button, Tooltip, Typography } from '@mui/material'
import NoTransferIcon from '@mui/icons-material/NoTransfer'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/UserStore'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useBusStore } from '@/store/BusStore'

const Buses = () => {
    const { heaviestRole } = useUserStore()
    const { buses, updateBuses, deleteBus, createBus } = useBusStore()
    const { t } = useTranslation(['buses', 'common'])

    const deleteBusAction = async (busId: string) => {
        await deleteBus(busId)
        await updateBuses()
    }

    const createBusAction = async () => {
        await createBus()
    }

    const generateGridColumns = (): GridColDef[] => {
        const initialGridColumns: GridColDef[] = [
            { field: 'id',  headerName: 'ID', flex: 1, align: 'center', headerAlign: 'center' }
        ]

        if (RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.DELETE_BUS)) {
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
        }

        return initialGridColumns
    }

    const processRowUpdate = async (updatedRow: BusType) => {
        return updatedRow
    }

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box marginBottom='2rem' display='flex' flexDirection='row'>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h2'>
                        {t('drivers')}
                    </Typography>
                </Box>
                <Box padding='2rem' flex='1' display='flex' flexDirection='row' justifyContent='flex-end'>
                    <Button variant='contained' onClick={createBusAction}>
                        <Box display='flex' flexDirection='row'>
                            <AddCircleIcon />
                            <Box flex='1' marginLeft='1rem'>
                                <Typography>{t('addDriver')}</Typography>
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