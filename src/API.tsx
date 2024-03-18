const BASE_NAME = 'https://gkupwyoi70.execute-api.us-west-2.amazonaws.com/dev'

export const getBuses = async (token: string) => {
    if (!token) {
        console.error('Missing token')
        return []
    }

    try {
        const buses = await fetch(`${BASE_NAME}/buses`, {
            headers: {
                'Authorization': token
            }
        })

        return buses
    } catch (e) {
        console.error(JSON.stringify(e))
        return []
    }
}

export const getDrivers = async (token: string) => {
    if (!token) {
        console.error('Missing token')
        return []
    }

    try {
        const drivers = await fetch(`${BASE_NAME}/drivers`, {
            headers: {
                'Authorization': token
            }
        })

        return drivers
    } catch (e) {
        console.error(JSON.stringify(e))
        return []
    }
}

export const getRiders = async (token: string) => {
    if (!token) {
        console.error('Missing token')
        return []
    }

    try {
        const riders = await fetch(`${BASE_NAME}/riders`, {
            headers: {
                'Authorization': token
            }
        })

        return riders
    } catch (e) {
        console.error(JSON.stringify(e))
        return []
    }
}
