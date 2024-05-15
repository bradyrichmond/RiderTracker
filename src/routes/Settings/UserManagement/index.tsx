import { ApiContext } from "@/contexts/ApiContextProvider"
import { RoleContext } from "@/contexts/RoleContextProvider"
import { UserType } from "@/types/UserType"
import { Box, Button } from "@mui/material"
import { CSSProperties, useContext, useEffect, useState } from "react"
import { VariableSizeList as List } from 'react-window'
import AutoSizer from "react-virtualized-auto-sizer"
import UserCard from "./UserCard"
import { useTranslation } from 'react-i18next'
import SearchBar from "@/components/SearchBar"

const UserManagement = () => {
    const [users, setUsers] = useState<UserType[]>([])
    const [outOfItems, setOutOfItems] = useState(false)
    const [searchArg, setSearchArg] = useState('')
    const { api } = useContext(ApiContext)
    const { organizationId } = useContext(RoleContext)
    const { t } = useTranslation('common')
    
    useEffect(() => {
        fetchUsers()

        return () => {
            setUsers([])
        }
    }, [searchArg])

    const fetchUsers = async () => {
        const fetchedUsers = await api.users.getUsers({ orgId: organizationId, pagination: { pageSize: 11, lastKey: '', searchArg }})

        if (fetchedUsers.items.length < 1) {
            setOutOfItems(true)
            setUsers([])
            return
        }

        setUsers(fetchedUsers.items)
        setOutOfItems(false)
    }

    const loadMore = async () => {
        const lastKey = users[users.length - 1].id
        const fetchedUsers = await api.users.getUsers({ orgId: organizationId, pagination: { pageSize: 11, lastKey, searchArg }})

        if (fetchedUsers.items.length < 1) {
            setOutOfItems(true)
            return
        }

        setUsers((u) => [...u, ...fetchedUsers.items])
    }

    const updateListAfterDelete = (userId: string) => {
        const updatedUserList = users.filter((u) => u.id !== userId)
        setUsers(updatedUserList)
    }

    const row = ({ index, style }: { index: number, style: CSSProperties }) => {
        const user = users[index]
        return <UserCard user={user} updateUsers={updateListAfterDelete} style={style} />
    }

    const getItemSize = (_index: number) => {
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