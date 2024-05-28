import { Box, Button, Card, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useEffect, useState } from 'react'
import OrganizationAdminCard from './OrganizationAdminCard'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { CreateCognitoUserParams } from '@/API/AdminApis'
import { useTranslation } from 'react-i18next'
import { useOrgStore } from '@/store/OrgStore'
import CreateAdminDialog from './CreateAdminDialog'
import { useAdminStore } from '@/store/AdminStore'

const OrganizationAdminSettings = () => {
    const { orgId } = useOrgStore()
    const { admins, updateAdmins, createAdmin } = useAdminStore()
    const [ showModal, setShowModal ] = useState(false)
    const { t } = useTranslation('settings')

    useEffect(() => {
        getAdmins()
    }, [orgId])

    const getAdmins = async () => {
        await updateAdmins()
    }

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
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography variant='h4' sx={{ pb: '.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {t('orgAdmins')}
                    </Typography>
                    <Box padding='2rem' flex='1' display='flex' flexDirection='row' justifyContent='flex-end'>
                        <Button variant='contained' onClick={toggleShowModal}>
                            <Box display='flex' flexDirection='row'>
                                <AddCircleIcon />
                                <Box flex='1' marginLeft='1rem'>
                                    <Typography>{t('addOrgAdmin')}</Typography>
                                </Box>
                            </Box>
                        </Button>
                    </Box>
                </Box>
                    {admins.length > 0 ?
                        admins.map((a, idx) => <OrganizationAdminCard
                                key={a.id}
                                id={a.id}
                                orgId={a.orgId}
                                firstName={a.firstName}
                                lastName={a.lastName}
                                email={a.email}
                                title={a.title}
                                index={idx}
                                refreshAdmins={getAdmins}
                            />)
                        :
                        null
                    }
            </Card>
        </Grid>
    )
}

export default OrganizationAdminSettings