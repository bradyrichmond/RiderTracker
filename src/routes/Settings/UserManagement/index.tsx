import { Box } from '@mui/material'
import { CSSProperties } from 'react'
import { VariableSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import UserCard from './UserCard'
import SearchBar from '@/components/SearchBar'
import { useUserStore } from '@/store/UserStore'

const UserManagement = () => {
    const { users, changeSearchArg } = useUserStore()

    const row = ({ index, style }: { index: number, style: CSSProperties }) => {
        const user = users[index]
        return <UserCard user={user} style={style} />
    }

    const getItemSize = () => {
        return 150
    }

    const handleSearchChange = (val: string) => {
        changeSearchArg(val)
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