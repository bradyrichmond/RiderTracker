import { Box, Tooltip, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { GuardianType } from "../../types/GuardianType"
import LinkOffIcon from '@mui/icons-material/LinkOff'

interface GuardianRowProps {
    entity: GuardianType
    deleteAction?: (id: string) => void
    deleteTooltipTitle?: string
}

const GuardianRow = ({ entity, deleteAction, deleteTooltipTitle }: GuardianRowProps) => {
    const handleDelete = () => {
        if (deleteAction) {
            deleteAction(entity.id)
        }
    }

    return (
        <Box key={entity.id} display='flex' flexDirection='row' borderBottom='1px solid #000'>
            <Box padding='2rem'>
                <Link to={`/guardians/${entity.id}`}><Typography>{entity.id}</Typography></Link>
            </Box>
            <Box padding='2rem'>
                <Typography>{entity.firstName}</Typography>
            </Box>
            <Box padding='2rem'>
                <Typography>{entity.lastName}</Typography>
            </Box>
            <Box padding='2rem'>
                <Typography>{entity.organizationId}</Typography>
            </Box>
            {deleteAction ? 
                <Box padding='2rem' display='flex' justifyContent='center' alignItems='center' onClick={handleDelete}>
                    <Tooltip title={deleteTooltipTitle}>
                        <LinkOffIcon fontSize="large" />
                    </Tooltip>
                </Box>
                :
                null
            }
        </Box>
    )
}

export default GuardianRow