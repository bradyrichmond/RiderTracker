import { Box, Tab, Tabs } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import Profile from './UserSettings/Profile'
import Organization from './OrganizationSettings/Organization'
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
            style={{ height: '100%', width: '100%' }}
        >
            {value === index && (
                <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
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
    const { t } = useTranslation('settings')

    const handleChange = (_e: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue)
    }

    return (
        <Box sx={{ display: 'flex', height: '100%', width: '100%', flexDirection: 'column' }}>
            <Tabs value={activeTab} onChange={handleChange} aria-label="settings tabs">
                [
                <Tab label={t('profile')} {...a11yProps(0)} key={0} />,
                <Tab label={t('orgSettings')} {...a11yProps(1)} key={1} />
                ]
            </Tabs>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                [
                <CustomTabPanel value={activeTab} index={0} key={0}>
                    <Profile />
                </CustomTabPanel>,
                <CustomTabPanel value={activeTab} index={1} key={1}>
                    <Organization />
                </CustomTabPanel>
                ]
            </Box>
        </Box>
    )
}

export default Settings