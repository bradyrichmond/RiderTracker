import { useCallback, useMemo, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import InfoIcon from '@mui/icons-material/Info'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import EntityDrawer, { DrawerListActionProps } from '@/components/EntityDrawer'
import { SchoolRider, SelectionSetSchool, useSchoolStore } from '@/store/SchoolStore'
import CreateSchoolDialog from './CreateSchoolDialog'

interface RouteDrawerProps {
    open: boolean
    school?: SelectionSetSchool
}

const RouteDrawer = ({ open, school }: RouteDrawerProps) => {
    const [isAddingSchool, setIsAddingSchool] = useState<boolean>(false)
    const deleteSchool = useSchoolStore().deleteSchool
    const navigate = useNavigate()
    const { t } = useTranslation(['routes', 'common'])

    const deleteSchoolAction = useCallback(async () => {
        if (school) {
            await deleteSchool(school.id)
        }
    }, [deleteSchool, school])

    const viewRiderDetail = useCallback((riderId: string) => {
        navigate(`/app/riders/${riderId}`)
    }, [navigate])

    const viewSchoolDetail = useCallback(() => {
        navigate(`/app/schools/${school?.id}/detail`)
    }, [navigate, school])

    const actionItems = useMemo(() => {
        const builtActionItems: DrawerListActionProps[] = []

        builtActionItems.push({
            handleClick: deleteSchoolAction,
            tooltipTitle: t('deleteSchool'),
            Icon: DeleteForeverIcon
        })

        builtActionItems.push({
            handleClick: viewSchoolDetail,
            tooltipTitle: t('viewDetails', { ns: 'common' }),
            Icon: InfoIcon
        })

        return builtActionItems
    }, [deleteSchoolAction, viewSchoolDetail, t])

    const lists = useMemo(() => {
        if (school) {

            const mappedRiders = school.riders.map((r: SchoolRider) => ({ id: r.id, label: `${r.firstName} ${r.lastName}` }))
            const builtLists = [
                {
                    title: t('riders'),
                    action: viewRiderDetail,
                    items: mappedRiders
                }
            ]

            return builtLists
        }

        return []
    }, [t, viewRiderDetail, school])

    const toggleAddingSchool = () => {
        setIsAddingSchool((current) => !current)
    }

    const handleBack = () => {
        navigate('/app/schools')
    }

    return (
        <>
            <CreateSchoolDialog open={isAddingSchool} cancelAction={toggleAddingSchool} />
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