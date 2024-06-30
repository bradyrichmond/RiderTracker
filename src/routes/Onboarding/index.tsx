import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { useState } from 'react'
import SetOrganizationName from './SetOrganizationName'
import { FormProvider, useForm } from 'react-hook-form'
import { confirmSignUp, signIn, signOut, signUp } from 'aws-amplify/auth'
import CreateOrganizationAdmin from './CreateOrganizationAdmin'
import ConfirmOrganizationAdmin from './ConfirmOrganizationAdmin'
import OnboardingComplete from './OnboardingComplete'
import { useTranslation } from 'react-i18next'
import { useOrgStore } from '@/store/OrgStore'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store/UserStore'

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

interface NewAdmin {
    id: string
    firstName: string
    lastName: string
    email: string
}

const Onboarding = () => {
    const [activeStep, setActiveStep] = useState(0)
    const methods = useForm<CreateOrganizationInputs>()
    const { watch } = methods
    const [isLoading, setIsLoading] = useState(false)
    const [newAdmin, setNewAdmin] = useState<NewAdmin>()
    const { t } = useTranslation(['onboarding', 'common'])
    const createOrg = useOrgStore().createOrg
    const orgId = useOrgStore().orgId
    const navigate = useNavigate()
    const addUserToOrg = useUserStore().addUserToOrg
    const addUserToAdminGroup = useUserStore().addUserToAdminGroup

    const steps: StepType[] = [
        {
            label: t('setOrgName')
        },
        {
            label: t('createOrgAdmin')
        },
        {
            label: t('confirmAdmin')
        },
        {
            label: t('onboardingComplete')
        }
    ]

    const { orgName, adminFirstName, adminLastName, adminEmail, adminPassword, confirmationCode } = watch()

    const handleNext = async () => {
        // TODO: Add form validation to rhf
        if (activeStep === 0) {
            if (orgName.length > 3) {
                await createNewOrg()
                setActiveStep((current) => current + 1)
            }

            return
        }

        if (activeStep === 1) {
            setIsLoading(true)
            await createNewAWSUser()
            setIsLoading(false)
            setActiveStep((current) => current + 1)

            return
        }

        if (activeStep === 2) {
            setIsLoading(true)
            await confirmAwsUser()
            setIsLoading(false)
            setActiveStep((current) => current + 1)

            return
        }

        if (activeStep === 3) {
            navigate('/app')
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

        if (userId) {
            const newAdminObj = {
                id: userId,
                firstName: adminFirstName,
                lastName: adminLastName,
                email: adminEmail
            }

            setNewAdmin(newAdminObj)
        }
    }

    const confirmAwsUser = async () => {
        if (newAdmin) {
            await confirmSignUp({ username: newAdmin.id, confirmationCode })
            await signIn({ username: newAdmin.id, password: adminPassword })
            await createNewOrgAdmin()
        }
    }

    const createNewOrgAdmin = async () => {
        if (orgId && newAdmin && newAdmin?.id) {
            const admin = {
                id: newAdmin?.id,
                email: adminEmail,
                firstName: adminFirstName,
                orgId,
                lastName: adminLastName,
                title: 'Admin'
            }

            await addUserToOrg(admin)
            await addUserToAdminGroup(admin)
        }
    }

    const createNewOrg = async () => {
        await signOut()
        await createOrg(orgName)
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
                            {activeStep === 1 ? <CreateOrganizationAdmin /> : null}
                            {activeStep === 2 ? <ConfirmOrganizationAdmin /> : null}
                            {activeStep === 3 ? <OnboardingComplete /> : null}
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