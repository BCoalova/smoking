export default function convertTimeStampToDate(timestamp) {
    const years = timestamp.toDate().getFullYear()
    const month = timestamp.toDate().getMonth() < 10 ? '0' + timestamp.toDate().getMonth() : timestamp.toDate().getMonth()
    const date = timestamp.toDate().getDate() < 10 ? '0' + timestamp.toDate().getDate() : timestamp.toDate().getDate()
    // const hour = timestamp.toDate().getHours() < 10 ? '0' + timestamp.toDate().getHours() : timestamp.toDate().getHours()
    // const minutes = timestamp.toDate().getMinutes() < 10 ? '0' + timestamp.toDate().getMinutes() : timestamp.toDate().getMinutes()

    return new Date(years, month, date)

    // return `${date}/${month}/${years} ${hour}:${minutes}`
}
