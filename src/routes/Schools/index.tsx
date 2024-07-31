import { useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SchoolDrawer from './SchoolDrawer'
import CreateSchoolDialog from './CreateSchoolDialog'
import { SelectionSetSchool, useSchoolStore } from '@/store/SchoolStore'
import { useRiderStore } from '@/store/RiderStore'
import Grid from '@mui/material/Unstable_Grid2'

interface SchoolsProps {
    activeSchool?: string
}

const Schools = ({ activeSchool }: SchoolsProps) => {
    const [isAddingSchool, setIsAddingSchool] = useState<boolean>(false)
    const updateSchools = useSchoolStore().updateSchools
    const schools = useSchoolStore().schools
    const updateRiders = useRiderStore().updateRiders
    const navigate = useNavigate()
    const { t } = useTranslation('schools')

    useEffect(() => {
        updateSchools()
        updateRiders()
    }, [updateSchools, updateRiders])

    const generateGridColumns = (): GridColDef[] => {
        const initialGridColumns: GridColDef[] = [
            {
                field: 'schoolName',
                headerName: 'School Name',
                flex: 1,
                align: 'center',
                headerAlign: 'center'
            },
            {
                field: 'address',
                headerName: 'Address',
                flex: 1, align: 'center',
                headerAlign: 'center',
                valueGetter: (value: { formatted: string }) => value.formatted
            }
        ]

        return initialGridColumns
    }

    const handleRowClick = (id: string) => {
        navigate(`/app/schools/${id}`)
    }

    const toggleAddingSchool = () => {
        setIsAddingSchool((current) => !current)
        updateSchools()
    }

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box>
                <Grid container spacing={2} sx={{ height: '100%' }}>
                    <SchoolDrawer open={!!activeSchool} school={schools.find((s: SelectionSetSchool) => s.id === activeSchool)} />
                    <CreateSchoolDialog cancelAction={toggleAddingSchool} open={isAddingSchool} />
                    <Grid xs={12} md={6}>
                        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                            <Typography variant='h2'>
                                {t('schools')}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button variant='contained' onClick={toggleAddingSchool}>
                                    <Box display='flex' flexDirection='row'>
                                        <AddCircleIcon />
                                        <Box sx={{ flex: 1, ml: 2 }}>
                                            <Typography>{t('addSchool')}</Typography>
                                        </Box>
                                    </Box>
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Grid xs>
                <Box sx={{ height: '100%', width: '100%' }}>
                    {schools ?
                        <DataGrid
                            rows={schools}
                            columns={generateGridColumns()}
                            rowHeight={100}
                            onRowClick={(params) => handleRowClick(params.row.id)}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'schoolName', sort: 'asc' }],
                                },
                            }}
                        />
                        :
                        <CircularProgress />
                    }
                </Box>
            </Grid>
        </Box >
    )
}

export default Schools