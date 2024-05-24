import { Badge, Box, Card, Tooltip, Typography } from '@mui/material'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import FolderIcon from '@mui/icons-material/Folder'
import useFileUpload from '@/hooks/useFileUpload'
import { MB } from '@/constants/Numbers'
import { useApiStore } from '@/store/ApiStore'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Unstable_Grid2'
import { useOrgStore } from '@/store/OrgStore'
import { useUserStore } from '@/store/UserStore'

const OrganizationLogoSettings = () => {
    const { api } = useApiStore()
    const { updateUserData } = useUserStore()
    const { orgId, organizationLoginImageUrl } = useOrgStore()
    const { t } = useTranslation(['settings', 'common'])

    const uploadAction = async (file: File) => {
        await api?.organizations.updateOrganizationLoginImage(file, orgId)
        await updateUserData()
    }

    const { openFileDialog, temporaryFileUrl, FileUpload } = useFileUpload({ uploadAction, sizeLimitInBytes: 10 * MB })

    return (
        <Grid xs={12}>
            <Card sx={{ p: '2rem' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography variant='h4' sx={{ pb: '.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {t('orgLogos', { ns: 'settings' })}
                    </Typography>
                </Box>
                <Box>
                    <Box display='flex' height='100%' flexDirection='column' sx={{ pt: '2rem' }}>
                        <Box sx={{ pb: '2rem' }} display='flex' justifyContent='center' alignItems='center' onClick={openFileDialog} >
                            <Tooltip title={temporaryFileUrl ? t('fileNotUploaded', { ns: 'common' }) : t('changeProfilePicture', { ns: 'common' })}>
                                <Badge badgeContent={<PriorityHighIcon fontSize='large' />} invisible={!temporaryFileUrl} color='error' sx={{ '& .MuiBadge-badge': { padding: '0.5rem', borderRadius: '2rem', height: 'fit-content', width: 'fit-content' } }}>
                                    {!temporaryFileUrl && !organizationLoginImageUrl ? <FolderIcon fontSize='large' /> : null}
                                    {temporaryFileUrl ? <img src={temporaryFileUrl} alt={temporaryFileUrl} /> : null}
                                    {organizationLoginImageUrl && !temporaryFileUrl ? <img src={organizationLoginImageUrl} alt={organizationLoginImageUrl} /> : null}
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