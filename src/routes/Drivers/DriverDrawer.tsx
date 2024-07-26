import { useCallback, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import EntityDrawer from '@/components/EntityDrawer'
import { useRouteActionStore } from '@/store/RouteActionStore'
import dayjs from 'dayjs'
import { RouteActionType, UserType } from '@/types/AmplifyTypes'
import { useUserStore } from '@/store/UserStore'

interface DriverDrawerProps {
    open: boolean
    driverId: string
}

const DriverDrawer = ({ open, driverId }: DriverDrawerProps) => {
    const updateUsers = useUserStore().updateUsers
    const users = useUserStore().users
    const routeActions = useRouteActionStore().routeActions
    const navigate = useNavigate()
    const { t } = useTranslation('drivers')

    useEffect(() => {
        updateUsers()
    }, [driverId, updateUsers])

    const drivers = useMemo(() => {
        return users.filter((u) => u.isDriver)
    }, [users])

    const driver: UserType | undefined = useMemo(() => {
        const selectedDriver = drivers.find((d: UserType) => d.id === driverId)

        if (selectedDriver) {
            return selectedDriver
        }
    }, [drivers, driverId])

    const handleBack = useCallback(() => {
        navigate('/app/drivers')
    }, [navigate])

    const lists = useMemo(() => {
        if (driverId && Array.isArray(routeActions)) {
            const mappedRouteActions = routeActions.map((r: RouteActionType) => {
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


    return (
        <EntityDrawer
            actionItems={[]}
            back={handleBack}
            lists={lists}
            open={open}
            title={`${driver?.firstName} ${driver?.lastName}`}
        />
    )
}

export default DriverDrawer