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
import { useOrgStore } from '@/store/OrgStore'

const DriverHome = () => {
    const [isSelectingRoute, setIsSelectingRoute] = useState(false)
    const [disableButtons, setDisableButtons] = useState(false)
    const { t } = useTranslation('drivers')
    const userId = useUserStore().userId
    const orgId = useOrgStore().orgId
    const createRouteAction = useRouteActionStore().createRouteAction
    const setRouteActive = useRouteStore().setRouteActive
    const getRouteActionsByDriverId = useRouteActionStore().getRouteActionsByDriverId
    const routeActions = useRouteActionStore().routeActions
    const { showErrorSnackbar } = useContext(SnackbarContext)
    const navigate = useNavigate()

    useEffect(() => {
        const checkForActiveRoute = async () => {
            if (userId && orgId) {
                const filteredByDriver = await getRouteActionsByDriverId(userId)

                const mostRecent = filteredByDriver[0]

                if (mostRecent && mostRecent.actionType === ActionType.ROUTE_BEGIN) {
                    navigate('/app/drivers/active-route')
                }
            }
        }

        checkForActiveRoute()
    }, [routeActions, navigate, orgId, userId, getRouteActionsByDriverId])

    const selectRouteAction = async (routeId: string) => {
        setDisableButtons(true)

        try {
            await createRouteAction({
                actionType: ActionType.ROUTE_BEGIN,
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