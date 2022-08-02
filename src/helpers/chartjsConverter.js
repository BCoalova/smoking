import { format } from 'date-fns'
import descSortDatesFn from './descSortDatesFn'

export default function chartjsConverter(arr, isLight, amount = 0) {
    let today = format(new Date(), 'dd-MM-yyyy')

    let orderUserDataArr = descSortDatesFn(arr, 'date')

    let todayIndex = orderUserDataArr.findIndex(el => el.date === today)
    // eslint-disable-next-line no-undef
    orderUserDataArr.length = todayIndex + 1
    let lastSevenDays = orderUserDataArr
    if (amount && orderUserDataArr.length > amount) {
        lastSevenDays = orderUserDataArr.slice(orderUserDataArr.length - amount)
    }
    let labels = lastSevenDays.map(el => el.date)
    let [count, dayObjective] = lastSevenDays.reduce(
        (acc, el) => {
            return [
                [...acc[0], el.count],
                [...acc[1], el.dayObjective],
            ]
        },
        [[], []],
    )
    let datasets = [
        {
            label: 'Objetivo',
            data: dayObjective,
            borderColor: isLight ? 'hsl(29, 94%, 51%)' : 'hsl(29, 94%, 71%)',
            backgroundColor: isLight ? 'hsl(29, 94%, 71%)' : 'hsl(29, 94%, 51%)',
        },
        {
            label: 'Fumados',
            data: count,
            borderColor: isLight ? 'hsl(216, 94%, 51%)' : 'hsl(216, 94%, 71%)',
            backgroundColor: isLight ? 'hsl(216, 94%, 71%)' : 'hsl(216, 94%, 51%)',
        },
    ]

    return { labels, datasets }
}
