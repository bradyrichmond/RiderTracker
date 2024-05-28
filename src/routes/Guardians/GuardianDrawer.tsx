import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { useEffect, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { OptionsType } from '@/types/FormTypes'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useOrgStore } from '@/store/OrgStore'
import { useUserStore } from '@/store/UserStore'
import { useRiderStore } from '@/store/RiderStore'
import EntityDrawer, { DrawerListActionProps, DrawerListItem } from '@/components/EntityDrawer'
import { useGuardianStore } from '@/store/GuardianStore'
import { GuardianType } from '@/types/UserType'
import { RiderType } from '@/types/RiderType'
import CreateRiderDialog from '../Riders/CreateRiderDialog'
import { useStopStore } from '@/store/StopStore'
import { StopType } from '@/types/StopType'
import { useSchoolStore } from '@/store/SchoolStore'
import { SchoolType } from '@/types/SchoolType'

interface GuardianDrawerProps {
    open: boolean
    guardianId: string
}

const GuardianDrawer = ({ open, guardianId }: GuardianDrawerProps) => {
    const [isAddingRider, setIsAddingRider] = useState(false)
    const [guardian, setGuardian] = useState<GuardianType>()
    const [lists, setLists] = useState<DrawerListItem[]>([])
    const [actionItems, setActionItems] = useState<DrawerListActionProps[]>([])
    const [allStops, setAllStops] = useState<OptionsType[]>([])
    const [allSchools, setAllSchools] = useState<OptionsType[]>([])
    const { orgId } = useOrgStore()
    const { heaviestRole } = useUserStore()
    const { getGuardianById, getGuardians, deleteGuardian } = useGuardianStore()
    const { getBulkRidersById, createRider } = useRiderStore()
    const { getSchools, schools } = useSchoolStore()
    const { getStops, stops } = useStopStore()
    const navigate = useNavigate()
    const { t } = useTranslation('guardians')

    useEffect(() => {
        if (guardianId) {
            getGuardianData()
        }
    }, [guardianId, orgId])

    const getGuardianData = async () => {
        const fetchedGuardian = await getGuardianById(guardianId)
        setGuardian(fetchedGuardian)

        if (fetchedGuardian) {

            if (fetchedGuardian.riderIds) {
                getRidersForGuardian(fetchedGuardian.riderIds)
            }

            await getStops()
            setAllStops(stops.map((s: StopType) => ({ id: s.id, label: s.stopName })))

            await getSchools()
            setAllSchools(schools.map((s: SchoolType) => ({ id: s.id, label: s.schoolName })))

            buildActionItems()
        }
    }

    const buildActionItems = () => {
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

        setActionItems(builtActionItems)
    }

    const buildLists = (riders: RiderType[]) => {
        const mappedRiders = riders.map((r: RiderType) => ({ id: r.id, label: `${r.firstName} ${r.lastName}` }))
        const builtLists = [
            {
                title: t('riders'),
                action: viewRiderDetail,
                items: mappedRiders
            }
        ]

        setLists(builtLists)
    }

    const getRidersForGuardian = async (riderIds: string[]) => {
        const riders = await getBulkRidersById(riderIds)
        buildLists(riders)
    }

    const toggleAddingRider = () => {
        setIsAddingRider((current) => !current)
    }

    const deleteGuardianAction = async () => {
        if (guardian) {
            await deleteGuardian(guardian)
            return
        }
    }

    const createRiderAction = async (newRider: RiderType) => {
        await createRider(newRider)
        toggleAddingRider()
        getGuardians()
    }

    const viewRiderDetail = (riderId: string) => {
        navigate(`/app/riders/${riderId}`)
    }

    const handleBack = () => {
        navigate('/app/guardians')
    }

    return (
        <>
            <CreateRiderDialog
                isAddingRider={isAddingRider}
                allGuardians={[]}
                guardianId={guardianId}
                allStops={allStops}
                allSchools={allSchools}
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