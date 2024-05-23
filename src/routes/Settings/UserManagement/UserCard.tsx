import { UserType } from '@/types/UserType'
import { CSSProperties, useContext, useRef } from 'react'
import { useHover } from 'usehooks-ts'
import { useTranslation } from 'react-i18next'
import { ApiContext } from '@/contexts/ApiContextProvider'
import { RoleContext } from '@/contexts/RoleContext'
import { SnackbarContext } from '@/contexts/SnackbarContextProvider'
import { Box, Paper, Typography } from '@mui/material'
import { OrganizationAdminAction } from '../OrganizationSettings/OrganizationAdminCard'
import DeleteIcon from '@mui/icons-material/Delete'
import { useOrgStore } from '@/store/OrgStore'

const UserCard = ({ user, updateUsers, style }: { user: UserType, updateUsers: (_id: string) => void, style: CSSProperties }) => {
    const ref = useRef(null)
    const hovering = useHover(ref)
    const { t } = useTranslation()
    const { api } = useContext(ApiContext)
    const { userId } = useContext(RoleContext)
    const { orgId } = useOrgStore()
    const { showErrorSnackbar } = useContext(SnackbarContext)

    const deleteUserAction = async () => {
        if (user.id !== userId) {
            await api.users.deleteUser(orgId, user.id)
            updateUsers(user.id)
        } else {
            showErrorSnackbar('Can\'t delete yourself')
        }
    }

    const actions = [
        {
            id: 'deleteUserAction',
            tooltipString: t('deleteUserTooltip'),
            Icon: DeleteIcon,
            action: deleteUserAction
        }
    ]

    return (
        <Paper style={{ ...style, height: 'auto' }} ref={ref}>
            <Box sx={{ display: 'flex', flexDirection: 'row', margin: '2rem' }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant='h5'>{user.firstName} {user.lastName}</Typography>
                    <Typography variant='body1'>{user.email}</Typography>
                </Box>
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
        </Paper>
    )
}

export default UserCard
