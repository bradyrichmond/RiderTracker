import { ApiContext } from '@/contexts/ApiContextProvider'
import { Box, Button, Card, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useContext, useEffect, useState } from 'react'
import OrganizationAdminCard from './OrganizationAdminCard'
import AddEntityModal from '@/components/AddEntityModal'
import { userFactory } from '../UserSettings/UserFactory'
import { FormDataType } from '@/types/FormTypes'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { RIDER_TRACKER_ROLES } from '@/constants/Roles'
import { SnackbarContext } from '@/contexts/SnackbarContextProvider'
import { UserType } from '@/types/UserType'
import { AWSUserType } from '@/API/AdminApis'
import { useTranslation } from 'react-i18next'
import { useOrgStore } from '@/store/OrgStore'

const OrganizationAdminSettings = () => {
    const { orgId } = useOrgStore()
    const { api } = useContext(ApiContext)
    const { showErrorSnackbar } = useContext(SnackbarContext)
    const [ admins, setAdmins ] = useState<UserType[]>([])
    const [ showModal, setShowModal ] = useState(false)
    const { t } = useTranslation('settings')

    useEffect(() => {
        getAdmins()
    }, [orgId])

    const getAdmins = async () => {
        try {
            const { adminIds } = await api.organizations.getOrganizationById(orgId)

            if (adminIds) {
                const orgAdmins = await api.users.getBulkUsersByIds(orgId, adminIds)
                setAdmins(orgAdmins)
            }
        } catch {
            console.error('getadmins failed')
        }
    }

    const toggleShowModal = () => {
        setShowModal((cur) => !cur)
    }

    const modalFormInputs: FormDataType = {
        inputs: [
            { name: 'First Name' },
            { name: 'Last Name' },
            { name: 'Email' },
            { name: 'Title' }
        ]
    }

    const createNewAdmin = async (newAdmin: UserType) => {
        try {
            // TODO: Needs finer error management
            const cognitoUser: AWSUserType = await api.admin.createCognitoUser({
                given_name: newAdmin.firstName,
                family_name: newAdmin.lastName,
                email: newAdmin.email
            })
            const cognitoUsername = cognitoUser.User.Username

            await api.admin.addUserToGroup(cognitoUsername, RIDER_TRACKER_ROLES.RIDER_TRACKER_ORGADMIN)

            newAdmin.id = cognitoUsername
            const { adminIds } = await api.organizations.getOrganizationById(orgId)

            if (adminIds) {
                adminIds.push(cognitoUsername)
            }

            const admins  = adminIds || [cognitoUsername]

            await api.organizations.updateOrganization(orgId, { adminIds: admins })

            await api.admin.createUser(orgId, { ...newAdmin, orgId: orgId })

            getAdmins()
            toggleShowModal()
        } catch (e) {
            console.error(e)
            showCreateAdminErrorSnackbar()
        }
    }

    const showCreateAdminErrorSnackbar = () => {
        showErrorSnackbar(t('createAdminError'))
    }

    return (
        <Grid xs={12} marginBottom='2rem'>
            {modalFormInputs ?
                <AddEntityModal<UserType>
                    cancelAction={toggleShowModal}
                    entityFactory={userFactory}
                    submitAction={createNewAdmin}
                    titleSingular={'Organization Admin'}
                    formDefaultValues={modalFormInputs}
                    open={showModal}
                />
                :
                null
            }
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