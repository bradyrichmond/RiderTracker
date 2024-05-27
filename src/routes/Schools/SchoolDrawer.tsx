import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { useEffect, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { OptionsType } from '@/types/FormTypes'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/UserStore'
import { useRiderStore } from '@/store/RiderStore'
import EntityDrawer, { DrawerListActionProps, DrawerListItem } from '@/components/EntityDrawer'
import { useSchoolStore } from '@/store/SchoolStore'
import { SchoolType } from '@/types/SchoolType'
import CreateSchoolDialog from './CreateSchoolDialog'

interface RouteDrawerProps {
    open: boolean
    schoolId: string
}

const RouteDrawer = ({ open, schoolId }: RouteDrawerProps) => {
    const [isAddingSchool, setIsAddingSchool] = useState<boolean>(false)
    const [schoolName, setSchoolName] = useState<string>('')
    const [lists, setLists] = useState<DrawerListItem[]>([])
    const [actionItems, setActionItems] = useState<DrawerListActionProps[]>([])
    const { createSchool, deleteSchool, getSchoolById } = useSchoolStore()
    const { heaviestRole } = useUserStore()
    const { getBulkRidersById } = useRiderStore()
    const navigate = useNavigate()
    const { t } = useTranslation('routes')

    useEffect(() => {
        if (schoolId) {
            getSchoolData()
        }
    }, [schoolId])

    const getSchoolData = async () => {
        const fetchedSchool = await getSchoolById(schoolId)

        if (fetchedSchool) {
            setSchoolName(fetchedSchool.schoolName)
            await getRidersForSchool(fetchedSchool.riderIds ?? [])
            buildActionItems()
        }
    }

    const buildActionItems = () => {
        const builtActionItems: DrawerListActionProps[] = []
        const userPermissions = RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole]

        if (userPermissions.includes(permissions.DELETE_SCHOOL)) {
            builtActionItems.push({
                handleClick: deleteSchoolAction,
                tooltipTitle: t('deleteSchool'),
                Icon: DeleteForeverIcon
            })
        }

        setActionItems(builtActionItems)
    }

    const buildLists = (localRiders: OptionsType[]) => {
        const builtLists = [
            {
                title: t('riders'),
                action: viewRiderDetail,
                items: localRiders
            }
        ]

        setLists(builtLists)
    }

    const getRidersForSchool = async (riderIds: string[]) => {
        const riders = await getBulkRidersById(riderIds)
        const mappedRiders = riders.map((r) => ({ id: r.id, label: `${r.firstName} ${r.lastName}` }))
        buildLists(mappedRiders)
    }

    const toggleAddingSchool = () => {
        setIsAddingSchool((current) => !current)
    }

    const deleteSchoolAction = async () => {
        await deleteSchool(schoolId)
    }

    const createSchoolAction = async (newSchool: SchoolType) => {
        await createSchool(newSchool, newSchool.address)
        toggleAddingSchool()
    }

    const viewRiderDetail = (riderId: string) => {
        navigate(`/app/riders/${riderId}`)
    }

    const handleBack = () => {
        navigate('/app/schools')
    }

    return (
        <>
            <CreateSchoolDialog open={isAddingSchool} createSchool={createSchoolAction} cancelAction={toggleAddingSchool} />
            <EntityDrawer
                actionItems={actionItems}
                back={handleBack}
                lists={lists}
                open={open}
                title={schoolName}
            />
        </>
    )
}

export default RouteDrawer