import { create } from 'zustand'
import { Client, generateClient } from 'aws-amplify/data'
import type { Schema } from '../../amplify/data/resource'
import { fetchAuthSession } from 'aws-amplify/auth'
import { CLIENT_REFRESH_INTERVAL } from '@/constants/Numbers'

interface ApiStore {
    client?: Client<Schema>
    getClient(): Promise<Client<Schema>>
    updateClient(): Promise<Client<Schema>>
}


export const useApiStore = create<ApiStore>((set, get) => ({
    client: undefined,
    getClient: async () => {
        const client = get().client

        if (!client) {
            const newApi = await get().updateClient()
            set({ client: newApi })

            setInterval(async () => {
                console.log('Refreshing client')
                await get().updateClient()
            }, CLIENT_REFRESH_INTERVAL)

            return newApi
        }

        return client
    },
    updateClient: async () => {
        const session = await fetchAuthSession()
        const tokens = session.tokens
        const accessToken = tokens?.accessToken

        if (accessToken) {
            const authToken = accessToken.toString()

            const newClient = generateClient<Schema>({
                authMode: 'lambda',
                authToken: authToken
            })

            return newClient
        }


        throw 'No authToken for generate client'
    }
}))