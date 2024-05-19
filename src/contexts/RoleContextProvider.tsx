import { useContext, useEffect } from 'react'
import { getHeaviestRole } from '@/helpers/GetHeaviestRole'
import { RiderTrackerRole, isRiderTrackerRole } from '@/constants/Roles'
import { PropsWithChildren, useState } from 'react'
import { fetchAuthSession } from '@aws-amplify/auth'
import { ApiContext } from './ApiContextProvider'
import RiderTrackerAPI from '@/API'
import { getOrgIdForUser } from '@/helpers/GetOrganizationIdForUser'
import { signOut } from 'aws-amplify/auth'
import { OrgDataContext } from './OrgDataContext'
import { RoleContext } from './RoleContext'

export const RoleContextProvider = ({ children }: PropsWithChildren) => {
    const [heaviestRole, setHeaviestRole] = useState('RiderTracker_Unauthenticated')
    const [userFullName, setUserFullName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userId, setUserId] = useState('')
    const [userPictureUrl, setUserPictureUrl] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [idToken, setIdToken] = useState('')
    const { api, setApi } = useContext(ApiContext)
    const { orgId, setOrganizationLoginImageUrl, setOrganizationArray, setOrgId, toggleShowOrganizationSelector } = useContext(OrgDataContext)

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
            const profileImageKey = await api.users.getUserProfileImage(orgId, userId)
            setUserPictureUrl(`https://s3.us-west-2.amazonaws.com/${profileImageKey}`)
            const { loginImageKey } = await api.organizations.getOrganizationById(orgId)
            if (loginImageKey) {
                setOrganizationLoginImageUrl(`https://s3.us-west-2.amazonaws.com/${loginImageKey}`)
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
                        const orgs = await api.organizations.getOrganizations()
                        setOrganizationArray(orgs)
                        toggleShowOrganizationSelector()
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
        const apiInstance = await RiderTrackerAPI.getClient()
        setApi(apiInstance)
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
