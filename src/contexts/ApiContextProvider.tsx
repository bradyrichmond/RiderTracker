import { Dispatch, SetStateAction, createContext } from 'react';
import { PropsWithChildren, useState } from 'react'
import RiderTrackerAPI from '../API'
import { ApiGatewayClientType } from '@/helpers/GenerateApiGatewayClient';
import AddressApis, { AddressApiFunctionTypes } from '@/API/AddressApis';
import AdminApis, { AdminApiFunctionTypes } from '@/API/AdminApis';
import BusApis, { BusApiFunctionTypes } from '@/API/BusApis';
import OrganizationApis, { OrganizationApiFunctionTypes } from '@/API/OrganizationApis';
import RiderApis, { RiderApiFunctionTypes } from '@/API/RiderApis';
import ScanApis, { ScanApiFunctionTypes } from '@/API/ScanApis';
import SchoolApis, { SchoolApiFunctionTypes } from '@/API/SchoolApis';
import StopApis, { StopApiFunctionTypes } from '@/API/StopApis';
import UserApis, { UserApiFunctionTypes } from '@/API/UserApis';

class DefaultRiderTrackerApi implements RiderTrackerAPI {
    client: ApiGatewayClientType
    addresses: AddressApiFunctionTypes
    admin: AdminApiFunctionTypes
    buses: BusApiFunctionTypes
    organizations: OrganizationApiFunctionTypes
    riders: RiderApiFunctionTypes
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
        this.scans = ScanApis
        this.schools = SchoolApis
        this.stops = StopApis
        this.users = UserApis
    }

    static getClient() {
        const apigClient = apigClientFactory.newClient({ accessKey: '', secretKey: '', sessionToken: '', region: 'us-west-2' })
        return new DefaultRiderTrackerApi(apigClient)
    }
}

interface ApiContextProps {
    api: RiderTrackerAPI
    setApi: Dispatch<SetStateAction<RiderTrackerAPI>>
}

export const ApiContext = createContext<ApiContextProps>({
    api: DefaultRiderTrackerApi.getClient(),
    setApi: () => {}
});

export const ApiContextProvider = ({ children }: PropsWithChildren) => {
    const [api, setApi] = useState<RiderTrackerAPI>(DefaultRiderTrackerApi.getClient())

    return (
        <ApiContext.Provider value={{ api, setApi }}>
            {children}
        </ApiContext.Provider>
    );
};
