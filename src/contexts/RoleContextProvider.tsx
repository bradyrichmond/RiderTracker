import { useEffect } from 'react'
import { getHeaviestRole } from '@/helpers/GetHeaviestRole'
import { RiderTrackerRole, isRiderTrackerRole } from '@/constants/Roles'
import { PropsWithChildren, useState } from 'react'
import { fetchAuthSession } from '@aws-amplify/auth'
import { getOrgIdForUser } from '@/helpers/GetOrganizationIdForUser'
import { signOut } from 'aws-amplify/auth'
import { RoleContext } from './RoleContext'
import { useOrgStore } from '@/store/OrgStore'
import { useApiStore } from '@/store/ApiStore'

export const RoleContextProvider = ({ children }: PropsWithChildren) => {
    const [heaviestRole, setHeaviestRole] = useState('RiderTracker_Unauthenticated')
    const [userFullName, setUserFullName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userId, setUserId] = useState('')
    const [userPictureUrl, setUserPictureUrl] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [idToken, setIdToken] = useState('')
    const { api, updateApi } = useApiStore()
    const { orgId, setOrganizationLoginImageUrl, setOrganizationArray, setOrgId } = useOrgStore()

    const updateUserData = async () => {
        try {
            const session = await fetchAuthSession()
            setUserId(session.userSub ?? '')
            const idToken = session.tokens?.idToken
            setIdToken(idToken?.toString() ?? '')
            const userAccessToken = session.tokens?.accessToken
            setAccessToken(userAccessToken?.toString() ?? '')
            const payload = idToken?.payload
            if (payload) {
                const sessionGroups = payload['cognito:groups']
                const sessionGroupsArray = (sessionGroups as Array<string>).filter((s) => isRiderTrackerRole(s))
                setUserEmail(payload.email?.toString() ?? '')

                const heaviestRoleFromGroups: RiderTrackerRole = getHeaviestRole(sessionGroupsArray ?? [])
                setHeaviestRole(heaviestRoleFromGroups)

                const { given_name, family_name } = payload
                setUserFullName(`${given_name} ${family_name}`)
            }

            initializeApi()
        } catch {
            signOut()
        }
    }

    useEffect(() => {
        if (userId) {
            selectOrganizationAction()
        }
    }, [userId, heaviestRole, idToken])

    useEffect(() => {
        if (api && userId && orgId) {
            updateImages()
        }
    }, [api, userId, orgId])

    const updateImages = async () => {
        try {
            const profileImageKey = await api?.users.getUserProfileImage(orgId, userId)
            setUserPictureUrl(`https://s3.us-west-2.amazonaws.com/${profileImageKey}`)
            const orgdata = await api?.organizations.getOrganizationById(orgId)
            if (orgdata?.loginImageKey) {
                setOrganizationLoginImageUrl(`https://s3.us-west-2.amazonaws.com/${orgdata?.loginImageKey}`)
            }
        } catch {
            console.error('unable to update images')
        }
    }

    const selectOrganizationAction = async () => {
        try {
            if (userId && heaviestRole) {
                const fetchedOrgId = await getOrgIdForUser(userId, heaviestRole)
                if (fetchedOrgId) {
                    if (Array.isArray(fetchedOrgId)) {
                        const orgs = await api?.organizations.getOrganizations()
                        setOrganizationArray(orgs ?? [])
                        return
                    }

                    setOrgId(fetchedOrgId)
                    return
                }

                throw 'No orgId found'
            }
        } catch (e) {
            console.error(e as string)
        }
    }

    const initializeApi = async () => {
        await updateApi()
    }

    return (
        <RoleContext.Provider value={{
            heaviestRole, setHeaviestRole,
            userFullName, setUserFullName,
            userEmail, setUserEmail,
            userId, setUserId,
            accessToken, setAccessToken,
            userPictureUrl, setUserPictureUrl,
            updateUserData
        }}>
            {children}
        </RoleContext.Provider>
    );
};
