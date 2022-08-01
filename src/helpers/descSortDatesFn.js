export default function descSortDatesFn(arr, name, order = 'DESC') {
    return arr.sort((a, b) => {
        let aa = a[name].split('-').reverse().join(),
            bb = b[name].split('-').reverse().join()

        return order === 'DESC' ? (aa < bb ? -1 : aa > bb ? 1 : 0) : order === 'ASC' && aa < bb ? 1 : aa > bb ? -1 : 0
    })
}
