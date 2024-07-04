import { useCallback, useEffect, useMemo } from 'react'
import BlockIcon from '@mui/icons-material/Block'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import EntityDrawer, { DrawerListActionProps } from '@/components/EntityDrawer'
import { useDriverStore } from '@/store/DriverStore'
import { useRouteActionStore } from '@/store/RouteActionStore'
import dayjs from 'dayjs'
import { Schema } from '../../../amplify/data/resource'

interface DriverDrawerProps {
    open: boolean
    driverId: string
}

const DriverDrawer = ({ open, driverId }: DriverDrawerProps) => {
    const deleteDriver = useDriverStore().deleteDriver
    const drivers = useDriverStore().drivers
    const updateDrivers = useDriverStore().updateDrivers
    const routeActions = useRouteActionStore().routeActions
    const navigate = useNavigate()
    const { t } = useTranslation('drivers')

    useEffect(() => {
        updateDrivers()
    }, [driverId, updateDrivers])

    const driver: Schema['User']['type'] | undefined = useMemo(() => {
        const selectedDriver = drivers.find((d: Schema['User']['type']) => d.id === driverId)

        if (selectedDriver) {
            return selectedDriver
        }
    }, [drivers, driverId])

    const handleBack = useCallback(() => {
        navigate('/app/drivers')
    }, [navigate])

    const disableDriverAction = useCallback(async () => {
        if (driver?.id) {
            await deleteDriver(driver.id)
            handleBack()
            return
        }
    }, [driver?.id, deleteDriver, handleBack])

    const lists = useMemo(() => {
        if (driverId && Array.isArray(routeActions)) {
            const mappedRouteActions = routeActions.map((r: Schema['RouteAction']['type']) => {
                return {
                    id: r.id,
                    label: `${r.actionType} ${dayjs(Number(r.createdAt)).format('YYYY-MM-DD HH:mm:sss')}`
                }
            })

            return [
                {
                    title: t('driverActivity'),
                    items: mappedRouteActions
                }
            ]
        }

        return []
    }, [t, driverId, routeActions])

    const actionItems: DrawerListActionProps[] | undefined = useMemo(() => {
        const builtActionItems: DrawerListActionProps[] = []

        builtActionItems.push({
            handleClick: disableDriverAction,
            tooltipTitle: t('disableDriver'),
            Icon: BlockIcon
        })

        return builtActionItems
    }, [disableDriverAction, t])


    return (
        <EntityDrawer
            actionItems={actionItems}
            back={handleBack}
            lists={lists}
            open={open}
            title={`${driver?.firstName} ${driver?.lastName}`}
        />
    )
}

export default DriverDrawer