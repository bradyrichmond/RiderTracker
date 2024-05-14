import { ApiContext } from "@/contexts/ApiContextProvider"
import { RoleContext } from "@/contexts/RoleContextProvider"
import { UserType } from "@/types/UserType"
import { Box, Button, Paper, Typography } from "@mui/material"
import { useContext, useEffect, useRef, useState } from "react"
import { useHover } from "usehooks-ts"
import { OrganizationAdminAction } from "../OrganizationSettings/OrganizationAdminCard"
import { useTranslation } from 'react-i18next'
import DeleteIcon from '@mui/icons-material/Delete'

const UserManagement = () => {
    const [users, setUsers] = useState<UserType[]>([])
    const [outOfItems, setOutOfItems] = useState(false)
    const { api } = useContext(ApiContext)
    const { organizationId } = useContext(RoleContext)
    
    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        const fetchedUsers = await api.users.getUsers({ orgId: organizationId, pagination: { pageSize: 11, lastKey: '' }})

        if (fetchedUsers.items.length < 1) {
            setOutOfItems(true)
            return
        }

        setUsers(fetchedUsers.items)
    }

    const loadMore = async () => {
        const lastKey = users[users.length - 1].id
        const fetchedUsers = await api.users.getUsers({ orgId: organizationId, pagination: { pageSize: 11, lastKey }})

        if (fetchedUsers.items.length < 1) {
            setOutOfItems(true)
            return
        }

        setUsers((u) => [...u, ...fetchedUsers.items])
    }

    return (
        <>
            {users ?
                users.map((u: UserType) => <UserCard user={u} />)
                :
                null
            }
            {!outOfItems ? 
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant='contained' onClick={loadMore}>
                        Load More
                    </Button>
                </Box>
                :
                null
            }
        </>
    )
}

const UserCard = ({ user }: { user: UserType }) => {
    const ref = useRef(null)
    const hovering = useHover(ref)
    const { t } = useTranslation()

    const deleteUserAction = async () => {

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
        <Paper sx={{ mb: '2rem', padding: '2rem' }} ref={ref}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant='h5'>{user.firstName} {user.lastName}</Typography>
                    <Typography variant='body1'>{user.email}</Typography>
                </Box>
                {hovering ? 
                    <Box sx={{ width: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
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

export default UserManagement