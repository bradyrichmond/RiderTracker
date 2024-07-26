import { useCallback, useMemo, useState } from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useRiderStore } from '@/store/RiderStore'
import EntityDrawer, { DrawerListActionProps } from '@/components/EntityDrawer'
import CreateRiderDialog from '../Riders/CreateRiderDialog'
import { CreateRiderTypeInput, RiderType, UserType } from '@/types/AmplifyTypes'
import { useUserStore } from '@/store/UserStore'

interface GuardianDrawerProps {
    open: boolean
    guardian?: UserType
}

const GuardianDrawer = ({ open, guardian }: GuardianDrawerProps) => {
    const [isAddingRider, setIsAddingRider] = useState(false)
    const riders = useRiderStore().riders
    const createRider = useRiderStore().createRider
    const updateUsers = useUserStore().updateUsers
    const navigate = useNavigate()
    const { t } = useTranslation('guardians')

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

        return builtActionItems
    }, [t])

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
        updateUsers()
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