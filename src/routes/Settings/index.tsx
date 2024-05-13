import { Box, Tab, Tabs } from "@mui/material"
import { SyntheticEvent, useContext, useMemo, useState } from "react"
import Profile from "./Profile"
import Organization from "./Organization"
import { RoleContext } from "@/contexts/RoleContextProvider"
import { ROLE_WEIGHTS } from "@/constants/RoleWeights"
import { RIDER_TRACKER_ROLES } from "@/constants/Roles"
import { useTranslation } from 'react-i18next'

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    }
}

const Settings = () => {
    const [activeTab, setActiveTab] = useState<number>(0)
    const { heaviestRole } = useContext(RoleContext)
    const { t } = useTranslation('settings')
    const roleWeight = useMemo(() => {
        return ROLE_WEIGHTS[heaviestRole]
    }, [heaviestRole])

    const handleChange = (_e: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue)
    }

    return (
        <Box height='100%' width='100%' display='flex' flexDirection='column'>
            <Tabs value={activeTab} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Profile" {...a11yProps(0)} />
                {roleWeight <= ROLE_WEIGHTS[RIDER_TRACKER_ROLES.RIDER_TRACKER_ORGADMIN] ?
                    <Tab label={t('orgSettings')} {...a11yProps(1)} />
                    :
                    null
                }
            </Tabs>
            <CustomTabPanel value={activeTab} index={0}>
                <Profile />
            </CustomTabPanel>
            {roleWeight <= ROLE_WEIGHTS[RIDER_TRACKER_ROLES.RIDER_TRACKER_ORGADMIN] ?
                <CustomTabPanel value={activeTab} index={1}>
                    <Organization />
                </CustomTabPanel>
                :
                null
            }
        </Box>
    )
}

export default Settings