import { Avatar, Badge, Box, Card, Tooltip, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import FolderIcon from '@mui/icons-material/Folder'
import { useApiStore } from '@/store/ApiStore'
import UpdateProfileDataForm from './UpdateProfileDataForm'
import useFileUpload from '@/hooks/useFileUpload'
import { MB } from '@/constants/Numbers'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import { useTranslation } from 'react-i18next'
import { useOrgStore } from '@/store/OrgStore'
import { useUserStore } from '@/store/UserStore'

const ProfileSettings = () => {
    const getApi = useApiStore().getApi
    const { userId, userFullName, userPictureUrl, updateUserData } = useUserStore()
    const { orgId } = useOrgStore()
    const { t } = useTranslation('settings')

    const uploadFile = async (file: File) => {
        const api = await getApi()
        await api?.admin.updateUserProfileImage(orgId, userId, file, userId)
        await updateUserData()
    }

    const { openFileDialog, FileUpload, temporaryFileUrl } = useFileUpload({ uploadAction: uploadFile, sizeLimitInBytes: 10 * MB })

    return (
        <Grid xs={12} md={6}>
            <Card sx={{ p: '2rem' }}>
                <Typography variant='h4' sx={{ pb: '.5rem' }}>
                    {t('profileSettings')}
                </Typography>
                <Typography variant='subtitle1'>
                    {t('personalDetails')}
                </Typography>
                <Box display='flex' height='100%' flexDirection='column' sx={{ pt: '2rem' }}>
                    <Box sx={{ pb: '2rem' }} display='flex' justifyContent='center' alignItems='center' >
                        <Tooltip title={temporaryFileUrl ? t('fileNotUploaded', { ns: 'common' }) : t('changeProfilePicture', { ns: 'common' })}>
                            <Badge badgeContent={<PriorityHighIcon fontSize='large' />} invisible={!temporaryFileUrl} color='error' sx={{ '& .MuiBadge-badge': { padding: '0.5rem', borderRadius: '2rem', height: 'fit-content', width: 'fit-content' } }}>
                                <Avatar sx={{ height: 200, width: 200 }} onClick={openFileDialog} src={temporaryFileUrl || userPictureUrl} alt={userFullName}>
                                    <FolderIcon fontSize='large' />
                                </Avatar>
                            </Badge>
                        </Tooltip>
                    </Box>
                </Box>
                <FileUpload />
                <Box sx={{ pt: '1rem' }}>
                    <UpdateProfileDataForm />
                </Box>
            </Card>
        </Grid>
    )
}

export default ProfileSettings