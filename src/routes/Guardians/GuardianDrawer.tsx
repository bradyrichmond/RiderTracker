import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { useCallback, useMemo, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/UserStore'
import { useRiderStore } from '@/store/RiderStore'
import EntityDrawer, { DrawerListActionProps } from '@/components/EntityDrawer'
import { useGuardianStore } from '@/store/GuardianStore'
import { GuardianType } from '@/types/UserType'
import { RiderType } from '@/types/RiderType'
import { useStopStore } from '@/store/StopStore'
import { useSchoolStore } from '@/store/SchoolStore'
import CreateRiderDialog from '../Riders/CreateRiderDialog'

interface GuardianDrawerProps {
    open: boolean
    guardian?: GuardianType
}

const GuardianDrawer = ({ open, guardian }: GuardianDrawerProps) => {
    const [isAddingRider, setIsAddingRider] = useState(false)
    const { heaviestRole } = useUserStore()
    const { getGuardians, deleteGuardian } = useGuardianStore()
    const { riders, createRider } = useRiderStore()
    const { schools } = useSchoolStore()
    const { stops } = useStopStore()
    const navigate = useNavigate()
    const { t } = useTranslation('guardians')

    const deleteGuardianAction = useCallback(async () => {
        if (guardian) {
            await deleteGuardian(guardian)
        }
    }, [guardian, deleteGuardian])

    const viewRiderDetail = useCallback((riderId: string) => {
        navigate(`/app/riders/${riderId}`)
    }, [navigate])

    const toggleAddingRider = () => {
        setIsAddingRider((current) => !current)
    }

    const actionItems = useMemo(() => {
        const builtActionItems: DrawerListActionProps[] = []
        const userPermissions = RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole]

        if (userPermissions.includes(permissions.CREATE_RIDER)) {
            builtActionItems.push({
                handleClick: toggleAddingRider,
                tooltipTitle: t('createRider'),
                Icon: PersonAddIcon
            })
        }

        if (userPermissions.includes(permissions.DELETE_GUARDIAN)) {
            builtActionItems.push({
                handleClick: deleteGuardianAction,
                tooltipTitle: t('deleteGuardian'),
                Icon: DeleteForeverIcon
            })
        }

        return builtActionItems
    }, [deleteGuardianAction, heaviestRole, t])

    const lists = useMemo(() => {
        const filteredRiders = riders.filter((r: RiderType) => guardian?.riderIds?.includes(r.id)) ?? []
        const mappedRiders = filteredRiders.map((r: RiderType) => ({ id: r.id, label: `${r.firstName} ${r.lastName}` }))
        return [
            {
                title: t('riders'),
                action: viewRiderDetail,
                items: mappedRiders
            }
        ]
    }, [t, viewRiderDetail, guardian, riders])

    const createRiderAction = async (newRider: RiderType) => {
        await createRider(newRider)
        toggleAddingRider()
        getGuardians()
    }

    const handleBack = () => {
        navigate('/app/guardians')
    }

    return (
        <>
            <CreateRiderDialog
                isAddingRider={isAddingRider}
                allGuardians={[]}
                guardianId={guardian?.id}
                allStops={stops.map((s) => ({ id: s.id, label: s.stopName }))}
                allSchools={schools.map((s) => ({ id: s.id, label: s.schoolName }))}
                createRider={createRiderAction}
                cancelAction={toggleAddingRider}
            />
            <EntityDrawer
                actionItems={actionItems}
                back={handleBack}
                lists={lists}
                open={open}
                title={`${guardian?.firstName} ${guardian?.lastName}`}
            />
        </>
    )
}

export default GuardianDrawer