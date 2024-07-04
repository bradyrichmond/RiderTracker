import { useCallback, useEffect, useMemo } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import InfoIcon from '@mui/icons-material/Info'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import EntityDrawer, { DrawerListActionProps } from '@/components/EntityDrawer'
import { useRiderStore } from '@/store/RiderStore'
import { useStopStore } from '@/store/StopStore'
import { useGuardianStore } from '@/store/GuardianStore'
import { RiderType, StopType, UserType } from '@/types/AmplifyTypes'

interface RiderDrawerProps {
    open: boolean
    rider?: RiderType
}

const RiderDrawer = ({ open, rider }: RiderDrawerProps) => {
    const stops = useStopStore().stops
    const getStops = useStopStore().getStops
    const guardians = useGuardianStore().guardians
    const getGuardians = useGuardianStore().getGuardians
    const { deleteRider } = useRiderStore()
    const navigate = useNavigate()
    const { t } = useTranslation(['riders', 'common'])

    useEffect(() => {
        getStops()
        getGuardians()
    }, [getStops, getGuardians])

    const viewStopDetail = useCallback((stopId: string) => {
        navigate(`/app/stops/${stopId}`)
    }, [navigate])

    const viewGuardianDetail = useCallback((guardianId: string) => {
        navigate(`/app/guardians/${guardianId}`)
    }, [navigate])

    const lists = useMemo(() => {
        if (rider) {
            const filteredStops = stops
            const mappedStops = filteredStops.map((s: StopType) => ({ id: s.id, label: s.name }))
            const filteredGuardians = guardians
            const mappedGuardians = filteredGuardians.map((g: UserType) => ({ id: g.id, label: `${g.firstName} ${g.lastName}` }))

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