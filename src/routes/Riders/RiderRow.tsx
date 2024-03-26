import { Box, Tooltip, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { RiderType } from "../../types/RiderType"
import LinkOffIcon from '@mui/icons-material/LinkOff'

interface RiderRowProps {
    entity: RiderType
    deleteAction?: (id: string) => void
    deleteTooltipTitle?: string
}

const RiderRow = ({ entity, deleteAction, deleteTooltipTitle }: RiderRowProps) => {
    const handleDelete = () => {
        if (deleteAction) {
            deleteAction(entity.id)
        }
    }

    return (
        <Box key={entity.id} display='flex' flexDirection='row' borderBottom='1px solid #000'>
            <Box padding='2rem' display='flex' justifyContent='center' alignItems='center'>
                <Link to={`/riders/${entity.id}`}><Typography>{entity.id}</Typography></Link>
            </Box>
            <Box padding='2rem' display='flex' justifyContent='center' alignItems='center'>
                <Typography>{entity.firstName}</Typography>
            </Box>
            <Box padding='2rem' display='flex' justifyContent='center' alignItems='center'>
                <Typography>{entity.lastName}</Typography>
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

export default RiderRow