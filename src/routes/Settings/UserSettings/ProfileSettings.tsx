import { Avatar, Badge, Box, Card, Tooltip, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import FolderIcon from '@mui/icons-material/Folder'
import { useContext } from "react"
import { ApiContext } from "@/contexts/ApiContextProvider"
import { RoleContext } from "@/contexts/RoleContextProvider"
import UpdateProfileDataForm from "./UpdateProfileDataForm"
import useFileUpload from "@/hooks/useFileUpload"
import { MB } from "@/constants/Numbers"
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import { useTranslation } from 'react-i18next'
import { OrgDataContext } from "@/contexts/OrganizationDataContext"

const ProfileSettings = () => {
    const { api } = useContext(ApiContext)
    const { userId, userFullName, userPictureUrl, updateUserData } = useContext(RoleContext)
    const { orgId } = useContext(OrgDataContext)
    const { t } = useTranslation('settings')

    const uploadFile = async (file: File) => {
        await api.admin.updateUserProfileImage(orgId, userId, file, userId)
        await updateUserData()
    }

    const { openFileDialog, FileUpload, temporaryFileUrl } = useFileUpload({uploadAction: uploadFile, sizeLimitInBytes: 10 * MB})

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
                            <Badge badgeContent={<PriorityHighIcon fontSize='large' />} invisible={!temporaryFileUrl} color='error' sx={{ "& .MuiBadge-badge": { padding: '0.5rem', borderRadius: '2rem', height: 'fit-content', width: 'fit-content' } }}>
                                <Avatar sx={{height: 200, width: 200}} onClick={openFileDialog} src={temporaryFileUrl || userPictureUrl} alt={userFullName}>
                                    <FolderIcon fontSize='large' />
                                </Avatar>
                            </Badge>
                        </Tooltip>
                    </Box>
                </Box>
                <FileUpload />
                <Box sx={{pt: '1rem'}}>
                    <UpdateProfileDataForm />
                </Box>
            </Card>
        </Grid>
    )
}

export default ProfileSettings