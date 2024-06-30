import { Box, Button, Card, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useTranslation } from 'react-i18next'
import CreateAdminDialog from './CreateAdminDialog'

const OrganizationAdminSettings = () => {
    const [showModal, setShowModal] = useState(false)
    const { t } = useTranslation('settings')

    const toggleShowModal = () => {
        setShowModal((cur) => !cur)
    }

    const createNewAdmin = async () => {
        console.log('disabled create admin for now')
    }

    return (
        <Grid xs={12} sx={{ mb: 4 }}>
            <CreateAdminDialog isAddingAdmin={showModal} cancel={toggleShowModal} createAdmin={createNewAdmin} />
            <Card sx={{ p: 4 }}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={6}>
                        <Typography variant='h4' sx={{ pb: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {t('orgAdmins')}
                        </Typography>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                            <Button variant='contained' onClick={toggleShowModal}>
                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <AddCircleIcon />
                                    <Box sx={{ flex: 1, ml: 2 }}>
                                        <Typography>{t('addOrgAdmin')}</Typography>
                                    </Box>
                                </Box>
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid xs={12} md={6}>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

export default OrganizationAdminSettings