import { RIDER_TRACKER_ROLES } from '@/constants/Roles'
import * as orgApi from '@/API/OrganizationApis'
import * as userApi from '@/API/UserApis'
import { v4 as uuid } from 'uuid'
import { OrganizationType } from '@/types/OrganizationType'

export const getOrgIdForUser = async (userId: string, role: string): Promise<string | string[]> => {
    if (role === RIDER_TRACKER_ROLES.RIDER_TRACKER_WIZARD) {
        const wizardData: OrganizationType[] = await orgApi.default.getOrganizations()
        const mappedOrgIds: string[] = wizardData.map((w: OrganizationType) => w.id)
        return mappedOrgIds
    }

    if (role === RIDER_TRACKER_ROLES.RIDER_TRACKER_ORGADMIN) {
        const adminData = await userApi.default.getUserById(uuid(), userId)
        return adminData.orgId
    }

    if (role === RIDER_TRACKER_ROLES.RIDER_TRACKER_DRIVER) {
        const driverData = await userApi.default.getUserById(uuid(), userId)
        return driverData.orgId
    }

    if (role === RIDER_TRACKER_ROLES.RIDER_TRACKER_GUARDIAN) {
        const guardianData = await userApi.default.getGuardianById(uuid(), userId)
        return guardianData.orgId
    }

    throw 'No org for this user'
}