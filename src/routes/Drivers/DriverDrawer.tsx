import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { useCallback, useEffect, useMemo, useState } from 'react'
import BlockIcon from '@mui/icons-material/Block'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/UserStore'
import EntityDrawer, { DrawerListActionProps } from '@/components/EntityDrawer'
import { UserType } from '@/types/UserType'
import { useDriverStore } from '@/store/DriverStore'
import { useRouteActionStore } from '@/store/RouteActionStore'
import { RouteActionType } from '@/types/RouteActionType'
import dayjs from 'dayjs'

interface DriverDrawerProps {
    open: boolean
    driverId: string
}

const DriverDrawer = ({ open, driverId }: DriverDrawerProps) => {
    const heaviestRole = useUserStore().heaviestRole
    const deleteDriver = useDriverStore().deleteDriver
    const drivers = useDriverStore().drivers
    const updateDrivers = useDriverStore().updateDrivers
    const [routeActions, setRouteActions] = useState<RouteActionType[]>([])
    const getRouteActionsByDriverId = useRouteActionStore().getRouteActionsByDriverId
    const navigate = useNavigate()
    const { t } = useTranslation('drivers')

    useEffect(() => {
        updateDrivers()
    }, [driverId, updateDrivers])

    const driver: UserType | undefined = useMemo(() => {
        const selectedDriver = drivers.find((d: UserType) => d.id === driverId)

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

    useEffect(() => {
        if (driverId) {
            const getRouteActions = async () => {
            const fetchedRouteActions = await getRouteActionsByDriverId(driverId)
            setRouteActions(fetchedRouteActions)
        }

        getRouteActions() }
    }, [driverId, getRouteActionsByDriverId])

    const lists = useMemo(() => {
        if (driverId && Array.isArray(routeActions)) {
            const mappedRouteActions = routeActions.map((r: RouteActionType) => {
                return {
                    id: r.id,
                    label: `${r.actionType} ${dayjs(Number(r.createdDate)).format('YYYY-MM-DD HH:mm:sss')}`
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
        const userPermissions = RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole]

        if (userPermissions.includes(permissions.DELETE_DRIVER)) {
            builtActionItems.push({
                handleClick: disableDriverAction,
                tooltipTitle: t('disableDriver'),
                Icon: BlockIcon
            })
        }

        return builtActionItems
    }, [disableDriverAction, heaviestRole, t])


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