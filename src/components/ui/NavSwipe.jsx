import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

export default function NavSwipe({ currentUser, links, pathname, logOutHandler, open, handleClose, handleClick }) {
    return (
        <>
            <SwipeableDrawer
                anchor='right'
                open={open}
                onClose={handleClose}
                onOpen={handleClick}
                PaperProps={{ sx: { display: 'flex', justifyContent: 'end' } }}
            >
                <List
                    sx={{
                        width: '300px',
                        flexDirection: 'column',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                    }}
                    disablePadding
                >
                    {links.map((el, index) => (
                        <>
                            <ListItem key={el.title} disablePadding>
                                <ListItemButton
                                    onClick={() => (el.comp === 'NavLink' ? handleClose() : logOutHandler())}
                                    component={el.comp === 'NavLink' ? NavLink : ''}
                                    to={el.path ? el.path : null}
                                    selected={pathname === el.path}
                                >
                                    <ListItemIcon>{el.Icon(currentUser)}</ListItemIcon>
                                    <ListItemText primary={<Typography color='basic'>{el.title}</Typography>} />
                                </ListItemButton>
                            </ListItem>
                            {index === links.length - 2 && <Divider flexItem />}
                        </>
                    ))}
                </List>
            </SwipeableDrawer>
        </>
    )
}
