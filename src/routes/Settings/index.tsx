import { Box, Tab, Tabs } from "@mui/material"
import { SyntheticEvent, useState } from "react"
import Profile from "./Profile";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
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
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Settings = () => {
    const [activeTab, setActiveTab] = useState<number>(0)

    const handleChange =  (_e: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue)
    }

    return (
        <Box height='100%' width='100%' display='flex' flexDirection='column'>
            <Tabs value={activeTab} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Profile" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
            <CustomTabPanel value={activeTab} index={0}>
                <Profile />
            </CustomTabPanel>
        </Box>
    )
}

export default Settings