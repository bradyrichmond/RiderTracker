import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { useCallback, useEffect, useMemo } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/UserStore'
import EntityDrawer, { DrawerListActionProps } from '@/components/EntityDrawer'
import { useRiderStore } from '@/store/RiderStore'
import { RiderType } from '@/types/RiderType'
import { useStopStore } from '@/store/StopStore'
import { StopType } from '@/types/StopType'

interface RiderDrawerProps {
    open: boolean
    rider?: RiderType
}

const RiderDrawer = ({ open, rider }: RiderDrawerProps) => {
    const stops = useStopStore().stops
    const getStops = useStopStore().getStops
    const heaviestRole = useUserStore().heaviestRole
    const { deleteRider } = useRiderStore()
    const navigate = useNavigate()
    const { t } = useTranslation('riders')

    useEffect(() => {
        getStops()
    }, [getStops])

    const viewStopDetail = useCallback((riderId: string) => {
        navigate(`/app/stops/${riderId}`)
    }, [navigate])

    const lists = useMemo(() => {
        if (rider) {
            const filteredStops = stops.filter((s: StopType) => rider.stopIds.includes(s.id))
            const mappedStops = filteredStops.map((s: StopType) => ({ id: s.id, label: s.stopName }))

            return [
                {
                    title: t('stops'),
                    action: viewStopDetail,
                    items: mappedStops
                }
            ]
        }

        return []
    }, [viewStopDetail, t, rider, stops])

    const deleteRiderAction = useCallback(async () => {
        if (rider) {
            await deleteRider(rider)
            return
        }
    }, [deleteRider, rider])

    const actionItems = useMemo(() => {
        const builtActionItems: DrawerListActionProps[] = []
        const userPermissions = RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole]

        if (userPermissions.includes(permissions.DELETE_GUARDIAN)) {
            builtActionItems.push({
                handleClick: deleteRiderAction,
                tooltipTitle: t('deleteRider'),
                Icon: DeleteForeverIcon
            })
        }

        return builtActionItems

    }, [deleteRiderAction, heaviestRole, t])

    const handleBack = () => {
        navigate('/app/riders')
    }

    return (
        <EntityDrawer
            actionItems={actionItems}
            back={handleBack}
            lists={lists}
            open={open}
            title={`${rider?.firstName} ${rider?.lastName}`}
        />
    )
}

export default RiderDrawer