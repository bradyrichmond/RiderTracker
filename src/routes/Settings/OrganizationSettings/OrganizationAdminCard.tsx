import { Avatar, Box, Paper, SvgIconProps, Tooltip, Typography } from '@mui/material'
import { ComponentType, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import { UserType } from '@/types/UserType'
import { useHover } from 'usehooks-ts'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/UserStore'
import { useAdminStore } from '@/store/AdminStore'

interface OrganizationAdminCardProps extends UserType {
    index: number
}

const OrganizationAdminCard = ({ id, firstName, lastName, title, email, index }: OrganizationAdminCardProps) => {
    const [actions, setActions] = useState<OrganizationAdminActionProps[]>([])
    const userFullName = `${firstName} ${lastName}`
    const profileUrl = useMemo(() => `https://s3.us-west-2.amazonaws.com/ridertracker.profileimages/${id}.jpg`, [id])
    const ref = useRef(null)
    const hovering = useHover<HTMLDivElement>(ref)
    const { userId } = useUserStore()
    const { deleteAdmin } = useAdminStore()
    const { t } = useTranslation('settings')

    const deleteAdminAction = useCallback(async (id: string) => {
        await deleteAdmin(id)
    }, [deleteAdmin])

    const buildActions = useCallback(() => {
        const actionsList: OrganizationAdminActionProps[] = []

        if (id !== userId) {
            actionsList.push({
                id,
                tooltipString: t('deleteAdminTooltip'),
                Icon: DeleteIcon,
                action: deleteAdminAction
            })
        }

        setActions(actionsList)
    }, [deleteAdminAction, id, t, userId])

    useEffect(() => {
        buildActions()
    }, [buildActions])

    return (
        <Paper elevation={4} sx={index > 0 ? { mt: '1rem' } : {}} ref={ref}>
            <Box sx={{ p: '2rem', display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ mr: '2rem' }}>
                    <Avatar sx={{ height: 150, width: 150, fontSize: '3rem' }} src={profileUrl} alt={userFullName}>
                        <PersonIcon fontSize='inherit' />
                    </Avatar>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box>
                        <Typography variant='h4'>{userFullName}</Typography>
                        <Typography variant='subtitle1'>{title}</Typography>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <Typography sx={{ display: 'flex', flexDirection: 'row' }}><EmailIcon sx={{ mr: '1rem' }} /> {email}</Typography>
                    </Box>
                </Box>
                <Box sx={{ width: '3rem' }}>
                    {hovering ?
                        <Box sx={{ width: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {actions.map((a) => <OrganizationAdminAction
                                id={a.id}
                                key={a.id}
                                tooltipString={a.tooltipString}
                                Icon={a.Icon}
                                action={a.action}
                            />)}
                        </Box>
                        :
                        null
                    }
                </Box>
            </Box>
        </Paper>
    )
}

interface OrganizationAdminActionProps {
    id: string
    tooltipString: string
    Icon: ComponentType<SvgIconProps>
    action(id: string): Promise<void>
}

export const OrganizationAdminAction = ({ id, action, tooltipString, Icon }: OrganizationAdminActionProps) => {
    const handleClick = () => {
        action(id)
    }

    return (
        <Box onClick={handleClick} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Tooltip title={tooltipString}>
                <Icon fontSize="large" />
            </Tooltip>
        </Box>
    )
}

export default OrganizationAdminCard