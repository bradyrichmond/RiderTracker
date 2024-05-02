interface ApiResponse {
    data: any
    status: number
    statusText: string
    headers: Record<string, any>
    config: Record<string, any>
}

export const handleApiResponse = (response: ApiResponse) => {
    if (response.status === 200) {
        return response.data
    } else {
        throw `${response.status}: ${response.statusText}`
    }
}