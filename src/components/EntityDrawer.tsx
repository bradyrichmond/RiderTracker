import { Box, Button, Divider, Drawer, Fab, LinearProgress, Stack, Tooltip, Typography } from '@mui/material'
import { ComponentType } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import EntityDrawerList from './EntityDrawerList'
import { OptionsType } from '@/types/FormTypes'
import Grid from '@mui/material/Unstable_Grid2'

export interface DrawerListItem {
    title: string
    action?: (id: string) => void
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
            {lists.length > 0 ?
                <Box sx={{ width: { xs: '100vw', md: '25vw' }, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Grid container spacing={2} direction='row' sx={{ padding: 2 }}>
                        <Grid xs={2}>
                            <Fab onClick={back}><ArrowForwardIcon /></Fab>
                        </Grid>
                        <Grid xs={10} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant='h5' noWrap>{title}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Box sx={{ flex: 1, pt: 2 }}>
                        <Stack direction='column' alignItems='center' spacing={2} sx={{ height: '100%' }}>
                            {lists.map((l: DrawerListItem) => <EntityDrawerList
                                        title={l.title}
                                        items={l.items}
                                        action={l.action}
                                        key={l.title}
                                    />
                                )
                            }
                        </Stack>
                    </Box>
                    <Box sx={{ pt: 2, pb: 2 }}>
                        <Stack direction='row' justifyContent='center' alignItems='center' spacing={8}>
                            {actionItems.map(({ handleClick, tooltipTitle, Icon }: DrawerListActionProps) => <EntityDrawerListAction handleClick={handleClick} tooltipTitle={tooltipTitle} Icon={Icon} key={tooltipTitle} />  )}
                        </Stack>
                    </Box>
                </Box>
                :
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearProgress sx={{ height: 2, ml: 10, mr: 10, borderRadius: 2 }} />
                </Box>
            }
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
            sx={{ padding: 4 }}
        >
            <Tooltip title={tooltipTitle}>
                <Icon />
            </Tooltip>
        </Button>
    )
}

export default EntityDrawer