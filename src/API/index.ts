import { AddressApiFunctionTypes, AddressApis } from './AddressApis'
import { AdminApis, AdminApiFunctionTypes } from './AdminApis'
import { BusApis, BusApiFunctionTypes } from './BusApis'
import { ExceptionApiFunctionTypes, ExceptionApis } from './ExceptionApis'
import { OrgApis, OrgApiFunctionTypes } from './OrganizationApis'
import { RiderApis, RiderApiFunctionTypes } from './RiderApis'
import { RouteActionApiFunctionTypes, RouteActionApis } from './RouteActionApis'
import { RouteApis, RouteApiFunctionTypes } from './RouteApis'
import { ScanApis, ScanApiFunctionTypes } from './ScanApis'
import { SchoolApis, SchoolApiFunctionTypes } from './SchoolApis'
import { StopApis, StopApiFunctionTypes } from './StopApis'
import { UserApis, UserApiFunctionTypes } from './UserApis'
import { ApiGatewayClientType, generateApiGatewayClient } from '@/helpers/GenerateApiGatewayClient'

export const API_BASE_NAME = 'https://uqz8uvqzcl.execute-api.us-west-2.amazonaws.com/DEV' // this will need to change with environment

class RiderTrackerAPI {
    client: ApiGatewayClientType
    addresses: AddressApiFunctionTypes
    admin: AdminApiFunctionTypes
    buses: BusApiFunctionTypes
    exceptions: ExceptionApiFunctionTypes
    organizations: OrgApiFunctionTypes
    riders: RiderApiFunctionTypes
    routeActions: RouteActionApiFunctionTypes
    routes: RouteApiFunctionTypes
    scans: ScanApiFunctionTypes
    schools: SchoolApiFunctionTypes
    stops: StopApiFunctionTypes
    users: UserApiFunctionTypes

    private constructor(newClient: ApiGatewayClientType) {
        this.client = newClient
        this.addresses = new AddressApis(newClient)
        this.admin = new AdminApis(newClient)
        this.buses = new BusApis(newClient)
        this.exceptions = new ExceptionApis(newClient)
        this.organizations = new OrgApis(newClient)
        this.riders = new RiderApis(newClient)
        this.routeActions = new RouteActionApis(newClient)
        this.routes = new RouteApis(newClient)
        this.scans = new ScanApis(newClient)
        this.schools = new SchoolApis(newClient)
        this.stops = new StopApis(newClient)
        this.users = new UserApis(newClient)
    }

    static async getClient() {
        const newClient = await generateApiGatewayClient()
        return new RiderTrackerAPI(newClient)
    }
}

export default RiderTrackerAPI
