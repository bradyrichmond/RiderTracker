import { ApiContext } from "@/contexts/ApiContextProvider"
import { RoleContext } from "@/contexts/RoleContextProvider"
import { SnackbarContext } from "@/contexts/SnackbarContextProvider"
import { Box, Button, TextField } from "@mui/material"
import { useContext } from "react"
import { useForm } from "react-hook-form"

interface PasswordFormInput {
    oldPassword: string
    newPassword: string
    verifyNewPassword: string
}

const UpdatePasswordForm = () => {
    const { handleSubmit, register } = useForm<PasswordFormInput>()
    const { setSnackbarMessage, setSnackbarSeverity, setSnackbarVisibilityMs } = useContext(SnackbarContext)
    const { api } = useContext(ApiContext)
    const { accessToken } = useContext(RoleContext)

    const onSubmit = (data: PasswordFormInput) => {
        const { oldPassword, newPassword, verifyNewPassword } = data
        const passwordVerified = verifyNewPasswordMatch(newPassword, verifyNewPassword)

        if (!passwordVerified) {
            showPasswordMismatchSnackbar()
            return
        }

        submitPasswordChangeRequest(oldPassword, newPassword)
    }

    const submitPasswordChangeRequest = async (oldPassword: string, newPassword: string) => {
        try {
            await api.execute(api.users.changeUserPassword, [accessToken, oldPassword, newPassword])
        } catch {
            showPasswordSetFailureSnackbar()
        }
    }

    const showPasswordSetFailureSnackbar = () => {
        setSnackbarSeverity('error')
        setSnackbarVisibilityMs(5000)
        setSnackbarMessage('Password change failed')
    }

    const showPasswordMismatchSnackbar = () => {
        setSnackbarSeverity('error')
        setSnackbarVisibilityMs(5000)
        setSnackbarMessage('New password fields do not match!')
    }

    const verifyNewPasswordMatch = (pw1: string, pw2: string) => {
        return pw1 === pw2
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField type='password' fullWidth label='Current Password' {...register('oldPassword')} />
                <TextField type='password' fullWidth label='New Password' {...register('newPassword')} />
                <TextField 
                    type='password'
                    fullWidth 
                    label='Retype New Password'
                    {...register('verifyNewPassword')} 
                />
                <Button type='submit' variant='contained' fullWidth sx={{mt: '1rem'}}>Change Password</Button>
            </form>
        </Box>
    )
}

export default UpdatePasswordForm