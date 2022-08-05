import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useGlobalContext } from '../context/GlobalContext'

export default function Smoked() {
    const { addCigarette, userData, viewing, removeCigarette } = useGlobalContext()

    return (
        <Stack direction='row' gap={1} justifyContent='space-between' sx={{ mb: 10 }}>
            <Typography variant='h4' sx={{ display: 'grid', placeContent: 'center', lineHeight: 1 }}>
                Fumados:{' '}
            </Typography>
            <Stack direction='row' alignItems='center' gap={1}>
                <IconButton size='large' onClick={() => removeCigarette(userData.data[viewing])}>
                    <RemoveCircleOutlineOutlinedIcon fontSize='large' />
                </IconButton>
                <Typography
                    variant='h4'
                    color={userData.data[viewing].count > userData.data[viewing].dayObjective ? 'secondary' : 'primary'}
                >
                    {userData.data[viewing].count}
                </Typography>
                <IconButton onClick={() => addCigarette(userData.data[viewing])}>
                    <AddCircleOutlineOutlinedIcon fontSize='large' />
                </IconButton>
            </Stack>
        </Stack>
    )
}
