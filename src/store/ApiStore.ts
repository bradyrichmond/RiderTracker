import { create } from 'zustand'
import { Client, generateClient } from 'aws-amplify/data'
import type { Schema } from '../../amplify/data/resource'
import { fetchAuthSession } from 'aws-amplify/auth'

interface ApiStore {
    client?: Client<Schema>
    getClient(updateCredentials?: boolean): Promise<Client<Schema>>
    updateClient(): Promise<Client<Schema>>
}


export const useApiStore = create<ApiStore>((set, get) => ({
    client: undefined,
    getClient: async (updateCredentials?: boolean) => {
        const client = get().client

        if (!client || updateCredentials) {
            const newApi = await get().updateClient()
            set({ client: newApi })
            return newApi
        }

        return client
    },
    updateClient: async () => {
        const session = await fetchAuthSession()
        const tokens = session.tokens
        const authToken = tokens?.accessToken.toString()

        if (authToken) {

            const newClient = generateClient<Schema>({
                authMode: 'lambda',
                authToken: authToken
            })

            return newClient
        }

        throw 'No authToken for generate client'
    }
}))