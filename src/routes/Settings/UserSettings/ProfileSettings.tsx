import { Avatar, Badge, Box, Card, CircularProgress, Tooltip, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import FolderIcon from '@mui/icons-material/Folder'
import UpdateProfileDataForm from './UpdateProfileDataForm'
import useFileUpload from '@/hooks/useFileUpload'
import { MB } from '@/constants/Numbers'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/UserStore'
import { TransferProgressEvent, uploadData } from 'aws-amplify/storage'
import { S3Paths } from '@/constants/S3Paths'
import { useState } from 'react'

const ProfileSettings = () => {
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [uploadProgress, setUploadProgress] = useState<number>(0)
    const updateUserData = useUserStore().updateUserData
    const currentUser = useUserStore().currentUser
    const userProfileImageUrl = useUserStore().userProfileImageUrl
    const { t } = useTranslation('settings')

    const handleFileUploadProgress = ({ transferredBytes, totalBytes }: TransferProgressEvent) => {
        if (totalBytes) {
            const currentProgress = (transferredBytes / totalBytes) * 100
            setUploadProgress(currentProgress)

            if (currentProgress >= 100) {
                updateUserData()
                setIsUploading(false)
            }
        }
    }

    const handleUploadFile = async (file: File) => {
        if (currentUser?.id) {
            setIsUploading(true)

            uploadData({
                path: `${S3Paths.profilePictures}/${currentUser.orgId}/${currentUser.id}/profile`,
                data: file,
                options: {
                    onProgress: handleFileUploadProgress
                }
            })
        }
    }

    const { openFileDialog, FileUpload, temporaryFileUrl } = useFileUpload({ uploadAction: handleUploadFile, sizeLimitInBytes: 10 * MB })

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
                        <Box sx={{ position: 'relative' }}>
                            {isUploading ?
                                <CircularProgress sx={{ position: 'absolute', top: -16, left: -16, zIndex: 1 }} size={232} variant='determinate' value={uploadProgress} />
                                :
                                null
                            }
                            <Tooltip title={temporaryFileUrl ? t('fileNotUploaded', { ns: 'common' }) : t('changeProfilePicture', { ns: 'common' })}>
                                <Badge badgeContent={<PriorityHighIcon fontSize='large' />} invisible={!temporaryFileUrl} color='error' sx={{ '& .MuiBadge-badge': { padding: 1, borderRadius: 4, height: 'fit-content', width: 'fit-content' } }}>
                                    <Avatar sx={{ height: 200, width: 200 }} onClick={openFileDialog} src={temporaryFileUrl || userProfileImageUrl} alt={`${currentUser?.firstName} ${currentUser?.lastName}`}>
                                        <FolderIcon fontSize='large' />
                                    </Avatar>
                                </Badge>
                            </Tooltip>
                        </Box>
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