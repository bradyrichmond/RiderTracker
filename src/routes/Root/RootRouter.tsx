import { AuthUser, fetchAuthSession, fetchUserAttributes } from "aws-amplify/auth"
import {
    RouterProvider
} from "react-router-dom"
import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { getHeaviestRole } from "../../helpers/GetHeaviestRole"
import { RoleContext } from "../../contexts/RoleContextProvider"
import RiderTrackerAPI from "../../API/API"
import { RiderTrackerRole, isRiderTrackerRole } from "../../constants/Roles"
import { ApiContext } from "../../contexts/ApiContextProvider"
import { createRouterObject } from "@/helpers/CreateRouterObject"

interface RootRouterProps {
    user: AuthUser
}

const RootRouter = ({ user }: RootRouterProps) => {
    const [isInitialized, setIsInitialized] = useState(false)
    const { setUserFullName, heaviestRole, setHeaviestRole, setUserPictureUrl } = useContext(RoleContext)
    const { setApi } = useContext(ApiContext)

    const initialize = useCallback(async () => {
        const session = await fetchAuthSession()
        const idToken = session.tokens?.idToken
        const sessionGroups = idToken?.payload["cognito:roles"]
        const sessionGroupsArray = sessionGroups as Array<string>
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
        setIsInitialized(true)
    }, [user])

    useEffect(() => {
        initialize()
    }, [initialize])
    
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

    const router = useMemo(createRouterObject, [heaviestRole])

    return (
        <>
            {isInitialized ? <RouterProvider router={router} /> : null}
        </>
    )
}

export default RootRouter