import { useState } from 'react'

export default function useMuiMenu() {
    const [anchorEl, setAnchorEl] = useState()
    const open = Boolean(anchorEl)
    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return [anchorEl, open, handleClick, handleClose]
}
