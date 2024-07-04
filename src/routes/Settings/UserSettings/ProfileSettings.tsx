import { Avatar, Badge, Box, Card, Tooltip, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import FolderIcon from '@mui/icons-material/Folder'
import UpdateProfileDataForm from './UpdateProfileDataForm'
import useFileUpload from '@/hooks/useFileUpload'
import { MB } from '@/constants/Numbers'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/UserStore'

const ProfileSettings = () => {
    const updateUserData = useUserStore().updateUserData
    const currentUser = useUserStore().currentUser
    const { t } = useTranslation('settings')

    const uploadFile = async () => {
        // TODO: handle file upload
        await updateUserData()
    }

    const { openFileDialog, FileUpload, temporaryFileUrl } = useFileUpload({ uploadAction: uploadFile, sizeLimitInBytes: 10 * MB })

    return (
        <Grid xs={12} md={6}>
            <Card sx={{ p: 4 }}>
                <Typography variant='h4' sx={{ pb: 1 }}>
                    {t('profileSettings')}
                </Typography>
                <Typography variant='subtitle1'>
                    {t('personalDetails')}
                </Typography>
                <Box display='flex' height='100%' flexDirection='column' sx={{ pt: 4 }}>
                    <Box sx={{ pb: 4 }} display='flex' justifyContent='center' alignItems='center' >
                        <Tooltip title={temporaryFileUrl ? t('fileNotUploaded', { ns: 'common' }) : t('changeProfilePicture', { ns: 'common' })}>
                            <Badge badgeContent={<PriorityHighIcon fontSize='large' />} invisible={!temporaryFileUrl} color='error' sx={{ '& .MuiBadge-badge': { padding: 1, borderRadius: 4, height: 'fit-content', width: 'fit-content' } }}>
                                <Avatar sx={{ height: 200, width: 200 }} onClick={openFileDialog} src={temporaryFileUrl} alt={`${currentUser?.firstName} ${currentUser?.lastName}`}>
                                    <FolderIcon fontSize='large' />
                                </Avatar>
                            </Badge>
                        </Tooltip>
                    </Box>
                </Box>
                <FileUpload />
                <Box sx={{ pt: 2 }}>
                    <UpdateProfileDataForm />
                </Box>
            </Card>
        </Grid>
    )
}

export default ProfileSettings