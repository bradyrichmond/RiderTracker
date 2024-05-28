import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { useEffect, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useOrgStore } from '@/store/OrgStore'
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
    const { orgId } = useOrgStore()
    const { heaviestRole } = useUserStore()
    const { getRiderById, deleteRider } = useRiderStore()
    const { getBulkStopsById } = useStopStore()
    const navigate = useNavigate()
    const { t } = useTranslation('riders')

    useEffect(() => {
        if (riderId) {
            getRiderData()
        }
    }, [riderId, orgId])

    const getRiderData = async () => {
        const fetchedRider = await getRiderById(riderId)
        setRider(fetchedRider)

        if (fetchedRider) {

            if (fetchedRider.stopIds) {
                getStopsForRider(fetchedRider.stopIds)
            }

            buildActionItems()
        }
    }

    const buildActionItems = () => {
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
    }

    const buildLists = (stops: StopType[]) => {
        const mappedStops = stops.map((s: StopType) => ({ id: s.id, label: s.stopName }))
        const builtLists = [
            {
                title: t('stops'),
                action: viewStopDetail,
                items: mappedStops
            }
        ]

        setLists(builtLists)
    }

    const getStopsForRider = async (stopIds: string[]) => {
        const stops = await getBulkStopsById(stopIds)
        buildLists(stops)
    }

    const deleteRiderAction = async () => {
        if (rider) {
            await deleteRider(rider)
            return
        }
    }

    const viewStopDetail = (riderId: string) => {
        navigate(`/app/stops/${riderId}`)
    }

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