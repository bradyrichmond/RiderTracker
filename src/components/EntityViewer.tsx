import { Box, Button, Modal, Typography } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../contexts/RoleContext"
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom'
import { BusType } from "../types/BusType"
import { DriverType } from "../types/DriverType"
import { GuardianType } from "../types/GuardianType"
import { OrganizationType } from "../types/OrganizationType"
import { RiderType } from "../types/RiderType"
import { ScanType } from "../types/ScanType"

interface EntityViewerProps<T> {
    fetchForOrg?: boolean
    getEntities(_token: string, id?: string): Promise<T[]>
    titleSingular: string
    titlePlural: string
    rowLinkPath: string
}

const EntityViewer = <T extends 
        BusType | DriverType | GuardianType | OrganizationType | RiderType | ScanType>(
            {
                getEntities, titleSingular, titlePlural, rowLinkPath
            }:EntityViewerProps<T>) => {
    const [entities, setEntities] = useState<T[]>([])
    const roleContext = useContext(RoleContext)
    const { id } = useParams()

    useEffect(() => {
        updateEntities()
    }, [roleContext.token])

    const updateEntities = async () => {
        const newEntities = await getEntities(roleContext.token, id)
        setEntities(newEntities)
    }

    return (
        <Box height='100%' flexDirection='column'>
            <Box marginBottom='2rem'>
                <Typography variant='h2'>
                    {titlePlural}
                </Typography>
            </Box>
            <Box flex='1' borderTop='1px solid #000'>
                {entities && entities.map((entity) => {
                    return (
                        <Box key={entity.id} display='flex' flexDirection='row' borderBottom='1px solid #000'>
                            <Box padding='2rem'>
                                <Link to={`/${rowLinkPath}/${entity.id}`}><Typography>{entity.id}</Typography></Link>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
            <Box padding='2rem'>
                <Button variant='contained'>
                    <Box display='flex' flexDirection='row' justifyContent=''>
                        <AddCircleIcon />
                        <Box flex='1' marginLeft='1rem'>
                            <Typography>Add {titleSingular}</Typography>
                        </Box>
                    </Box>
                </Button>
            </Box>
        </Box>
    )
}

export default EntityViewer;