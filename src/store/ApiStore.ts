import { create } from 'zustand'
import { Client, generateClient } from 'aws-amplify/data'
import type { Schema } from '../../amplify/data/resource'

interface ApiStore {
    client?: Client<Schema>
    getClient(updateCredentials?: boolean): Promise<Client<Schema>>
    updateClient(): Client<Schema>
}


export const useApiStore = create<ApiStore>((set, get) => ({
    client: undefined,
    getClient: async (updateCredentials?: boolean) => {
        const client = get().client

        if (!client || updateCredentials) {
            const newApi = get().updateClient()
            set({ client: newApi })
            return newApi
        }

        return client
    },
    updateClient: () => {
        const newClient = generateClient<Schema>({ authMode: 'userPool' })
        return newClient
    }
}))