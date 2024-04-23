import { AdminType } from "@/types/AdminType"
import { Avatar, Box, Paper, Typography } from "@mui/material"
import { useMemo } from "react"
import PersonIcon from '@mui/icons-material/Person'

const OrganizationAdminCard = ({ id, firstName, lastName, title, email }: AdminType) => {
    const userFullName = `${firstName} ${lastName}`
    const profileUrl = useMemo(() => `https://s3.us-west-2.amazonaws.com/ridertracker.profileimages/${id}.jpg`, [id])

    return (
        <Paper elevation={4}>
            <Box sx={{ p: '2rem', display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ mr: '2rem' }}>
                    <Avatar sx={{height: 200, width: 200}} src={profileUrl} alt={userFullName}>
                        <PersonIcon fontSize='large' />
                    </Avatar>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant='h4'>{userFullName}</Typography>
                    <Typography variant='subtitle1'>{title}</Typography>
                    <Typography>Email: {email}</Typography>
                </Box>
            </Box>
        </Paper>
    )
}

export default OrganizationAdminCard