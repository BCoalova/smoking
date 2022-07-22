import { IconButton, Stack, Typography } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import { useGlobalContext } from '../context/GlobalContext'

export default function Smoked() {
    const { addCigarette, viewing } = useGlobalContext()

    return (
        viewing && (
            <Stack direction='row' gap={1} justifyContent='space-between'>
                <Typography variant='h4'>Fumados: </Typography>
                <Stack direction='row' alignItems='center' gap={1}>
                    <IconButton size='large'>
                        <RemoveCircleOutlineOutlinedIcon fontSize='large' />
                    </IconButton>
                    <Typography variant='h4'>{viewing.count}</Typography>
                    <IconButton onClick={() => addCigarette(viewing)}>
                        <AddCircleOutlineOutlinedIcon fontSize='large' />
                    </IconButton>
                </Stack>
            </Stack>
        )
    )
}
