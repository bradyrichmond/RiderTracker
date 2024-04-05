// @ts-ignore
import * as Auth from "aws-amplify/auth"

jest.mock("aws-amplify/auth", () => {
    return {
        fetchUserSession: () => {
            return {
                "tokens": {
                    "accessToken": {
                        "payload": {
                            "sub": "07f357b2-b771-4a32-ac39-0df44ee010c2",
                            "cognito:groups": [
                                "RiderTracker_Wizards"
                            ],
                            "iss": "https://cognito-idp.us-west-2.amazonaws.com/us-west-2_07f357b2-b771-4a32-ac39-0df44ee010c2",
                            "client_id": "07f357b2-b771-4a32-ac39-0df44ee010c2",
                            "origin_jti": "07f357b2-b771-4a32-ac39-0df44ee010c2",
                            "event_id": "07f357b2-b771-4a32-ac39-0df44ee010c2",
                            "token_use": "access",
                            "scope": "aws.cognito.signin.user.admin",
                            "auth_time": 1711819255,
                            "exp": 1712281721,
                            "iat": 1712278121,
                            "jti": "07f357b2-b771-4a32-ac39-0df44ee010c2",
                            "username": "07f357b2-b771-4a32-ac39-0df44ee010c2"
                        }
                    },
                    "idToken": {
                        "payload": {
                            "sub": "07f357b2-b771-4a32-ac39-0df44ee010c2",
                            "cognito:groups": [
                                "RiderTracker_Wizards"
                            ],
                            "email_verified": true,
                            "cognito:preferred_role": "arn:aws:iam::07f357b2-b771-4a32-ac39-0df44ee010c2:role/RiderTracker_Wizard",
                            "iss": "https://cognito-idp.us-west-2.amazonaws.com/us-west-2_07f357b2-b771-4a32-ac39-0df44ee010c2",
                            "cognito:username": "07f357b2-b771-4a32-ac39-0df44ee010c2",
                            "given_name": "Test",
                            "origin_jti": "07f357b2-b771-4a32-ac39-0df44ee010c2",
                            "cognito:roles": [
                                "arn:aws:iam::07f357b2-b771-4a32-ac39-0df44ee010c2:role/RiderTracker_Wizard"
                            ],
                            "aud": "07f357b2-b771-4a32-ac39-0df44ee010c2",
                            "event_id": "07f357b2-b771-4a32-ac39-0df44ee010c2",
                            "token_use": "id",
                            "auth_time": 1711819255,
                            "exp": 1712281721,
                            "iat": 1712278121,
                            "family_name": "User",
                            "jti": "07f357b2-b771-4a32-ac39-0df44ee010c2",
                            "email": "test_user@gmail.com"
                        }
                    }
                },
                "userSub": "07f357b2-b771-4a32-ac39-0df44ee010c2"
            }
        },
        fetchUserAttributes: () => {
            return {
                given_name: 'Test',
                family_name: 'User'
            }
        }
    }
})