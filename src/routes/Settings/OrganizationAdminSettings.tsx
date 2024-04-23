import { ApiContext } from "@/contexts/ApiContextProvider"
import { RoleContext } from "@/contexts/RoleContextProvider"
import { AdminType } from "@/types/AdminType"
import { Card, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { useContext, useEffect, useState } from "react"
import OrganizationAdminCard from "./OrganizationAdminCard"

const OrganizationAdminSettings = () => {
    const { organizationId } = useContext(RoleContext)
    const { api } = useContext(ApiContext)
    const [ admins, setAdmins ] = useState<AdminType[]>([])

    useEffect(() => {
        getAdmins()
    }, [])

    const getAdmins = async () => {
        const fetchedAdmins = await api.execute(api.organizations.getOrganizationAdmins, [organizationId])
        setAdmins(fetchedAdmins)
    }

    return (
        <Grid xs={12}>
            <Card sx={{ p: '2rem' }}>
                <Typography variant='h4' sx={{ pb: '.5rem' }}>
                    Organization Admins
                </Typography>
                <Grid xs={12}>
                    {admins.length > 0 ?
                        admins.map((a) => <OrganizationAdminCard 
                                key={a.id}
                                id={a.id}
                                organizationId={a.organizationId}
                                firstName={a.firstName}
                                lastName={a.lastName}
                                email={a.email}
                                title={a.title}
                            />)
                        :
                        null
                    }
                </Grid>
            </Card>
        </Grid>
    )
}

export default OrganizationAdminSettings