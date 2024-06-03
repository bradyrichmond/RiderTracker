import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { useCallback, useEffect, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/UserStore'
import EntityDrawer, { DrawerListActionProps } from '@/components/EntityDrawer'
import { UserType } from '@/types/UserType'
import { useDriverStore } from '@/store/DriverStore'

interface DriverDrawerProps {
    open: boolean
    driverId: string
}

const DriverDrawer = ({ open, driverId }: DriverDrawerProps) => {
    const [driver, setDriver] = useState<UserType>()
    const [actionItems, setActionItems] = useState<DrawerListActionProps[]>([])
    const { heaviestRole } = useUserStore()
    const { getDriverById, deleteDriver } = useDriverStore()
    const navigate = useNavigate()
    const { t } = useTranslation('guardians')



    const deleteDriverAction = useCallback(async () => {
        if (driver) {
            await deleteDriver(driver.id)
            return
        }
    }, [driver, deleteDriver])

    const buildActionItems = useCallback(() => {
        const builtActionItems: DrawerListActionProps[] = []
        const userPermissions = RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole]

        if (userPermissions.includes(permissions.DELETE_GUARDIAN)) {
            builtActionItems.push({
                handleClick: deleteDriverAction,
                tooltipTitle: t('deleteDriver'),
                Icon: DeleteForeverIcon
            })
        }

        setActionItems(builtActionItems)
    }, [setActionItems, deleteDriverAction, heaviestRole, t])

    useEffect(() => {
        const getDriverData = async () => {
            const fetchedDriver = await getDriverById(driverId)

            if (fetchedDriver) {
                setDriver(fetchedDriver)
                buildActionItems()
            }
        }

        if (driverId) {
            getDriverData()
        }
    }, [driverId, buildActionItems, setDriver, getDriverById])


    const handleBack = () => {
        navigate('/app/drivers')
    }

    return (
        <EntityDrawer
                actionItems={actionItems}
                back={handleBack}
                lists={[]}
                open={open}
                title={`${driver?.firstName} ${driver?.lastName}`}
            />
    )
}

export default DriverDrawer