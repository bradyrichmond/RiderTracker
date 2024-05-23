import { NavItemType } from '../components/NavigationDrawer'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import WorkIcon from '@mui/icons-material/Work'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import ArticleIcon from '@mui/icons-material/Article'
import PersonIcon from '@mui/icons-material/Person'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import SchoolIcon from '@mui/icons-material/School'
import { ComponentType, FC } from 'react'
import ToggleLightMode from '@/components/ToggleLightMode'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import LoginIcon from '@mui/icons-material/Login'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import MapIcon from '@mui/icons-material/Map'
import ChangeLanguage from '@/components/ChangeLanguage'

export interface SettingsItemType extends Omit<NavItemType, 'Icon'> {
    action?(): Promise<void>
    Component?: FC
    Icon?: ComponentType
}

const ALL_ROUTES: string[] = [
    '/app',
    '/app/buses',
    '/app/buses/:id',
    '/app/drivers',
    '/app/drivers/:id',
    '/app/guardians',
    '/app/guardians/:id',
    '/app/settings',
    '/app/riders',
    '/app/riders/:id',
    '/app/routes',
    '/app/routes/:id',
    '/app/scans',
    '/app/scans/:id',
    '/app/schools',
    '/app/schools/:id',
    '/app/stops',
    '/app/stops/:stopsId'
];

const ORG_ADMIN_ROUTES: string[] = [
    '/app',
    '/app/buses',
    '/app/buses/:id',
    '/app/drivers',
    '/app/drivers/:id',
    '/app/guardians',
    '/app/guardians/:id',
    '/app/settings',
    '/app/riders',
    '/app/riders/:id',
    '/app/routes',
    '/app/routes/:id',
    '/app/scans',
    '/app/scans/:id',
    '/app/stops',
    '/app/stops/:stopId',
    '/app/schools',
    '/app/schools/:id'
]

const DRIVER_ROUTES: string[] = [
    '/app',
    '/app/buses',
    '/app/buses/:id',
    '/app/drivers/:id',
    '/app/riders/:id',
    '/app/routes',
    '/app/routes/:id',
    '/app/settings'
]

const GUARDIAN_ROUTES: string[] = [
    '/app',
    '/app/buses/:id',
    '/app/drivers/:id',
    '/app/riders',
    '/app/settings',
    '/app/riders/:id'
]

const UNAUTH_ROUTES: string[] = [
    '/login',
    '/logout',
    '/onboarding'
]

const WIZARD_NAV_ITEMS: NavItemType[] = [
    {
        path: '/app/buses',
        label: 'Buses',
        Icon: DirectionsBusIcon
    },
    {
        path: '/app/drivers',
        label: 'Drivers',
        Icon: WorkIcon
    },
    {
        path: '/app/guardians',
        label: 'Guardians',
        Icon: PersonIcon
    },
    {
        path: '/app/riders',
        label: 'Riders',
        Icon: ChildCareIcon
    },
    {
        path: '/app/riders',
        label: 'Routes',
        Icon: MapIcon
    },
    {
        path: '/app/scans',
        label: 'Scans',
        Icon: ArticleIcon
    },
    {
        path: '/app/schools',
        label: 'Schools',
        Icon: SchoolIcon
    }
]

const ORG_ADMIN_NAV_ITEMS: NavItemType[] = [
    {
        path: '/app/buses',
        label: 'Buses',
        Icon: DirectionsBusIcon
    },
    {
        path: '/app/drivers',
        label: 'Drivers',
        Icon: WorkIcon
    },
    {
        path: '/app/guardians',
        label: 'Guardians',
        Icon: PersonIcon
    },
    {
        path: '/app/riders',
        label: 'Riders',
        Icon: ChildCareIcon
    },
    {
        path: '/app/routes',
        label: 'Routes',
        Icon: MapIcon
    },
    {
        path: '/app/scans',
        label: 'Scans',
        Icon: ArticleIcon
    },
    {
        path: '/app/schools',
        label: 'Schools',
        Icon: SchoolIcon
    }
]

const DRIVER_NAV_ITEMS: NavItemType[] = [
    {
        path: '/app/buses',
        label: 'Buses',
        Icon: DirectionsBusIcon
    },
    {
        path: '/app/drivers',
        label: 'Drivers',
        Icon: WorkIcon
    },
    {
        path: '/app/riders',
        label: 'Riders',
        Icon: ChildCareIcon
    }
]

const GUARDIAN_NAV_ITEMS: NavItemType[] = [
    {
        path: '/app/riders',
        label: 'Riders',
        Icon: ChildCareIcon
    }
]

const UNAUTH_NAV_ITEMS: NavItemType[] = [
    {
        path: '/onboarding',
        label: 'Sign Up',
        Icon: AddCircleOutlineIcon
    },
    {
        path: '/login',
        label: 'Log in',
        Icon: LoginIcon
    }
]

const SETTINGS_NAV_ITEMS: SettingsItemType[] = [
    {
        Component: ToggleLightMode,
        path: '',
        label: 'ToggleLightMode'
    },
    {
        Component: ChangeLanguage,
        path: '',
        label: 'Change Language'
    },
    {
        path: '/app/settings',
        label: 'Settings',
        Icon: AccountBoxIcon
    },
    {
        path: '/logout',
        label: 'Log Out',
        Icon: PowerSettingsNewIcon
    }
]

interface RouteProtectionItem {
    name: string,
    routes: string[],
    navItems: NavItemType[],
    settingsItems: SettingsItemType[]
}

export const ROUTE_PROTECTION: RouteProtectionItem[] = [
    {
        name: 'RiderTracker_Wizard',
        routes: ALL_ROUTES,
        navItems: WIZARD_NAV_ITEMS,
        settingsItems: SETTINGS_NAV_ITEMS
    },
    {
        name: 'RiderTracker_OrgAdmin',
        routes: ORG_ADMIN_ROUTES,
        navItems: ORG_ADMIN_NAV_ITEMS,
        settingsItems: SETTINGS_NAV_ITEMS
    },
    {
        name: 'RiderTracker_Driver',
        routes: DRIVER_ROUTES,
        navItems: DRIVER_NAV_ITEMS,
        settingsItems: SETTINGS_NAV_ITEMS
    },
    {
        name: 'RiderTracker_Guardian',
        routes: GUARDIAN_ROUTES,
        navItems: GUARDIAN_NAV_ITEMS,
        settingsItems: SETTINGS_NAV_ITEMS
    },
    {
        name: 'RiderTracker_Unauthenticated',
        routes: UNAUTH_ROUTES,
        navItems: UNAUTH_NAV_ITEMS,
        settingsItems: []
    }
]
