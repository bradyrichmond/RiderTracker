import { AdminType } from "@/types/AdminType"
import { Avatar, Box, Paper, Typography } from "@mui/material"
import { useMemo } from "react"
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'

interface OrganizationAdminCardProps extends AdminType {
    index: number
}

const OrganizationAdminCard = ({ id, firstName, lastName, title, email, index }: OrganizationAdminCardProps) => {
    const userFullName = `${firstName} ${lastName}`
    const profileUrl = useMemo(() => `https://s3.us-west-2.amazonaws.com/ridertracker.profileimages/${id}.jpg`, [id])

    return (
        <Paper elevation={4} sx={ index > 0 ? { mt: '1rem'} : {} }>
            <Box sx={{ p: '2rem', display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ mr: '2rem' }}>
                    <Avatar sx={{ height: 150, width: 150, fontSize: '3rem' }} src={profileUrl} alt={userFullName}>
                        <PersonIcon fontSize='inherit' />
                    </Avatar>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box>
                        <Typography variant='h4'>{userFullName}</Typography>
                        <Typography variant='subtitle1'>{title}</Typography>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <Typography sx={{ display: 'flex', flexDirection: 'row' }}><EmailIcon sx={{ mr: '1rem' }} /> {email}</Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    )
}

export default OrganizationAdminCard