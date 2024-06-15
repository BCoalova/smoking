import { Autocomplete, InputAdornment, TextField, Typography } from '@mui/material'
import AvTimerIcon from '@mui/icons-material/AvTimer'

export default function SecMinAutocomplete({ label, name, value, onChange }) {
    return (
        <Autocomplete
            // disablePortal
            id='combo-box-demo'
            options={Array.from({ length: 61 }, (_, index) => index.toString().padStart(2, '0'))}
            sx={{ width: 146 }}
            renderInput={params => <RenderInputImp name={name} params={params} label={label} />}
            renderOption={(props, option) => <RenderOptionImp {...props}>{option}</RenderOptionImp>}
            value={value}
            onChange={(_, value) => onChange(value, name)}
        />
    )
}

function RenderOptionImp({ children, ...props }) {
    return (
        <Typography {...props} sx={{ textAlign: 'right' }}>
            {children}
        </Typography>
    )
}

function RenderInputImp({ params, label, name }) {
    return (
        <TextField
            {...params}
            label={label}
            inputProps={{
                ...params.inputProps,
                // type: 'number',
                pattern: '[0-9]*',
                inputmode: 'numeric',
                sx: {
                    textAlign: 'right',
                },
            }}
            name={name}
            InputProps={{
                ...params.InputProps,
                startAdornment: (
                    <InputAdornment position='start'>
                        <AvTimerIcon />
                    </InputAdornment>
                ),
            }}
        />
    )
}
