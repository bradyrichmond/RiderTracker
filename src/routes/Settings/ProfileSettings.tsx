import { Avatar, Box, Button, Card, Tooltip, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import FolderIcon from '@mui/icons-material/Folder'
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react"
import { ApiContext } from "@/contexts/ApiContextProvider"
import { RoleContext } from "@/contexts/RoleContextProvider"
import UpdateProfileDataForm from "./UpdateProfileDataForm"

const ProfileSettings = () => {
    const { api } = useContext(ApiContext)
    const { userId, userFullName, userPictureUrl } = useContext(RoleContext)
    const inputFile = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File>()
    const [fileName, setFileName] = useState('')
    const [profileUrl, setProfileUrl] = useState('')

    useEffect(() => {
        checkImage()
    }, [userId])

    const checkImage = () => {
        const src = userPictureUrl
        let img = new Image()
        img.src = src
        
        if (img.complete) {
            setProfileUrl(src)
            return
        }

        img.onload = () => {
            setProfileUrl(src)
        }

        img.onerror = () => {
            console.error('No profile image for user on s3. Falling back to icon.')
        }
    }

    const openFileDialog = () => {
        inputFile?.current?.click()
    }

    const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const files = target.files
        const file = files?.length && files?.length > 0 ? files[0] : null

        if (file) {
            setFile(file)
            setFileName(file.name)
        }
    }

    const uploadFile = async () => {
        await api.execute(api.admin.updateUserProfileImage, [file, userId])
        checkImage()
        setFile(undefined)
    }

    return (
        <Grid sm={12} md={6}>
            <Card sx={{ p: '2rem' }}>
                <Typography variant='h4' sx={{ pb: '.5rem' }}>
                    Profile Settings
                </Typography>
                <Typography variant='subtitle1'>
                    These are your personal details. They are visible to organization administrators.
                </Typography>
                <Box display='flex' height='100%' flexDirection='column' sx={{pt: '2rem'}}>
                    <Box sx={{ pb: '2rem' }} display='flex' justifyContent='center' alignItems='center' >
                        <input type='file' id='file' accept="image/jpg" ref={inputFile} style={{display: 'none'}} onChange={handleFileChange} />
                        <Tooltip title='Change Profile Picture'>
                            <Avatar sx={{height: 200, width: 200}} onClick={openFileDialog} src={profileUrl} alt={userFullName}>
                                <FolderIcon fontSize='large' />
                            </Avatar>
                        </Tooltip>
                    </Box>
                    <Box flex='1' display='flex'  flexDirection='column' justifyContent='center' alignItems='center'>
                        <Button variant='contained' sx={{ height: '100%' }} fullWidth disabled={!fileName} onClick={uploadFile}>
                            <Typography variant='body1'>{fileName ? 'Upload Profile Image' : 'No File Selected'}</Typography>
                        </Button>
                    </Box>
                </Box>
                <Box paddingTop='.5rem' display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='caption'>{fileName ? `Selected file: ${fileName}` : 'Acceptable file type: *.jpg. Max file size: 10MB'}</Typography>
                </Box>
                <Box sx={{pt: '1rem'}}>
                    <UpdateProfileDataForm />
                </Box>
            </Card>
        </Grid>
    )
}

export default ProfileSettings