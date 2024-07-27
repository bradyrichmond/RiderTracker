import { create } from 'zustand'
import { Client, generateClient } from 'aws-amplify/data'
import type { Schema } from '../../amplify/data/resource'
import { fetchAuthSession } from 'aws-amplify/auth'

interface ApiStore {
    getClient(): Promise<Client<Schema>>
    updateClient(): Promise<Client<Schema>>
}


export const useApiStore = create<ApiStore>((_set, get) => ({
    getClient: async () => {
            const client = await get().updateClient()
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
                authToken: `RiderTracker#${authToken}`
            })

            return newClient
        }


        throw 'No authToken for generate client'
    }
}))