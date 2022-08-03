import { IconButton, Link, Typography, useMediaQuery } from '@mui/material'
import SmokeFreeIcon from '@mui/icons-material/SmokeFree'

export default function NavBrand() {
    const matches = useMediaQuery('(min-width:600px)')

    return (
        <>
            <IconButton color='inherit' component={Link} to='/'>
                <SmokeFreeIcon />
            </IconButton>
            {matches && (
                <Typography variant='h6' fontWeight={900} color='inherit'>
                    Stop smoking
                </Typography>
            )}
        </>
    )
}
