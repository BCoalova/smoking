import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Typography from '@mui/material/Typography'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavSwipe({ currentUser, links, pathname, logOutHandler, open, handleClose, handleClick }) {
    const { Fragment } = React

    return (
        <>
            <SwipeableDrawer
                anchor='right'
                open={open}
                onClose={handleClose}
                onOpen={handleClick}
                PaperProps={{ sx: { display: 'flex', justifyContent: 'space-between' } }}
            >
                <List
                    sx={{
                        width: '300px',
                        flexDirection: 'column',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        height: '100%',
                    }}
                    disablePadding
                >
                    <Stack width='100%'>
                        {links.map((el, index) => (
                            <Fragment key={el.id}>
                                {index < links.length - 1 && (
                                    <ListItem disablePadding>
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
                                )}
                            </Fragment>
                        ))}
                    </Stack>
                    {links
                        .filter(el => el.title === 'Salir')
                        .map(el => (
                            <Stack key={el.id} width='100%'>
                                <Divider flexItem />
                                <ListItem disablePadding>
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
                            </Stack>
                        ))}
                    {/* index > links.length - 2 && (
                                <Stack width='100%'>
                                    <Divider flexItem />
                                    <ListItem disablePadding>
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
                                </Stack>
                            ) */}
                </List>
            </SwipeableDrawer>
        </>
    )
}
