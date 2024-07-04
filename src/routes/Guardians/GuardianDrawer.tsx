import { useCallback, useMemo, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useRiderStore } from '@/store/RiderStore'
import EntityDrawer, { DrawerListActionProps } from '@/components/EntityDrawer'
import { useGuardianStore } from '@/store/GuardianStore'
import { useStopStore } from '@/store/StopStore'
import CreateRiderDialog from '../Riders/CreateRiderDialog'
import { CreateRiderTypeInput, RiderType, UserType } from '@/types/AmplifyTypes'

interface GuardianDrawerProps {
    open: boolean
    guardian?: UserType
}

const GuardianDrawer = ({ open, guardian }: GuardianDrawerProps) => {
    const [isAddingRider, setIsAddingRider] = useState(false)
    const { getGuardians, deleteGuardian } = useGuardianStore()
    const { riders, createRider } = useRiderStore()
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

        builtActionItems.push({
            handleClick: toggleAddingRider,
            tooltipTitle: t('createRider'),
            Icon: PersonAddIcon
        })
        builtActionItems.push({
            handleClick: deleteGuardianAction,
            tooltipTitle: t('deleteGuardian'),
            Icon: DeleteForeverIcon
        })

        return builtActionItems
    }, [deleteGuardianAction, t])

    const lists = useMemo(() => {
        const filteredRiders = riders
        const mappedRiders = filteredRiders.map((r: RiderType) => ({ id: r.id, label: `${r.firstName} ${r.lastName}` }))
        return [
            {
                title: t('riders'),
                action: viewRiderDetail,
                items: mappedRiders
            }
        ]
    }, [t, viewRiderDetail, riders])

    const createRiderAction = async (newRider: CreateRiderTypeInput) => {
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
                allStops={stops.map((s) => ({ id: s.id, label: s.name }))}
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