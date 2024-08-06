import { defineStorage } from '@aws-amplify/backend'

export const storage = defineStorage({
    name: 'riderTrackerStorage',
    access: (allow) => ({
        'profile-pictures/*': [
            allow.groups(['ADMINS']).to(['read', 'write', 'delete']),
            allow.entity('identity').to(['read', 'write', 'delete'])
        ]
    })
})