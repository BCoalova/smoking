import { format } from 'date-fns'
import descSortDatesFn from './descSortDatesFn'

export function userDataToArr(objParam) {
    const userDataArr = Object.entries(objParam).reduce((acc, el) => {
        return [...acc, { date: el[0], count: el[1].count, dayObjective: el[1].dayObjective }]
    }, [])

    return descSortDatesFn(userDataArr, 'date')
}

export function userDataToArrUntilToday(objParams) {
    const userDataArr = Object.entries(objParams).reduce((acc, el) => {
        return [...acc, { date: el[0], count: el[1].count, dayObjective: el[1].dayObjective }]
    }, [])

    let orderArr = descSortDatesFn(userDataArr, 'date')
    let today = format(new Date(), 'dd-MM-yyyy')
    let todayIndex = orderArr.findIndex(el => el.date === today)
    orderArr.length = todayIndex + 1

    return orderArr
}
