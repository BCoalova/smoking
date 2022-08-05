import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

export default function AllInfoTBody({ filteredArr, removeRow }) {
    return filteredArr.map(el => (
        <TableRow key={el.date} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component='th' scope='row' color={el.dayObjective >= el.count ? 'primary' : 'secondary'}>
                <Typography color={el.dayObjective >= el.count ? 'primary' : 'secondary'}>{el.date}</Typography>
            </TableCell>
            <TableCell align='right' component='th' scope='row'>
                {el.dayObjective}
            </TableCell>
            <TableCell align='right'>{el.count}</TableCell>
            <TableCell align='right'>
                <Typography color={el.dayObjective - el.count > 0 ? 'primary' : el.dayObjective - el.count < 0 ? 'error' : ''}>
                    {el.dayObjective - el.count > 0 ? `+ ${el.dayObjective - el.count}` : el.dayObjective - el.count}
                </Typography>
            </TableCell>
            <TableCell align='center'>
                <IconButton onClick={() => removeRow(el.date)}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    ))
}
