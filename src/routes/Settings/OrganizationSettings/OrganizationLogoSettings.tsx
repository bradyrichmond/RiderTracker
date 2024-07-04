import { Badge, Box, Card, Tooltip, Typography } from '@mui/material'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import FolderIcon from '@mui/icons-material/Folder'
import useFileUpload from '@/hooks/useFileUpload'
import { MB } from '@/constants/Numbers'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Unstable_Grid2'
import { useUserStore } from '@/store/UserStore'

const OrganizationLogoSettings = () => {
    const { updateUserData } = useUserStore()
    const { t } = useTranslation(['settings', 'common'])

    const uploadAction = async () => {
        // TODO: handle file upload
        await updateUserData()
    }

    const { openFileDialog, temporaryFileUrl, FileUpload } = useFileUpload({ uploadAction, sizeLimitInBytes: 10 * MB })

    return (
        <Grid xs={12}>
            <Card sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography variant='h4' sx={{ pb: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {t('orgLogos', { ns: 'settings' })}
                    </Typography>
                </Box>
                <Box>
                    <Box display='flex' height='100%' flexDirection='column' sx={{ pt: 4 }}>
                        <Box sx={{ pb: 4 }} display='flex' justifyContent='center' alignItems='center' onClick={openFileDialog} >
                            <Tooltip title={temporaryFileUrl ? t('fileNotUploaded', { ns: 'common' }) : t('changeProfilePicture', { ns: 'common' })}>
                                <Badge badgeContent={<PriorityHighIcon fontSize='large' />} invisible={!temporaryFileUrl} color='error' sx={{ '& .MuiBadge-badge': { padding: 1, borderRadius: 4, height: 'fit-content', width: 'fit-content' } }}>
                                    {!temporaryFileUrl ? <FolderIcon fontSize='large' /> : null}
                                    {temporaryFileUrl ? <img src={temporaryFileUrl} alt={temporaryFileUrl} /> : null}
                                </Badge>
                            </Tooltip>
                        </Box>
                    </Box>
                    <FileUpload />
                </Box>
            </Card>
        </Grid>
    )
}

export default OrganizationLogoSettings