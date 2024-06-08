import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AddRoadIcon from '@mui/icons-material/AddRoad'
import BuildIcon from '@mui/icons-material/Build'
import AddStopToRiderDialog from './AddStopToRiderDialog'
import AddGuardianToRiderDialog from './AddGuardianToRiderDialog'
import AddExceptionToRiderDialog from './AddExceptionToRiderDialog'

const RiderSpeedDial = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [isAddingException, setIsAddingException] = useState<boolean>(false)
    const [isAddingGuardian, setIsAddingGuardian] = useState<boolean>(false)
    const [isAddingStop, setIsAddingStop] = useState<boolean>(false)
    const { t } = useTranslation('riders')

    const toggleAddingException = useCallback(() => {
        setIsAddingException((cur) => !cur)
    }, [setIsAddingException])

    const toggleAddingGuardian = useCallback(() => {
        setIsAddingGuardian((cur) => !cur)
    }, [setIsAddingGuardian])

    const toggleAddingStop = useCallback(() => {
        setIsAddingStop((cur) => !cur)
    }, [setIsAddingStop])

    const actions = useMemo(() => [
        {
            icon: <BuildIcon />,
            name: t('addException'),
            action: toggleAddingException
        },
        {
            icon: <PersonAddIcon />,
            name: t('addGuardian'),
            action: toggleAddingGuardian
        },
        {
            icon: <AddRoadIcon />,
            name: t('addStop'),
            action: toggleAddingStop
        }
    ], [t, toggleAddingException, toggleAddingGuardian, toggleAddingStop])

    const toggleOpen = () => {
        setOpen((cur) => !cur)
    }

    return (
        <>
            <AddExceptionToRiderDialog isAddingException={isAddingException} cancelAction={toggleAddingException} />
            <AddGuardianToRiderDialog isAddingGuardian={isAddingGuardian} cancelAction={toggleAddingGuardian} />
            <AddStopToRiderDialog isAddingStop={isAddingStop} cancelAction={toggleAddingStop} />
            <Box sx={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ position: 'absolute' }}>
                    <SpeedDial
                        ariaLabel='rider actions'
                        icon={<SpeedDialIcon />}
                        direction='down'
                        open={open}
                        onClick={toggleOpen}
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={action.action}
                            />
                        ))}
                    </SpeedDial>
                </Box>
            </Box>
        </>
    )
}

export default RiderSpeedDial