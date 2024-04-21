import { createContext, useContext } from "react"
import { getHeaviestRole } from "@/helpers/GetHeaviestRole"
import { RiderTrackerRole, isRiderTrackerRole } from "@/constants/Roles"
import { PropsWithChildren, useState } from "react"
import { fetchAuthSession, fetchUserAttributes } from "aws-amplify/auth"
import { ApiContext } from "./ApiContextProvider"
import RiderTrackerAPI from "@/API"

export const RoleContext = createContext({
    heaviestRole: 'RiderTracker_Guardian',
    setHeaviestRole: (_role: RiderTrackerRole) => {},
    userFullName: '',
    setUserFullName: (_userFullName: string) => {},
    userEmail: '',
    setUserEmail: (_userEmail: string) => {},
    userId: '',
    setUserId: (_userId: string) => {},
    userPictureUrl: '',
    setUserPictureUrl: (_pictureUrl: string) => {},
    updateUserData: async () => {}
});

export const RoleContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [heaviestRole, setHeaviestRole] = useState("RiderTracker_Guardian")
    const [userFullName, setUserFullName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userId, setUserId] = useState("")
    const [userPictureUrl, setUserPictureUrl] = useState("")
    const { setApi } = useContext(ApiContext)

    const updateUserData = async () => {
        const session = await fetchAuthSession()
        setUserId(session.userSub ?? '')
        const idToken = session.tokens?.idToken
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

    const initializeApi = (token: string) => {
        const apiInstance = new RiderTrackerAPI(token)
        setApi(apiInstance)
    }

    const initializeUserData = async () => {
        try {
            const userAttributes = await fetchUserAttributes();
            const { given_name, family_name, picture } = userAttributes
            setUserFullName(`${given_name} ${family_name}`)

            if (picture) {
                setUserPictureUrl(picture)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <RoleContext.Provider value={{
            heaviestRole, setHeaviestRole,
            userFullName, setUserFullName,
            userEmail, setUserEmail,
            userId, setUserId,
            userPictureUrl, setUserPictureUrl,
            updateUserData
        }}>
            {children}
        </RoleContext.Provider>
    );
};
