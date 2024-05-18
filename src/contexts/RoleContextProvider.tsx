import { createContext, useContext, useEffect } from "react"
import { getHeaviestRole } from "@/helpers/GetHeaviestRole"
import { RiderTrackerRole, isRiderTrackerRole } from "@/constants/Roles"
import { PropsWithChildren, useState } from "react"
import { fetchAuthSession } from "@aws-amplify/auth"
import { ApiContext } from "./ApiContextProvider"
import RiderTrackerAPI from "@/API"
import { getOrgIdForUser } from "@/helpers/GetOrganizationIdForUser"
import { signOut } from "aws-amplify/auth"
import { OrgDataContext } from "./OrganizationDataContext"

export const RoleContext = createContext({
    heaviestRole: 'RiderTracker_Guardian',
    setHeaviestRole: (_role: RiderTrackerRole) => {},
    userFullName: '',
    setUserFullName: (_userFullName: string) => {},
    userEmail: '',
    setUserEmail: (_userEmail: string) => {},
    userId: '',
    setUserId: (_userId: string) => {},
    accessToken: '',
    setAccessToken: (_accessToken: string) => {},
    userPictureUrl: '',
    setUserPictureUrl: (_pictureUrl: string) => {},
    updateUserData: async () => {}
});

export const RoleContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [heaviestRole, setHeaviestRole] = useState("RiderTracker_Unauthenticated")
    const [userFullName, setUserFullName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userId, setUserId] = useState("")
    const [userPictureUrl, setUserPictureUrl] = useState("")
    const [accessToken, setAccessToken] = useState("")
    const [idToken, setIdToken] = useState("")
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
            const sessionGroups = idToken?.payload["cognito:groups"]
            const sessionGroupsArray = (sessionGroups as Array<string>).filter((s) => isRiderTrackerRole(s))
            setUserEmail(idToken?.payload.email?.toString() ?? '')

            const heaviestRoleFromGroups: RiderTrackerRole = getHeaviestRole(sessionGroupsArray ?? [])
            setHeaviestRole(heaviestRoleFromGroups)
            // @ts-ignore 
            const { given_name, family_name } = session.tokens?.idToken?.payload
            setUserFullName(`${given_name} ${family_name}`)

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

    const selectOrganizationAction = async () =>{
        try {
            if (userId && heaviestRole) {
                const orgId = await getOrgIdForUser(userId, heaviestRole)
                if (Array.isArray(orgId)) {
                    setOrganizationArray(orgId)
                    toggleShowOrganizationSelector()
                    return
                }

                setOrgId(orgId)
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
            <>
                {children}
            </>
        </RoleContext.Provider>
    );
};
