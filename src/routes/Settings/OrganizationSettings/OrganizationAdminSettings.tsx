import { Box, Button, Card, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useEffect, useState } from 'react'
import OrganizationAdminCard from './OrganizationAdminCard'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { CreateCognitoUserParams } from '@/API/AdminApis'
import { useTranslation } from 'react-i18next'
import CreateAdminDialog from './CreateAdminDialog'
import { useAdminStore } from '@/store/AdminStore'

const OrganizationAdminSettings = () => {
    const { admins, updateAdmins, createAdmin } = useAdminStore()
    const [showModal, setShowModal] = useState(false)
    const { t } = useTranslation('settings')

    useEffect(() => {
        updateAdmins()
    }, [updateAdmins])

    const toggleShowModal = () => {
        setShowModal((cur) => !cur)
    }

    const createNewAdmin = async (newAdmin: CreateCognitoUserParams) => {
        await createAdmin(newAdmin)
    }

    return (
        <Grid xs={12} marginBottom='2rem'>
            <CreateAdminDialog isAddingAdmin={showModal} cancel={toggleShowModal} createAdmin={createNewAdmin} />
            <Card sx={{ p: '2rem' }}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={6}>
                        <Typography variant='h4' sx={{ pb: '.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                        {admins.length > 0 ?
                            admins.map((a, idx) => <OrganizationAdminCard
                                key={a.id}
                                id={a.id}
                                orgId={a.orgId}
                                firstName={a.firstName}
                                lastName={a.lastName}
                                email={a.email}
                                title={a.title}
                                createdBy={a.createdBy}
                                createdDate={a.createdDate}
                                lastEditedBy={a.lastEditedBy}
                                lastEditDate={a.lastEditDate}
                                index={idx}
                            />)
                            :
                            null
                        }
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

export default OrganizationAdminSettings