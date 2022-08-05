import styled from '@emotion/styled'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useEffect, useState } from 'react'
import AllInfoTBody from '../components/AllInfoTBody'
import AllInfoTHead from '../components/AllInfoTHead'
import { useGlobalContext } from '../context/GlobalContext'
import { userDataToArr } from '../helpers/userDataToArr'
import useBoolean from '../hooks/useBoolean'

const StyledPaper = styled(Paper)(({ theme }) => {
    // eslint-disable-next-line no-undef
    console.log('theme => ', theme)

    return {
        'scrollbar-color': { background: theme.palette.primary.light },
        'scrollbar-width': 'thin',
        '&::-webkit-scrollbar': { width: '12px' },
        '&::-webkit-scrollbar-track': { background: theme.palette.secondary.light },
        '&::-webkit-scrollbar-thumb': { background: theme.palette.primary.light },
        '&::-webkit-scrollbar-thumb:hover': { background: theme.palette.primary.light },
        '&::-webkit-scrollbar-thumb:active': { background: theme.palette.primary.light },
    }
})

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
                <TableContainer component={StyledPaper} sx={{ my: 10 }} elevation={3} className='fancyScrollBar'>
                    <Table>
                        <AllInfoTHead
                            restoreAllRows={restoreAllRows}
                            userData={userData}
                            filteredArr={filteredArr}
                            ascDescValue={ascDescValue}
                            toogleSort={toogleSort}
                        />
                        <TableBody>
                            {!!filteredArr.length && <AllInfoTBody filteredArr={filteredArr} removeRow={removeRow} />}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        )
    )
}
