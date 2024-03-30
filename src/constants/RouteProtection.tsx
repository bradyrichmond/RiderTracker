import { NavItemType } from "../components/NavigationDrawer"
import { RIDERTRACKER_ROLES } from "./Roles"
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import WorkIcon from '@mui/icons-material/Work'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import ArticleIcon from '@mui/icons-material/Article'
import CorporateFareIcon from '@mui/icons-material/CorporateFare'
import PersonIcon from '@mui/icons-material/Person'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import { signOut } from 'aws-amplify/auth'

interface SettingsItemType extends NavItemType {
    action?(): Promise<void>
}

const ALL_ROUTES: string[] = [
    "/",
    "/buses",
    "/buses/:id",
    "/drivers",
    "/drivers/:id",
    "/guardians",
    "/guardians/:id",
    "/organizations",
    "/organizations/:id",
    "/organizations/:id/buses",
    "/organizations/:id/drivers",
    "/organizations/:id/guardians",
    "/organizations/:id/riders",
    "/organizations/:id/scans",
    "/riders",
    "/riders/:id",
    "/riders/:id/scans",
    "/scans",
    "/scans/:id"
];

const ORG_ADMIN_ROUTES: string[] = [
    "/",
    "/buses/:id",
    "/drivers/:id",
    "/guardians/:id",
    "/organizations/:id",
    "/organizations/:id/buses",
    "/organizations/:id/drivers",
    "/organizations/:id/guardians",
    "/organizations/:id/riders",
    "/organizations/:id/scans",
    "/riders/:id",
    "/riders/:id/scans",
    "/scans/:id"
]

const DRIVER_ROUTES: string[] = [
    "/",
    "/buses",
    "/buses/:id",
    "/drivers/:id",
    "/riders/:id",
    "/organizations/:id/buses",
    "/organizations/:id/drivers"
]

const GUARDIAN_ROUTES: string[] = [
    "/",
    "/buses/:id",
    "/drivers/:id",
    "/my-riders",
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
        path: '/organizations',
        label: 'Organizations',
        Icon: CorporateFareIcon
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
        action: signOut,
        path: '',
        label: 'Log Out',
        Icon: PowerSettingsNewIcon
    }
]

export const ROUTE_PROTECTION = [
    {
        name: RIDERTRACKER_ROLES.WIZARD,
        routes: ALL_ROUTES,
        navItems: WIZARD_NAV_ITEMS,
        settingsItems: SETTINGS_NAV_ITEMS
    },
    {
        name: RIDERTRACKER_ROLES.ORG_ADMIN,
        routes: ORG_ADMIN_ROUTES,
        navItems: ORG_ADMIN_NAV_ITEMS,
        settingsItems: SETTINGS_NAV_ITEMS
    },
    {
        name: RIDERTRACKER_ROLES.DRIVER,
        routes: DRIVER_ROUTES,
        navItems: DRIVER_NAV_ITEMS,
        settingsItems: SETTINGS_NAV_ITEMS
    },
    {
        name: RIDERTRACKER_ROLES.GUARDIAN,
        routes: GUARDIAN_ROUTES,
        navItems: GUARDIAN_NAV_ITEMS,
        settingsItems: SETTINGS_NAV_ITEMS
    }
]
