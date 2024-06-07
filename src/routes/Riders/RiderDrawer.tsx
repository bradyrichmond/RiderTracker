import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { useCallback, useEffect, useMemo } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import InfoIcon from '@mui/icons-material/Info'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/UserStore'
import EntityDrawer, { DrawerListActionProps } from '@/components/EntityDrawer'
import { useRiderStore } from '@/store/RiderStore'
import { RiderType } from '@/types/RiderType'
import { useStopStore } from '@/store/StopStore'
import { StopType } from '@/types/StopType'
import { useGuardianStore } from '@/store/GuardianStore'
import { GuardianType } from '@/types/UserType'

interface RiderDrawerProps {
    open: boolean
    rider?: RiderType
}

const RiderDrawer = ({ open, rider }: RiderDrawerProps) => {
    const stops = useStopStore().stops
    const getStops = useStopStore().getStops
    const guardians = useGuardianStore().guardians
    const getGuardians = useGuardianStore().getGuardians
    const heaviestRole = useUserStore().heaviestRole
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
            const filteredStops = stops.filter((s: StopType) => rider.stopIds.includes(s.id))
            const mappedStops = filteredStops.map((s: StopType) => ({ id: s.id, label: s.stopName }))
            const filteredGuardians = guardians.filter((g: GuardianType) => rider.guardianIds?.includes(g.id))
            const mappedGuardians = filteredGuardians.map((g: GuardianType) => ({ id: g.id, label: `${g.firstName} ${g.lastName}` }))

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
            await deleteRider(rider)
            return
        }
    }, [deleteRider, rider])

    const viewRiderDetail = useCallback(() => {
        navigate(`/app/riders/${rider?.id}/detail`)
    }, [navigate, rider])

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

        builtActionItems.push({
            handleClick: viewRiderDetail,
            tooltipTitle: t('viewDetails', { ns: 'common' }),
            Icon: InfoIcon
        })

        return builtActionItems

    }, [deleteRiderAction, viewRiderDetail, heaviestRole, t])

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