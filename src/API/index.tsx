import AddressApis, { AddressApiFunctionTypes } from './AddressApis'
import AdminApis, { AdminApiFunctionTypes } from './AdminApis'
import BusApis, { BusApiFunctionTypes } from './BusApis'
import OrganizationApis, { OrganizationApiFunctionTypes } from './OrganizationApis'
import RiderApis, { RiderApiFunctionTypes } from './RiderApis'
import RouteApis, { RouteApiFunctionTypes } from './RouteApis'
import ScanApis, { ScanApiFunctionTypes } from './ScanApis'
import SchoolApis, { SchoolApiFunctionTypes } from './SchoolApis'
import StopApis, { StopApiFunctionTypes } from './StopApis'
import UserApis, { UserApiFunctionTypes } from './UserApis'
import { ApiGatewayClientType, generateApiGatewayClient } from '@/helpers/GenerateApiGatewayClient'

export const API_BASE_NAME = 'https://uqz8uvqzcl.execute-api.us-west-2.amazonaws.com/DEV' // this will need to change with environment

let instance: RiderTrackerAPI;

class RiderTrackerAPI {
    client: ApiGatewayClientType
    addresses: AddressApiFunctionTypes
    admin: AdminApiFunctionTypes
    buses: BusApiFunctionTypes
    organizations: OrganizationApiFunctionTypes
    riders: RiderApiFunctionTypes
    routes: RouteApiFunctionTypes
    scans: ScanApiFunctionTypes
    schools: SchoolApiFunctionTypes
    stops: StopApiFunctionTypes
    users: UserApiFunctionTypes

    private constructor(newClient: ApiGatewayClientType) {
        this.client = newClient
        this.addresses = AddressApis
        this.admin = AdminApis
        this.buses = BusApis
        this.organizations = OrganizationApis
        this.riders = RiderApis
        this.routes = RouteApis
        this.scans = ScanApis
        this.schools = SchoolApis
        this.stops = StopApis
        this.users = UserApis
    }

    static async getClient(refreshUserCreds?: boolean) {
        if (!instance) {
            const newClient = await generateApiGatewayClient(refreshUserCreds)
            return new RiderTrackerAPI(newClient)
        }

        return instance
    }
}

export default RiderTrackerAPI
