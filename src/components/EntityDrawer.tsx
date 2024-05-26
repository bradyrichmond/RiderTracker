import { Box, Button, Divider, Drawer, Fab, Stack, Tooltip, Typography } from '@mui/material'
import { ComponentType } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import EntityDrawerList from './EntityDrawerList'
import { OptionsType } from '@/types/FormTypes'

export interface DrawerListItem {
    title: string
    action: (id: string) => void
    items: OptionsType[]
}

interface EntityDrawerProps {
    open: boolean
    lists: DrawerListItem[]
    actionItems: DrawerListActionProps[]
    title: string
    back: () => void
}

const EntityDrawer = ({ actionItems, back, lists, open, title }: EntityDrawerProps) => {
    return (
        <Drawer open={open} onClose={back} anchor='right' variant="temporary">
            <Box sx={{ ml: '1rem', mt: '1rem', mb: '1rem', display: 'flex', flexDirection: 'row' }}>
                <Fab onClick={back}><ArrowForwardIcon /></Fab>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant='h3'>{title}</Typography>
                </Box>
            </Box>
            <Divider />
            <Box sx={{ margin: '1rem', width: '20vw', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ flex: 1 }}>
                    <Stack direction='column' justifyContent='' alignItems='center' spacing={2} sx={{ height: '100%' }}>
                        {lists.map((l: DrawerListItem) => <EntityDrawerList
                                        title={l.title} 
                                        items={l.items ?? []}
                                        action={l.action}
                                        key={l.title}
                                    />
                            )
                        }
                    </Stack>
                </Box>
                <Box sx={{ pt: '1rem' }}>
                    <Stack direction='row' justifyContent='center' alignItems='center' spacing={8}>
                        {actionItems.map(({ handleClick, tooltipTitle, Icon }: DrawerListActionProps) => <EntityDrawerListAction handleClick={handleClick} tooltipTitle={tooltipTitle} Icon={Icon} key={tooltipTitle} />  )}
                    </Stack>
                </Box>
            </Box>
        </Drawer>
    )
}

export interface DrawerListActionProps {
    handleClick(): void | Promise<void>
    tooltipTitle: string
    Icon: ComponentType
}

const EntityDrawerListAction = ({ handleClick, tooltipTitle, Icon }: DrawerListActionProps) => {
    return (
        <Button
            variant="contained"
            size="small"
            onClick={handleClick}
            sx={{ padding: '2rem' }}
        >
            <Tooltip title={tooltipTitle}>
                <Icon />
            </Tooltip>
        </Button>
    )
}

export default EntityDrawer