export default function chartjsConverter(arr, isLight, amount = 0) {
    let lastSevenDays = arr
    if (amount && arr.length > amount) {
        lastSevenDays = arr.slice(arr.length - amount)
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
            backgroundColor: isLight ? 'hsl(29, 94%, 51%)' : 'hsl(29, 94%, 71%)',
        },
        {
            label: 'Fumados',
            data: count,
            borderColor: isLight ? 'hsl(216, 94%, 51%)' : 'hsl(216, 94%, 71%)',
            backgroundColor: isLight ? 'hsl(216, 94%, 51%)' : 'hsl(216, 94%, 71%)',
        },
    ]

    return { labels, datasets }
}
