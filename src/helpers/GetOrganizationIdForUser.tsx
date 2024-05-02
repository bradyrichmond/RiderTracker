import { RIDER_TRACKER_ROLES } from "@/constants/Roles"
import * as orgApi from '@/API/OrganizationApis'
import * as userApi from '@/API/UserApis'
import { v4 as uuid } from 'uuid'
import { OrganizationType } from "@/types/OrganizationType"

export const getOrganizationIdForUser = async (userId: string, role: string): Promise<string | OrganizationType[]> => {
    switch (role) {
        case RIDER_TRACKER_ROLES.RIDER_TRACKER_WIZARD:
            const wizardData = await orgApi.default.getOrganizations()
            return wizardData
        case RIDER_TRACKER_ROLES.RIDER_TRACKER_ORGADMIN:
            const adminData = await userApi.default.getUserById(uuid(), userId)
            return adminData.organizationId
        case RIDER_TRACKER_ROLES.RIDER_TRACKER_DRIVER:
            const driverData = await userApi.default.getUserById(uuid(), userId)
            return driverData.organizationId
        case RIDER_TRACKER_ROLES.RIDER_TRACKER_DRIVER:
            const guardianData = await userApi.default.getGuardianById(uuid(), userId)
            return guardianData.organizationId
        default:
            throw 'No org for this user'
    }
}