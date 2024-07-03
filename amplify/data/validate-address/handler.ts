import { secret } from '@aws-amplify/backend';

export const handler = async (event: { address: string }) => {
    const baseVerificationUrl = buildVerificationUrl(event.address);

    try {
        const apiResponse = await fetch(baseVerificationUrl);

        if (apiResponse) {
            if (apiResponse.ok) {
                const responseJson = await apiResponse.json()

                const response = {
                    statusCode: 200,
                    body: responseJson,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                return response;
            } else {
                throw 'api failure'
            }
        }
        else {
            throw 'api failure'
        }
    } catch (e) {
        const failure = {
            statusCode: 500,
            body: e
        }

        return failure;
    }
};

const buildVerificationUrl = (address: string) => {
    const urlSafeAddress = encodeURIComponent(address)
    return `https://api.geoapify.com/v1/geocode/search?text=${urlSafeAddress}&apiKey=${secret('geoapifyApiKey')}`
}
