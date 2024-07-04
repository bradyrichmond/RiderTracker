import { useRouteActionStore } from '@/store/RouteActionStore'
import { Box, Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import SelectRouteDialog from '../Drivers/ActiveRoute/SelectRouteDialog'
import { ActionType } from '@/types/RouteActionType'
import { useUserStore } from '@/store/UserStore'
import { SnackbarContext } from '@/contexts/SnackbarContextProvider'
import { useRouteStore } from '@/store/RouteStore'

const DriverHome = () => {
    const [isSelectingRoute, setIsSelectingRoute] = useState(false)
    const [disableButtons, setDisableButtons] = useState(false)
    const { t } = useTranslation('drivers')
    const userId = useUserStore().currentUser?.id
    const createRouteAction = useRouteActionStore().createRouteAction
    const setRouteActive = useRouteStore().setRouteActive
    const routeActions = useRouteActionStore().routeActions
    const { showErrorSnackbar } = useContext(SnackbarContext)
    const navigate = useNavigate()

    useEffect(() => {
        const checkForActiveRoute = async () => {
            if (userId) {
                const mostRecent = routeActions[0]

                if (mostRecent && mostRecent.actionType === ActionType.ROUTE_START) {
                    navigate('/app/drivers/active-route')
                }
            }
        }

        checkForActiveRoute()
    }, [routeActions, navigate, userId])

    const selectRouteAction = async (routeId: string) => {
        if (userId) {
            setDisableButtons(true)

            try {
                await createRouteAction({
                    actionType: ActionType.ROUTE_START,
                    driverId: userId,
                    routeId
                })

                await setRouteActive(routeId)

                navigate('/drivers')
                setDisableButtons(false)
            } catch {
                setDisableButtons(false)
                showErrorSnackbar(t('errorStartingRoute'))
            }
        }
    }

    const toggleSelectRoute = () => {
        setIsSelectingRoute((cur) => !cur)
    }

    return (
        <Box style={{ height: '100%' }}>
            <Grid container spacing={2}>
                <SelectRouteDialog isSelectingRoute={isSelectingRoute} cancelAction={toggleSelectRoute} selectRouteAction={selectRouteAction} />
                <Grid xs={12}>
                    <Box style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button disabled={disableButtons} onClick={toggleSelectRoute} variant='contained'>{t('startRoute')}</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default DriverHome