import {
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useMediaQuery,
} from '@mui/material'
import { useGlobalContext } from '../context/GlobalContext'
import { userDataToArr } from '../helpers/userDataToArr'
import SortIcon from '@mui/icons-material/Sort'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import useBoolean from '../hooks/useBoolean'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import UndoIcon from '@mui/icons-material/Undo'
import styled from '@emotion/styled'

const StyledPaper = styled(Paper)(({ theme }) => ({
    'scrollbar-color': { background: theme.palette.primary.light },
    'scrollbar-width': 'thin',
    '&::-webkit-scrollbar': { width: '12px' },
    '&::-webkit-scrollbar-track': { background: theme.palette.secondary.light },
    '&::-webkit-scrollbar-thumb': { background: theme.palette.primary.light },
    '&::-webkit-scrollbar-thumb:hover': { background: theme.palette.primary.light },
    '&::-webkit-scrollbar-thumb:active': { background: theme.palette.primary.light },
}))

export default function AllInfo() {
    const { userData } = useGlobalContext()
    const [filteredArr, setFilterArr] = useState([])
    const [ascDescValue /* makeAsc */ /* makeDesc */, , , toggle] = useBoolean(false)
    const matches = useMediaQuery('(min-width:600px)')

    useEffect(() => {
        if (!userData) return

        setFilterArr(userDataToArr(userData.data))
    }, [userData])

    const toogleSort = () => {
        setFilterArr(current => current.reverse())
        toggle()
    }

    const removeRow = date => setFilterArr(current => current.filter(el => el.date !== date))

    const restoreAllRows = () => setFilterArr(userDataToArr(userData.data))

    return (
        userData && (
            <Stack sx={{ maxHeight: `calc(100vh - ${matches ? '64px' : '100px'})` }}>
                <TableContainer component={StyledPaper} sx={{ my: 4 }} elevation={3} className='fancyScrollBar'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={4} align='center'>
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
                                <TableCell align='center'>
                                    <Typography>Remover</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!!filteredArr.length &&
                                filteredArr.map(el => (
                                    <TableRow key={el.date} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell
                                            component='th'
                                            scope='row'
                                            color={el.dayObjective >= el.count ? 'primary' : 'secondary'}
                                        >
                                            <Typography color={el.dayObjective >= el.count ? 'primary' : 'secondary'}>
                                                {el.date}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='right' component='th' scope='row'>
                                            {el.dayObjective}
                                        </TableCell>
                                        <TableCell align='right'>{el.count}</TableCell>
                                        <TableCell align='center'>
                                            <IconButton onClick={() => removeRow(el.date)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        )
    )
}
