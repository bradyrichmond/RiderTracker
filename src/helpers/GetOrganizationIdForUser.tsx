import { RIDER_TRACKER_ROLES } from "@/constants/Roles"
import * as orgApi from '@/API/OrganizationApis'
import * as driverApi from '@/API/DriverApis'
import * as guardianApi from '@/API/GuardianApis'
import { v4 as uuid } from 'uuid'
import { OrganizationType } from "@/types/OrganizationType"

export const getOrganizationIdForUser = async (token: string, userId: string, role: string): Promise<string | OrganizationType[]> => {
    switch (role) {
        case RIDER_TRACKER_ROLES.RIDER_TRACKER_WIZARD:
            return await orgApi.default.getOrganizations(token)
        case RIDER_TRACKER_ROLES.RIDER_TRACKER_ORGADMIN:
            const adminData = await orgApi.default.getOrganizationAdminById(token, uuid(), userId)
            return adminData.organizationId
        case RIDER_TRACKER_ROLES.RIDER_TRACKER_DRIVER:
            const driverData = await driverApi.default.getDriverById(token, userId)
            return driverData.organizationId
        case RIDER_TRACKER_ROLES.RIDER_TRACKER_DRIVER:
            const guardianData = await guardianApi.default.getGuardianById(token, userId)
            return guardianData.organizationId
        default:
            throw 'No org for this user'
    }
}