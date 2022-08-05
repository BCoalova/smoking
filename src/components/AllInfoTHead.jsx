import UndoIcon from '@mui/icons-material/Undo'
import SortIcon from '@mui/icons-material/Sort'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { userDataToArr } from '../helpers/userDataToArr'

export default function AllInfoTHead({ restoreAllRows, userData, filteredArr, ascDescValue, toogleSort }) {
    return (
        <TableHead>
            <TableRow>
                <TableCell colSpan={5} align='center'>
                    <Stack direction='row' alignItems='center' justifyContent='center' gap={2}>
                        <IconButton
                            onClick={restoreAllRows}
                            disabled={userDataToArr(userData.data).length === filteredArr.length}
                            title='Mostrar original'
                        >
                            <UndoIcon />
                        </IconButton>
                        <Typography variant='h4'>Histórico</Typography>
                    </Stack>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography>Fecha</Typography>
                        <Stack direction='row' alignItems='center'>
                            {!ascDescValue && <ArrowDownwardIcon color='primary' />}
                            {ascDescValue && <ArrowUpwardIcon color='primary' />}
                            <IconButton onClick={toogleSort} title='Ordenar'>
                                <SortIcon />
                            </IconButton>
                        </Stack>
                    </Stack>
                </TableCell>
                <TableCell align='right'>Objetivo</TableCell>
                <TableCell align='right'>Fumados</TableCell>
                <TableCell align='right'>Dif</TableCell>
                <TableCell align='center'>
                    <Typography>Remover</Typography>
                </TableCell>
            </TableRow>
        </TableHead>
    )
}
