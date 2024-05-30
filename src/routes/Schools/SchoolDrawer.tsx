import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { useCallback, useMemo, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/UserStore'
import { useRiderStore } from '@/store/RiderStore'
import EntityDrawer, { DrawerListActionProps } from '@/components/EntityDrawer'
import { useSchoolStore } from '@/store/SchoolStore'
import { SchoolType } from '@/types/SchoolType'
import CreateSchoolDialog from './CreateSchoolDialog'
import { RiderType } from '@/types/RiderType'

interface RouteDrawerProps {
    open: boolean
    school?: SchoolType
}

const RouteDrawer = ({ open, school }: RouteDrawerProps) => {
    const [isAddingSchool, setIsAddingSchool] = useState<boolean>(false)
    const { createSchool, deleteSchool } = useSchoolStore()
    const heaviestRole = useUserStore().heaviestRole
    const riders = useRiderStore().riders
    const navigate = useNavigate()
    const { t } = useTranslation('routes')

    const deleteSchoolAction = useCallback(async () => {
        if (school) {
            await deleteSchool(school.id)
        }
    }, [deleteSchool, school])

    const viewRiderDetail = useCallback((riderId: string) => {
        navigate(`/app/riders/${riderId}`)
    }, [navigate])

    const actionItems = useMemo(() => {
        const builtActionItems: DrawerListActionProps[] = []
        const userPermissions = RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole]

        if (userPermissions.includes(permissions.DELETE_SCHOOL)) {
            builtActionItems.push({
                handleClick: deleteSchoolAction,
                tooltipTitle: t('deleteSchool'),
                Icon: DeleteForeverIcon
            })
        }

        return builtActionItems
    }, [deleteSchoolAction, heaviestRole, t])

    const lists = useMemo(() => {
        const filteredRiders = riders.filter((r: RiderType) => r.schoolId === school?.id)
        const mappedRiders = filteredRiders.map((r: RiderType) => ({ id: r.id, label: `${r.firstName} ${r.lastName}` }))
        const builtLists = [
            {
                title: t('riders'),
                action: viewRiderDetail,
                items: mappedRiders
            }
        ]

        return builtLists
    }, [t, viewRiderDetail, riders, school])

    const toggleAddingSchool = () => {
        setIsAddingSchool((current) => !current)
    }

    const createSchoolAction = async (newSchool: SchoolType) => {
        await createSchool(newSchool)
        toggleAddingSchool()
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
                title={school?.schoolName ?? 'loading...'}
            />
        </>
    )
}

export default RouteDrawer