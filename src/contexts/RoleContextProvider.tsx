import { createContext, useContext, useEffect } from "react"
import { getHeaviestRole } from "@/helpers/GetHeaviestRole"
import { RiderTrackerRole, isRiderTrackerRole } from "@/constants/Roles"
import { PropsWithChildren, useState } from "react"
import { fetchAuthSession, fetchUserAttributes } from "aws-amplify/auth"
import { ApiContext } from "./ApiContextProvider"
import RiderTrackerAPI from "@/API"
import { getOrganizationIdForUser } from "@/helpers/GetOrganizationIdForUser"
import OrganizationPickerDialog from "@/components/OrganizationPickerDialog"
import { OrganizationType } from "@/types/OrganizationType"

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
    organizationId: '',
    setOrganizationId: (_pictureUrl: string) => {},
    organizationOverride: false,
    setOrganizationOverride: (_bool: boolean) => {},
    updateUserData: async () => {}
});

export const RoleContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [heaviestRole, setHeaviestRole] = useState("RiderTracker_Guardian")
    const [userFullName, setUserFullName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userId, setUserId] = useState("")
    const [userPictureUrl, setUserPictureUrl] = useState("")
    const [accessToken, setAccessToken] = useState("")
    const [idToken, setIdToken] = useState("")
    const [organizationId, setOrganizationId] = useState("")
    const [organizationOverride, setOrganizationOverride] = useState(false)
    const [showOrganizationSelector, setShowOrganizationSelector] = useState(false)
    const [organizationArray, setOrganizationArray] = useState<OrganizationType[]>([])
    const { setApi } = useContext(ApiContext)

    const updateUserData = async () => {
        const session = await fetchAuthSession()
        setUserId(session.userSub ?? '')
        const idToken = session.tokens?.idToken
        setIdToken(idToken?.toString() ?? '')
        const userAccessToken = session.tokens?.accessToken
        setAccessToken(userAccessToken?.toString() ?? '')
        const sessionGroups = idToken?.payload["cognito:roles"]
        const sessionGroupsArray = sessionGroups as Array<string>
        setUserEmail(idToken?.payload.email?.toString() ?? '')
        const trimmedGroups: RiderTrackerRole[] = []

        sessionGroupsArray.forEach((sg) => {
            const trimmed = sg.split('/')[1]

            if (isRiderTrackerRole(trimmed)) {
                trimmedGroups.push(trimmed)
            }
        })

        const heaviestRoleFromGroups: RiderTrackerRole = getHeaviestRole(trimmedGroups ?? [])
        setHeaviestRole(heaviestRoleFromGroups)

        initializeApi(idToken?.toString() ?? '')
        await initializeUserData()
    }

    useEffect(() => {
        selectOrganizationAction()
    }, [userId, heaviestRole, idToken])

    const selectOrganizationAction = async () =>{
        if (userId && heaviestRole && idToken) {
            const orgId = await getOrganizationIdForUser(idToken, userId, heaviestRole)
            if (Array.isArray(orgId)) {
                setOrganizationArray(orgId)
                toggleShowOrganizationSelector()
                return
            }

            setOrganizationId(orgId)
        }
    }

    const initializeApi = (token: string) => {
        const apiInstance = new RiderTrackerAPI(token)
        setApi(apiInstance)
    }

    const initializeUserData = async () => {
        try {
            const userAttributes = await fetchUserAttributes();
            const { given_name, family_name } = userAttributes
            setUserFullName(`${given_name} ${family_name}`)
            setUserPictureUrl(`https://s3.us-west-2.amazonaws.com/ridertracker.profileimages/${userId}.jpg`)
        } catch (err) {
            console.log(err)
        }
    }

    const toggleShowOrganizationSelector = () => {
        setShowOrganizationSelector((cur) => !cur)
    }

    const handleSelectOrganization = (organizationId: string) => {
        setOrganizationId(organizationId)
        setOrganizationOverride(true)
        toggleShowOrganizationSelector()
    }

    return (
        <RoleContext.Provider value={{
            heaviestRole, setHeaviestRole,
            userFullName, setUserFullName,
            userEmail, setUserEmail,
            userId, setUserId,
            accessToken, setAccessToken,
            userPictureUrl, setUserPictureUrl,
            organizationId, setOrganizationId,
            organizationOverride, setOrganizationOverride,
            updateUserData
        }}>
            <>
                <OrganizationPickerDialog open={showOrganizationSelector} handleSelectOrganization={handleSelectOrganization} organizations={organizationArray}/>
                {children}
            </>
        </RoleContext.Provider>
    );
};
