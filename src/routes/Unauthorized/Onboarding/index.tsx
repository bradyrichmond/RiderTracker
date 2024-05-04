import { Box, Button, Step, StepLabel, Stepper } from "@mui/material"
import { useContext, useMemo, useState } from "react"
import SetOrganizationName from "./SetOrganizationName"
import { FormProvider, useForm } from "react-hook-form"
import SetOrgSlug from "./SetOrgSlug"
import { confirmSignUp, signUp } from "aws-amplify/auth"
import CreateOrganizationAdmin from "./CreateOrganizationAdmin"
import ConfirmOrganizationAdmin from "./ConfirmOrganizationAdmin"
import { v4 as uuid } from 'uuid'
import { RIDER_TRACKER_ROLES } from "@/constants/Roles"
import RiderTrackerAPI from "@/API"
import { RoleContext } from "@/contexts/RoleContextProvider"
import OnboardingComplete from "./OnboardingComplete"

interface StepType {
    label: string
}

const steps: StepType[] = [
    {
        label: 'Set Organization Name'
    },
    {
        label: 'Set Organization Unique Identifier'
    },
    {
        label: 'Create an Organization Administrator'
    },
    {
        label: 'Confirm Administrator Account'
    },
    {
        label: 'Onboarding Complete'
    }
]

interface CreateOrganizationInputs {
    orgName: string
    orgSlug: string
    adminFirstName: string
    adminLastName: string
    adminEmail: string
    adminUsername: string
    adminPassword: string
    confirmationCode: string
}

const urlSafeMatch = /^[a-zA-Z0-9_-]*$/

const Onboarding = () => {
    const [activeStep, setActiveStep] = useState(0)
    const methods = useForm<CreateOrganizationInputs>()
    const { watch } = methods
    const [orgName, setOrgName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [tempOrgSlug, setTempOrgSlug] = useState('')
    const [orgId, setOrgId] = useState('')
    const [newUserId, setNewUserId] = useState('')
    const [api, setApi] = useState<RiderTrackerAPI>()
    const { updateUserData } = useContext(RoleContext)

    const orgNameValue = watch("orgName")
    const orgSlugValue = watch("orgSlug")
    const adminFirstName = watch("adminFirstName")
    const adminLastName = watch("adminLastName")
    const adminEmail = watch("adminEmail")
    const adminPassword = watch("adminPassword")
    const confirmationCode = watch("confirmationCode")

    const getApi = async () => {
        const riderTrackerApi = await RiderTrackerAPI.getClient()
        setApi(riderTrackerApi)
    }
    
    useMemo(() => {
        getApi()
    }, [])

    const handleNext = async () => {
        // TODO: Add form validation to rhf
        
        if (activeStep === 0) {
            if (orgNameValue.length > 3) {
                setOrgName(orgNameValue)
                generateOrgSlug(orgNameValue)
                setActiveStep((current) => current + 1)
            }
            
            return
        }
        
        if (activeStep === 1) {
            if (orgSlugValue.length > 3 && orgSlugValue.match(urlSafeMatch)) {
                setIsLoading(true)
                await createNewOrg(orgSlugValue)
                setIsLoading(false)
                setActiveStep((current) => current + 1)
            }
            
            return
        }

        if (activeStep === 2) {
            setIsLoading(true)
            await createNewAWSUser()
            setIsLoading(false)
            setActiveStep((current) => current + 1)

            return
        }

        if (activeStep === 3) {
            setIsLoading(true)
            await confirmAwsUser()
            setIsLoading(false)
            setActiveStep((current) => current + 1)

            return
        }

        if (activeStep === 4) {
            setIsLoading(true)
            await updateUserData()
            setIsLoading(false)

            return
        }
    }

    const createNewAWSUser = async () => {
        const { userId } = await signUp({
            username: adminEmail,
            password: adminPassword,
            options: {
                userAttributes: {
                    given_name: adminFirstName,
                    family_name: adminLastName
                },
                autoSignIn: true
            }
        })

        setNewUserId(userId ?? '')
    }

    const confirmAwsUser = async () => {
        await confirmSignUp({ username: newUserId, confirmationCode })
        await createNewOrganizationUser()
    }

    const createNewOrganizationUser = async () => {
        await api?.admin.createUser(orgId, {
            given_name: adminFirstName,
            family_name: adminLastName,
            email: adminEmail
        })

        // authorization fails here,,,need to figure out making user org admin in order to update org
        // modify lambda to allow if users is in adminIds?
        await api?.admin.addUserToGroup(newUserId, RIDER_TRACKER_ROLES.RIDER_TRACKER_ORGADMIN)
        await api?.organizations.updateOrganization(orgId, { adminIds: [newUserId] })
    }

    const createNewOrg = async (newOrgSlug: string) => {
        const newOrgId = uuid()
        setOrgId(newOrgId)

        await api?.organizations.createOrganization({
            id: newOrgId,
            orgName,
            orgSlug: newOrgSlug,
            loginImageKey: ""
        })
    }

    const generateOrgSlug = (val: string) => {
        setTempOrgSlug(val.split(' ').join('-').toLowerCase())
    }

    const handleBack = () => {
        setActiveStep((current) => current - 1)
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', height: '50%' }}>
            <FormProvider {...methods}>
                <form style={{ height: '100%', width: '100%' }}>
                    <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Stepper activeStep={activeStep}>
                            {
                                steps.map(({ label }: StepType) => {
                                    return (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    )
                                })
                            }
                        </Stepper>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {activeStep === 0 ? <SetOrganizationName /> : null}
                            {activeStep === 1 ? <SetOrgSlug slugSuggestion={tempOrgSlug} currentSlug={orgSlugValue} /> : null}
                            {activeStep === 2 ? <CreateOrganizationAdmin /> : null}
                            {activeStep === 3 ? <ConfirmOrganizationAdmin /> : null}
                            {activeStep === 4 ? <OnboardingComplete /> : null }
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: 'space-evenly' }}>
                            <Button
                                disabled={activeStep === 0 || activeStep === 2}
                                onClick={handleBack}
                                variant='contained'
                            >
                                Back
                            </Button>
                            <Button onClick={handleNext} variant='contained' disabled={isLoading}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </Box>
                </form>
            </FormProvider>
        </Box>
    )
}

export default Onboarding