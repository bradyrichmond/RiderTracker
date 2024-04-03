import { BusApis, BusApiFunctionTypes } from './BusApis'
import { DriverApis, DriverApiFunctionTypes } from './DriverApis'
import { GuardianApis, GuardianApiFunctionTypes } from './GuardianApis'
import { OrganizationApis, OrganizationApiFunctionTypes } from './OrganizationApis'
import { RiderApis, RiderApiFunctionTypes } from './RiderApis'
import { ScanApis, ScanApiFunctionTypes } from './ScanApis'

export const API_BASE_NAME = 'https://gkupwyoi70.execute-api.us-west-2.amazonaws.com/dev' // this will need to change with environment

export interface ApiFunction {
    (...args: any[]): Promise<any>
}

class RiderTrackerAPI {
    token: string
    buses: BusApiFunctionTypes
    drivers: DriverApiFunctionTypes
    guardians: GuardianApiFunctionTypes
    organizations: OrganizationApiFunctionTypes
    riders: RiderApiFunctionTypes
    scans: ScanApiFunctionTypes

    constructor(token: string) {
        this.token = token
        this.buses = BusApis
        this.drivers = DriverApis
        this.guardians = GuardianApis
        this.organizations = OrganizationApis
        this.riders = RiderApis
        this.scans = ScanApis
    }

    getToken() {
        return this.token
    }

    async execute(apiFunction: ApiFunction, args: any[]) {
        // Example use: api.execute(api.riders.getRidersForOrganization, [organizationId])
        try {
            return await this.callApiFunction(apiFunction, args);
        } catch (error) {
            throw error;
        }
    }

    private async callApiFunction(apiFunction: ApiFunction, ...args: any[]): Promise<any> {
        const modifiedArgs = [this.token, ...args];
        return await apiFunction(...modifiedArgs);
    }

}

export default RiderTrackerAPI
