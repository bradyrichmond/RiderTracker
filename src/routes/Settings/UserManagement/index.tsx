import { useApiStore } from '@/store/ApiStore'
import { UserType } from '@/types/UserType'
import { Box, Button } from '@mui/material'
import { CSSProperties, useEffect, useState } from 'react'
import { VariableSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import UserCard from './UserCard'
import { useTranslation } from 'react-i18next'
import SearchBar from '@/components/SearchBar'
import { useOrgStore } from '@/store/OrgStore'

const UserManagement = () => {
    const [users, setUsers] = useState<UserType[]>([])
    const [outOfItems, setOutOfItems] = useState(false)
    const [searchArg, setSearchArg] = useState('')
    const { api } = useApiStore()
    const { orgId } = useOrgStore()
    const { t } = useTranslation('common')

    useEffect(() => {
        fetchUsers()

        return () => {
            setUsers([])
        }
    }, [searchArg])

    const fetchUsers = async () => {
        const fetchedUsers = await api?.users.getUsers({ orgId, pagination: { pageSize: 11, lastKey: '', searchArg } })

        if (fetchedUsers && fetchedUsers.items.length < 1) {
            setOutOfItems(true)
            setUsers([])
            return
        }

        setUsers(fetchedUsers?.items ?? [])
        setOutOfItems(false)
    }

    const loadMore = async () => {
        const lastKey = users[users.length - 1].id
        const fetchedUsers = await api?.users.getUsers({ orgId, pagination: { pageSize: 11, lastKey, searchArg } })

        if (fetchedUsers && fetchedUsers.items.length < 1) {
            setOutOfItems(true)
            return
        }

        const items = fetchedUsers?.items ?? []

        setUsers((u) => [...u, ...items])
    }

    const updateListAfterDelete = (userId: string) => {
        const updatedUserList = users.filter((u) => u.id !== userId)
        setUsers(updatedUserList)
    }

    const row = ({ index, style }: { index: number, style: CSSProperties }) => {
        const user = users[index]
        return <UserCard user={user} updateUsers={updateListAfterDelete} style={style} />
    }

    const getItemSize = () => {
        return 150
    }

    const handleSearchChange = (val: string) => {
        setSearchArg(val)
    }

    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            <Box sx={{ mb: '2rem' }}>
                <SearchBar onChange={handleSearchChange} fullWidth />
            </Box>
            <Box sx={{ flex: 1 }}>
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            itemCount={users.length}
                            width={width}
                            height={height}
                            itemSize={getItemSize}
                        >
                            {row}
                        </List>
                    )}
                </AutoSizer>
            </Box>
            {!outOfItems ?
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '2rem' }}>
                    <Button variant='contained' onClick={loadMore}>
                        {t('loadMore')}
                    </Button>
                </Box>
                :
                null
            }
        </Box>
    )
}

export default UserManagement