import { Box, Paper, Typography } from '@mui/material'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList as List } from 'react-window'
import EntityDrawerListItem from './EntityDrawerListItem'
import { OptionsType } from '@/types/FormTypes'
import { useTranslation } from 'react-i18next'

interface EntityDrawerDetailListProps {
    items: OptionsType[]
    action(id: string): void
    title: string
}

const EntityDrawerDetailList = ({ items, action, title }: EntityDrawerDetailListProps) => {
    const { t } = useTranslation('common')
    const handleAction = (id: string) => {
        action(id)
    }

    const getItemSize = () => {
        return 150
    }

    const row = ({ index }: { index: number }) => {
        const item = items[index]
        return <EntityDrawerListItem label={item.label} action={handleAction} id={item.id} tooltipTitle={t('viewDetails')} />
    }

    return (
        <>
            <Typography variant='h5'>{title}</Typography>
            <Paper sx={{ width: '100%', flex: 1 }}>
                <Box sx={{ height: '100%', width: '100%' }}>
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
                </Box>
            </Paper>
        </>
    )
}

export default EntityDrawerDetailList