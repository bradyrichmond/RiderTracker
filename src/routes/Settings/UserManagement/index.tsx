import { useApiStore } from '@/store/ApiStore'
import { UserType } from '@/types/UserType'
import { Box } from '@mui/material'
import { CSSProperties, useEffect, useState } from 'react'
import { VariableSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import UserCard from './UserCard'
import SearchBar from '@/components/SearchBar'
import { useOrgStore } from '@/store/OrgStore'

const UserManagement = () => {
    const [users, setUsers] = useState<UserType[]>([])
    const [searchArg, setSearchArg] = useState('')
    const { api } = useApiStore()
    const { orgId } = useOrgStore()

    useEffect(() => {
        fetchUsers()

        return () => {
            setUsers([])
        }
    }, [searchArg])

    const fetchUsers = async () => {
        const fetchedUsers = await api?.users.getUsers(orgId)

        setUsers(fetchedUsers?.items ?? [])
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
        </Box>
    )
}

export default UserManagement