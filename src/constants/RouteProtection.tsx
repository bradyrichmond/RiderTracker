import { NavItemType } from "../components/NavigationDrawer"
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import WorkIcon from '@mui/icons-material/Work'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import ArticleIcon from '@mui/icons-material/Article'
import PersonIcon from '@mui/icons-material/Person'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import PlaceIcon from '@mui/icons-material/Place'
import SchoolIcon from '@mui/icons-material/School'
import { FC } from "react"
import ToggleLightMode from "@/components/ToggleLightMode"
import AccountBoxIcon from '@mui/icons-material/AccountBox'

interface SettingsItemType extends NavItemType {
    action?(): Promise<void>
    Component?: FC
}

const ALL_ROUTES: string[] = [
    "/",
    "/buses",
    "/buses/:id",
    "/drivers",
    "/drivers/:id",
    "/guardians",
    "/guardians/:id",
    "/settings",
    "/riders",
    "/riders/:id",
    "/riders/:id/scans",
    "/scans",
    "/scans/:id",
    "/schools",
    "/schools/:id",
    "/stops",
    "/stops/:id"
];

const ORG_ADMIN_ROUTES: string[] = [
    "/",
    "/buses/:id",
    "/drivers/:id",
    "/guardians/:id",
    "/settings",
    "/riders/:id",
    "/riders/:id/scans",
    "/scans/:id",
    "/stops/:id",
    "/schools",
    "/schools/:id"
]

const DRIVER_ROUTES: string[] = [
    "/",
    "/buses",
    "/buses/:id",
    "/drivers/:id",
    "/riders/:id",
    "/settings"
]

const GUARDIAN_ROUTES: string[] = [
    "/",
    "/buses/:id",
    "/drivers/:id",
    "/riders",
    "/settings",
    "/riders/:id"
]

const WIZARD_NAV_ITEMS: NavItemType[] = [
    {
        path: '/buses',
        label: 'Buses',
        Icon: DirectionsBusIcon
    },
    {
        path: '/drivers',
        label: 'Drivers',
        Icon: WorkIcon
    },
    {
        path: '/guardians',
        label: 'Guardians',
        Icon: PersonIcon
    },
    {
        path: '/riders',
        label: 'Riders',
        Icon: ChildCareIcon
    },
    {
        path: '/scans',
        label: 'Scans',
        Icon: ArticleIcon
    },
    {
        path: '/schools',
        label: 'Schools',
        Icon: SchoolIcon
    },
    {
        path: '/stops',
        label: 'Stops',
        Icon: PlaceIcon
    }
]

const ORG_ADMIN_NAV_ITEMS: NavItemType[] = [
    {
        path: '/organizations/:id/buses',
        label: 'Buses',
        Icon: DirectionsBusIcon
    },
    {
        path: '/organizations/:id/drivers',
        label: 'Drivers',
        Icon: WorkIcon
    },
    {
        path: '/organizations/:id/guardians',
        label: 'Guardians',
        Icon: PersonIcon
    },
    {
        path: '/organizations/:id/riders',
        label: 'Riders',
        Icon: ChildCareIcon
    },
    {
        path: '/organizations/:id/scans',
        label: 'Scans',
        Icon: ArticleIcon
    },
    {
        path: '/schools',
        label: 'Schools',
        Icon: SchoolIcon
    },
    {
        path: '/organizations/:id/stops',
        label: 'Stops',
        Icon: PlaceIcon
    }
]

const DRIVER_NAV_ITEMS: NavItemType[] = [
    {
        path: '/organizations/:id/buses',
        label: 'Buses',
        Icon: DirectionsBusIcon
    },
    {
        path: '/organizations/:id/drivers',
        label: 'Drivers',
        Icon: WorkIcon
    },
    {
        path: '/organizations/:id/riders',
        label: 'Riders',
        Icon: ChildCareIcon
    }
]

const GUARDIAN_NAV_ITEMS: NavItemType[] = [
    {
        path: '/my-riders',
        label: 'Riders',
        Icon: ChildCareIcon
    }
]

const SETTINGS_NAV_ITEMS: SettingsItemType[] = [
    {
        Component: ToggleLightMode,
        path: '',
        label: 'ToggleLightMode',
        Icon: PowerSettingsNewIcon
    },
    {
        path: '/settings',
        label: 'Settings',
        Icon: AccountBoxIcon
    },
    {
        path: '/logout',
        label: 'Log Out',
        Icon: PowerSettingsNewIcon
    }
]

export const ROUTE_PROTECTION = [
    {
        name: "RiderTracker_Wizard",
        routes: ALL_ROUTES,
        navItems: WIZARD_NAV_ITEMS,
        settingsItems: SETTINGS_NAV_ITEMS
    },
    {
        name: "RiderTracker_OrgAdmin",
        routes: ORG_ADMIN_ROUTES,
        navItems: ORG_ADMIN_NAV_ITEMS,
        settingsItems: SETTINGS_NAV_ITEMS
    },
    {
        name: "RiderTracker_Driver",
        routes: DRIVER_ROUTES,
        navItems: DRIVER_NAV_ITEMS,
        settingsItems: SETTINGS_NAV_ITEMS
    },
    {
        name: "RiderTracker_Guardian",
        routes: GUARDIAN_ROUTES,
        navItems: GUARDIAN_NAV_ITEMS,
        settingsItems: SETTINGS_NAV_ITEMS
    }
]
