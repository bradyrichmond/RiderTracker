import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { useCallback, useEffect, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/UserStore'
import EntityDrawer, { DrawerListActionProps, DrawerListItem } from '@/components/EntityDrawer'
import { useRiderStore } from '@/store/RiderStore'
import { RiderType } from '@/types/RiderType'
import { useStopStore } from '@/store/StopStore'
import { StopType } from '@/types/StopType'

interface RiderDrawerProps {
    open: boolean
    riderId: string
}

const RiderDrawer = ({ open, riderId }: RiderDrawerProps) => {
    const [rider, setRider] = useState<RiderType>()
    const [lists, setLists] = useState<DrawerListItem[]>([])
    const [actionItems, setActionItems] = useState<DrawerListActionProps[]>([])
    const { heaviestRole } = useUserStore()
    const { getRiderById, deleteRider } = useRiderStore()
    const { getBulkStopsById } = useStopStore()
    const navigate = useNavigate()
    const { t } = useTranslation('riders')

    const viewStopDetail = useCallback((riderId: string) => {
        navigate(`/app/stops/${riderId}`)
    }, [navigate])

    const buildLists = useCallback((stops: StopType[]) => {
        const mappedStops = stops.map((s: StopType) => ({ id: s.id, label: s.stopName }))
        const builtLists = [
            {
                title: t('stops'),
                action: viewStopDetail,
                items: mappedStops
            }
        ]

        setLists(builtLists)
    }, [viewStopDetail, t])

    const deleteRiderAction = useCallback(async () => {
        if (rider) {
            await deleteRider(rider)
            return
        }
    }, [deleteRider, rider])

    const buildActionItems = useCallback(() => {
        const builtActionItems: DrawerListActionProps[] = []
        const userPermissions = RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole]

        if (userPermissions.includes(permissions.DELETE_GUARDIAN)) {
            builtActionItems.push({
                handleClick: deleteRiderAction,
                tooltipTitle: t('deleteRider'),
                Icon: DeleteForeverIcon
            })
        }

        setActionItems(builtActionItems)
    }, [deleteRiderAction, heaviestRole, t])

    useEffect(() => {
        const getRiderData = async () => {
            const fetchedRider = await getRiderById(riderId)
            setRider(fetchedRider)

            if (fetchedRider) {

                const stopIds = fetchedRider.stopIds

                if (stopIds) {
                    const stops = await getBulkStopsById(stopIds)
                    buildLists(stops)
                }

                buildActionItems()
            }
        }

        if (riderId) {
            getRiderData()
        }
    }, [riderId, getRiderById, getBulkStopsById, buildActionItems, buildLists])

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