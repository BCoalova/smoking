import uuidv4 from '../helpers/getUUID'

const types = Object.freeze({ DEFAULT: 'DEFAULT', CUSTOM: 'CUSTOM' })
const labels = Object.freeze({ PREP: 'Prep', EXC: 'Exc', REST: 'Rest' })
const status = Object.freeze({ NOT_READY: 'NOT_READY', READY: 'READY', RUNNING: 'RUNNING', WAITING: 'WAITING', SKIP: 'SKIP' })

const defaults = Object.freeze([
    {
        id: uuidv4(),
        minutes: '00',
        seconds: '05',
        order: 0,
        label: labels.PREP,
        type: types.DEFAULT,
        status: status.READY,
    },
    {
        id: uuidv4(),
        minutes: '00',
        seconds: '30',
        order: 1,
        label: labels.EXC,
        type: types.DEFAULT,
        status: status.WAITING,
    },
    {
        id: uuidv4(),
        minutes: '00',
        seconds: '30',
        order: 2,
        label: labels.REST,
        type: types.DEFAULT,
        status: status.WAITING,
    },
])

const initialCountDownData = Object.freeze({
    status: status.READY,
    currentStep: 0,
    time: 0,
})

export { types, defaults, initialCountDownData, labels, status }
