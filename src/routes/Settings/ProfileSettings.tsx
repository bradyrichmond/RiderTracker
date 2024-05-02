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

const ProfileSettings = () => {
    const { api } = useContext(ApiContext)
    const { organizationId, userId, userFullName, userPictureUrl, updateUserData } = useContext(RoleContext)

    const uploadFile = async (file: File) => {
        await api.admin.updateUserProfileImage(organizationId, userId, file, userId)
        await updateUserData()
    }

    const { openFileDialog, FileUpload, temporaryFileUrl } = useFileUpload({uploadAction: uploadFile, sizeLimitInBytes: 10 * MB})

    return (
        <Grid sm={12} md={6}>
            <Card sx={{ p: '2rem' }}>
                <Typography variant='h4' sx={{ pb: '.5rem' }}>
                    Profile Settings
                </Typography>
                <Typography variant='subtitle1'>
                    These are your personal details. They are visible to organization administrators.
                </Typography>
                <Box display='flex' height='100%' flexDirection='column' sx={{ pt: '2rem' }}>
                    <Box sx={{ pb: '2rem' }} display='flex' justifyContent='center' alignItems='center' >
                        <Tooltip title={temporaryFileUrl ? 'File has not been uploaded' : 'Change Profile Picture'}>
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