import { Box, Typography } from "@mui/material";
import { ReactNode } from "react"
import { Link } from "react-router-dom";

interface NavLinkProps {
    icon: ReactNode
    path: string
    label: string
}

const NavLink = ({ icon, path, label }: NavLinkProps) => {
    return (
        <Box display='flex' flexDirection='column'>
            <Box justifyContent='center' alignItems='center'>
                <Link to={path}>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        {icon}
                    </Box>
                    <Box>
                        <Typography>
                            {label}
                        </Typography>
                    </Box>
                </Link>
            </Box>
        </Box>
    )
}

export default NavLink