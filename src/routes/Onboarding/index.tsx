import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import SetOrganizationName from './SetOrganizationName'
import { FormProvider, useForm } from 'react-hook-form'
import SetOrgSlug from './SetOrgSlug'
import { confirmSignUp, signIn, signUp } from 'aws-amplify/auth'
import CreateOrganizationAdmin from './CreateOrganizationAdmin'
import ConfirmOrganizationAdmin from './ConfirmOrganizationAdmin'
import { v4 as uuid } from 'uuid'
import RiderTrackerAPI from '@/API'
import OnboardingComplete from './OnboardingComplete'
import { useTranslation } from 'react-i18next'

interface StepType {
    label: string
}

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
    const [newUserId, setNewUserId] = useState('')
    const [api, setApi] = useState<RiderTrackerAPI>()
    const { t } = useTranslation(['onboarding', 'common'])

    const steps: StepType[] = [
        {
            label: t('createOrgAdmin')
        },
        {
            label: t('confirmAdmin')
        },
        {
            label: t('setOrgName')
        },
        {
            label: t('setOrgSlug')
        },
        {
            label: t('onboardingComplete')
        }
    ]

    const { orgName: orgNameValue, orgSlug: orgSlugValue, adminFirstName, adminLastName, adminEmail, adminPassword, confirmationCode } = watch()

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
            setIsLoading(true)
            await createNewAWSUser()
            setIsLoading(false)
            setActiveStep((current) => current + 1)

            return
        }

        if (activeStep === 1) {
            setIsLoading(true)
            await confirmAwsUser()
            setIsLoading(false)
            setActiveStep((current) => current + 1)

            return
        }

        if (activeStep === 2) {
            if (orgNameValue.length > 3) {
                setOrgName(orgNameValue)
                generateOrgSlug(orgNameValue)
                setActiveStep((current) => current + 1)
            }

            return
        }

        if (activeStep === 3) {
            if (orgSlugValue.length > 3 && orgSlugValue.match(urlSafeMatch)) {
                setIsLoading(true)
                await createNewOrg(orgSlugValue)
                setIsLoading(false)
                setActiveStep((current) => current + 1)
            }

            return
        }


        if (activeStep === 4) {
            const host = location.origin.split('//')[1]
            const protocol = location.protocol
            const newUrl = `${protocol}//${orgSlugValue}.${host}`
            window.location.assign(newUrl)

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
                    family_name: adminLastName,
                    email: adminEmail
                },
                autoSignIn: true
            }
        })

        setNewUserId(userId ?? '')
    }

    const confirmAwsUser = async () => {
        await confirmSignUp({ username: newUserId, confirmationCode })
        await signIn({ username: newUserId, password: adminPassword })
    }

    const createNewOrganizationUser = async (orgId: string) => {
        await api?.admin.createUser(orgId, {
            id: newUserId,
            orgId,
            firstName: adminFirstName,
            lastName: adminLastName,
            email: adminEmail
        }, { forceRefesh: true })
    }

    const createNewOrg = async (newOrgSlug: string) => {
        const newOrgId = uuid()

        await api?.organizations.createOrganization({
            id: newOrgId,
            orgName,
            orgSlug: newOrgSlug,
            loginImageKey: '',
            adminIds: [newUserId],
            createdBy: newUserId,
            createdDate: new Date(),
            lastEditedBy: newUserId,
            lastEditDate: new Date()
        })

        await createNewOrganizationUser(newOrgId)
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
                            {activeStep === 0 ? <CreateOrganizationAdmin /> : null}
                            {activeStep === 1 ? <ConfirmOrganizationAdmin /> : null}
                            {activeStep === 2 ? <SetOrganizationName /> : null}
                            {activeStep === 3 ? <SetOrgSlug slugSuggestion={tempOrgSlug} currentSlug={orgSlugValue} /> : null}
                            {activeStep === 4 ? <OnboardingComplete /> : null}
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: 'space-evenly' }}>
                            <Button
                                disabled={activeStep === 0 || activeStep === 2}
                                onClick={handleBack}
                                variant='contained'
                            >
                                {t('back', { ns: 'common' })}
                            </Button>
                            <Typography>Step {activeStep + 1} of {steps.length}</Typography>
                            <Button onClick={handleNext} variant='contained' disabled={isLoading}>
                                {activeStep === steps.length - 1 ? t('finish', { ns: 'common' }) : t('next', { ns: 'common' })}
                            </Button>
                        </Box>
                    </Box>
                </form>
            </FormProvider>
        </Box>
    )
}

export default Onboarding