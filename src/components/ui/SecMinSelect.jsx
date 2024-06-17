import { NativeSelect, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

export default function SecMinSelect({ label, name, value, onChange, type }) {
    const handleChange = event => {
        onChange(event.target.value)
    }

    return (
        <Box /* sx={{ minWidth: 120 }} */>
            <FormControl fullWidth>
                <InputLabel variant='outlined' id={`simple-select-${name}`}>
                    {label}
                </InputLabel>
                <NativeSelect
                    variant='outlined'
                    labelId={`simple-select-${name}`}
                    id={`select-${name}`}
                    value={value}
                    label={label}
                    onChange={handleChange}
                >
                    {getOptions(type).map(option => (
                        <option
                            value={option}
                            key={option}
                            style={{
                                border: 'none',
                                outline: 'none',
                                fontSize: '18px',
                                padding: '5px 55px 5px 5px',
                                WebkitAppearance: 'none', // for Safari
                                margin: '0',
                                borderRadius: '0',
                                textAlign: 'center',
                            }}
                        >
                            <Typography color='primary'>{option}</Typography>
                        </option>
                    ))}
                </NativeSelect>
            </FormControl>
        </Box>
    )
}

/* 
<FormControl fullWidth>
  <InputLabel variant="outlined" htmlFor="uncontrolled-native">
    {label}
  </InputLabel>
  <NativeSelect
    defaultValue={30}
    inputProps={{
      name: label,
      id: 'uncontrolled-native',
    }}
  >
    <option value={option}>{option}</option>
  </NativeSelect>
</FormControl>
*/

function getOptions(type) {
    if (type === 'Prep') {
        return Array.from({ length: 16 }, (_, index) => index.toString().padStart(2, '0'))
    }

    return Array.from({ length: 13 }, (_, index) => (index * 5).toString().padStart(2, '0'))
}
