import { useCallback, useEffect, useMemo } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import InfoIcon from '@mui/icons-material/Info'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import EntityDrawer, { DrawerListActionProps } from '@/components/EntityDrawer'
import { useRiderStore } from '@/store/RiderStore'
import { useStopStore } from '@/store/StopStore'
import { RiderType, StopType, UserType } from '@/types/AmplifyTypes'
import { useUserStore } from '@/store/UserStore'

interface RiderDrawerProps {
    open: boolean
    rider?: RiderType
}

const RiderDrawer = ({ open, rider }: RiderDrawerProps) => {
    const stops = useStopStore().stops
    const getStops = useStopStore().getStops
    const users = useUserStore().users
    const updateUsers = useUserStore().updateUsers
    const { deleteRider } = useRiderStore()
    const navigate = useNavigate()
    const { t } = useTranslation(['riders', 'common'])

    useEffect(() => {
        updateUsers
    }, [getStops, updateUsers])

    const viewStopDetail = useCallback((stopId: string) => {
        navigate(`/app/stops/${stopId}`)
    }, [navigate])

    const viewGuardianDetail = useCallback((guardianId: string) => {
        navigate(`/app/guardians/${guardianId}`)
    }, [navigate])

    const guardians = useMemo(() => {
        if (users) {
            return users.filter((u) => u.isGuardian)
        }

        return []
    }, [users])

    const lists = useMemo(() => {
        if (rider) {
            const mappedStops = stops.map((s: StopType) => ({ id: s.id, label: s.name }))
            const mappedGuardians = guardians.map((g: UserType) => ({ id: g.id, label: `${g.firstName} ${g.lastName}` }))

            return [
                {
                    title: t('guardians'),
                    action: viewGuardianDetail,
                    items: mappedGuardians
                },
                {
                    title: t('stops'),
                    action: viewStopDetail,
                    items: mappedStops
                }
            ]
        }

        return []
    }, [viewStopDetail, viewGuardianDetail, t, rider, guardians, stops])

    const deleteRiderAction = useCallback(async () => {
        if (rider) {
            await deleteRider(rider.id)
            return
        }
    }, [deleteRider, rider])

    const viewRiderDetail = useCallback(() => {
        navigate(`/app/riders/${rider?.id}/detail`)
    }, [navigate, rider])

    const actionItems = useMemo(() => {
        const builtActionItems: DrawerListActionProps[] = []

        builtActionItems.push({
            handleClick: deleteRiderAction,
            tooltipTitle: t('deleteRider'),
            Icon: DeleteForeverIcon
        })

        builtActionItems.push({
            handleClick: viewRiderDetail,
            tooltipTitle: t('viewDetails', { ns: 'common' }),
            Icon: InfoIcon
        })

        return builtActionItems

    }, [deleteRiderAction, viewRiderDetail, t])

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