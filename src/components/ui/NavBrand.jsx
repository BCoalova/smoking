import SmokeFreeIcon from '@mui/icons-material/SmokeFree'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

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
