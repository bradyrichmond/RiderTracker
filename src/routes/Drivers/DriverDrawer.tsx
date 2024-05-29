import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { useCallback, useEffect, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/UserStore'
import EntityDrawer, { DrawerListActionProps } from '@/components/EntityDrawer'
import { UserType } from '@/types/UserType'
import CreateDriverDialog from './CreateDriverDialog'
import { useDriverStore } from '@/store/DriverStore'
import { CreateCognitoUserParams } from '@/API/AdminApis'

interface DriverDrawerProps {
    open: boolean
    driverId: string
}

const DriverDrawer = ({ open, driverId }: DriverDrawerProps) => {
    const [isAddingDriver, setIsAddingDriver] = useState(false)
    const [driver, setDriver] = useState<UserType>()
    const [actionItems, setActionItems] = useState<DrawerListActionProps[]>([])
    const { heaviestRole } = useUserStore()
    const { getDriverById, updateDrivers, createDriver, deleteDriver } = useDriverStore()
    const navigate = useNavigate()
    const { t } = useTranslation('guardians')

    const toggleAddingDriver = useCallback(() => {
        setIsAddingDriver((current) => !current)
    }, [setIsAddingDriver])

    const deleteDriverAction = useCallback(async () => {
        if (driver) {
            await deleteDriver(driver.id)
            return
        }
    }, [driver, deleteDriver])

    const buildActionItems = useCallback(() => {
        const builtActionItems: DrawerListActionProps[] = []
        const userPermissions = RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole]

        if (userPermissions.includes(permissions.CREATE_RIDER)) {
            builtActionItems.push({
                handleClick: toggleAddingDriver,
                tooltipTitle: t('createRider'),
                Icon: PersonAddIcon
            })
        }

        if (userPermissions.includes(permissions.DELETE_GUARDIAN)) {
            builtActionItems.push({
                handleClick: deleteDriverAction,
                tooltipTitle: t('deleteDriver'),
                Icon: DeleteForeverIcon
            })
        }

        setActionItems(builtActionItems)
    }, [setActionItems, deleteDriverAction, toggleAddingDriver, heaviestRole, t])

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

    const createDriverAction = async (newDriver: CreateCognitoUserParams) => {
        await createDriver(newDriver)
        toggleAddingDriver()
        updateDrivers()
    }

    const handleBack = () => {
        navigate('/app/drivers')
    }

    return (
        <>
            <CreateDriverDialog
                isAddingDriver={isAddingDriver}
                cancel={toggleAddingDriver}
                createDriver={createDriverAction}
            />
            <EntityDrawer
                actionItems={actionItems}
                back={handleBack}
                lists={[]}
                open={open}
                title={`${driver?.firstName} ${driver?.lastName}`}
            />
        </>
    )
}

export default DriverDrawer