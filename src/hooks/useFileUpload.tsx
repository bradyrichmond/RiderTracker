import { SnackbarContext } from "@/contexts/SnackbarContextProvider"
import { Box, Button, Typography } from "@mui/material"
import { ChangeEvent, useContext, useRef, useState } from "react"

interface UseFileUploadArgs {
    uploadAction(file: File): Promise<void>
    sizeLimitInBytes?: number
}

const useFileUpload = ({ uploadAction, sizeLimitInBytes }: UseFileUploadArgs) => {
    const [file, setFile] = useState<File>()
    const [fileName, setFileName] = useState('')
    const [temporaryFileUrl, setTemporaryFileUrl] = useState('')
    const inputFile = useRef<HTMLInputElement>(null)
    const { setSnackbarMessage, setSnackbarSeverity, setSnackbarVisibilityMs } = useContext(SnackbarContext)

    const openFileDialog = () => {
        inputFile?.current?.click()
    }

    const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const files = target.files
        const currentFile = files?.length && files?.length > 0 ? files[0] : null

        if (sizeLimitInBytes && currentFile && currentFile.size >= sizeLimitInBytes) {
            showFileTooLargeSnackbar()
            return
        }

        if (currentFile) {
            setFile(currentFile)
            setFileName(currentFile.name)
            setTemporaryFileUrl(URL.createObjectURL(currentFile) ?? '')
        }
    }

    const showFileTooLargeSnackbar = () => {
        setSnackbarSeverity('error')
        setSnackbarVisibilityMs(5000)
        setSnackbarMessage('File is too large.')
    }

    const fileUploadFailed = () => {
        setSnackbarSeverity('error')
        setSnackbarVisibilityMs(5000)
        setSnackbarMessage('File upload failed.')
    }

    const uploadFile = async () => {
        try {
            if (file) {
                await uploadAction(file)
                resetState()
            }
        } catch (e) {
            console.log(e as string)
            fileUploadFailed()
        }
    }

    const resetState = () => {
        setFile(undefined)
        setFileName('')
        setTemporaryFileUrl('')
    }

    const FileUpload = () => {
        return (
            <>
                <Box display='flex' height='100%' flexDirection='column' sx={{pt: '2rem'}}>
                    <Box flex='1' display='flex'  flexDirection='column' justifyContent='center' alignItems='center'>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        ref={inputFile}
                        accept="image/png, image/jpeg, image/svg+xml, image/jpg"
                        style={{display: 'none'}}
                    />
                        <Button variant='contained' sx={{ height: '100%' }} fullWidth disabled={!fileName} onClick={uploadFile}>
                            <Typography variant='body1'>{fileName ? 'Upload Profile Image' : 'No File Selected'}</Typography>
                        </Button>
                    </Box>
                </Box>
                <Box paddingTop='.5rem' display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='caption'>
                        {fileName ? `Selected file: ${fileName}` : 'Acceptable file type: jpg, jpeg, png, and svg. Max file size: 10MB'}
                    </Typography>
                </Box>
            </>
        )
    }

    return { openFileDialog, FileUpload, temporaryFileUrl }
}

export default useFileUpload
