import { useEffect, useState } from 'react'

export const useDeviceLocation = () => {
    const { geolocation } = navigator
    const [locationPermissionGranted, setLocationPermissionGranted] = useState<boolean>(false)

    useEffect(() => {
        const watchDeviceLocationAccess = async () => {
            const permissionStatus = await navigator.permissions.query({ name: 'geolocation' })
            permissionStatus.onchange = () => {
                setLocationPermissionGranted(permissionStatus.state === 'granted')
            }
        }

        watchDeviceLocationAccess()
    }, [])

    const getCurrentPositionProxy = async (): Promise<number[]> => {
        return new Promise<number[]>((resolve, reject) => {
            geolocation.getCurrentPosition(({ coords }) => resolve([coords.latitude, coords.longitude]),
                ({ code, message }) => reject(`${code}: ${message}`)),
                {
                    maximumAge: 0
                }
        })
    }

    return { getCurrentPosition: getCurrentPositionProxy, locationPermissionGranted }
}