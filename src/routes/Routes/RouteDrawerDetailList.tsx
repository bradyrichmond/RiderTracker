import { Box } from '@mui/material'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList as List } from 'react-window'
import RouteDrawerDetailListItem from './RouteDrawerDetailListItem'
import { OptionsType } from '@/types/FormTypes'

interface RouteDrawerDetailListProps {
    items: OptionsType[]
    action(id: string): void
}

const RouteDrawerDetailList = ({ items, action }: RouteDrawerDetailListProps) => {
    const handleAction = (id: string) => {
        action(id)
    }

    const getItemSize = () => {
        return 150
    }

    const row = ({ index }: { index: number }) => {
        const item = items[index]
        return <RouteDrawerDetailListItem label={item.label} action={handleAction} id={item.id} />
    }

    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            <Box sx={{ flex: 1 }}>
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            itemCount={items.length}
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

export default RouteDrawerDetailList