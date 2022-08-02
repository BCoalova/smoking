import descSortDatesFn from './descSortDatesFn'

export default function userDataToArr(objParam) {
    const userDataArr = Object.entries(objParam).reduce((acc, el) => {
        return [...acc, { date: el[0], count: el[1].count, dayObjective: el[1].dayObjective }]
    }, [])

    return descSortDatesFn(userDataArr, 'date')
}
