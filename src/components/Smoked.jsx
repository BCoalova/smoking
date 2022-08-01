import { IconButton, Stack, Typography } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import { useGlobalContext } from '../context/GlobalContext'

export default function Smoked() {
    const { addCigarette, viewing, removeCigarette } = useGlobalContext()

    return (
        viewing && (
            <Stack direction='row' gap={1} justifyContent='space-between'>
                <Typography variant='h4' sx={{ display: 'grid', placeContent: 'center', lineHeight: 1 }}>
                    Fumados:{' '}
                </Typography>
                <Stack direction='row' alignItems='center' gap={1}>
                    <IconButton size='large' onClick={() => removeCigarette(viewing)}>
                        <RemoveCircleOutlineOutlinedIcon fontSize='large' />
                    </IconButton>
                    <Typography variant='h4' color={viewing.count > viewing.dayObjective ? 'secondary' : 'primary'}>
                        {viewing.count}
                    </Typography>
                    <IconButton onClick={() => addCigarette(viewing)}>
                        <AddCircleOutlineOutlinedIcon fontSize='large' />
                    </IconButton>
                </Stack>
            </Stack>
        )
    )
}
