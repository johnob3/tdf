import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Menu, MenuItem, Toolbar } from "@material-ui/core"
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { AuthContext } from '../utils/AuthContext';
import logo from "../assets/img/logo.png"
import PersonIcon from '@material-ui/icons/Person';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
type Props = {
    sidebarJSX: JSX.Element
    mainJSX: JSX.Element
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
            border: "none"
        },
        // necessary for content to be below app bar
        toolbar: {
            ...theme.mixins.toolbar,
            backgroundColor: "#173244",
            boxSizing: "border-box"
        },
        menu: {
            backgroundColor: "#0B2333"
        },
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(5),
        },
        logo: {
            width: "50px",
            height: "auto"
        },
        logoTitle: {
            color: "#fff",
            fontWeight: "bold"
        },
    }),
);

export const Layout = (props: Props) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const authContext = React.useContext(AuthContext)
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.menu}>
                    <Grid container spacing={3}>
                        <Grid item xs={10} />
                        <Grid item xs={2}>
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <PersonIcon htmlColor="#fff" />
                                <KeyboardArrowDownIcon htmlColor="#fff" />
                            </IconButton>
                            <Menu
                                id="long-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={open}
                                onClose={handleClose}>
                                <MenuItem onClick={authContext.logout}>
                                    Log out
                            </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>

                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <Grid container className={classes.toolbar} justify="center" alignItems="center">
                    <img src={logo} className={classes.logo} alt="logo" />
                    <Typography variant="h4" className={classes.logoTitle}>
                        CatCMS
                    </Typography>
                </Grid>
                <Divider />
                <List>
                    {props.sidebarJSX}
                </List>
            </Drawer>
            <main className={classes.content}>
                {props.mainJSX}
            </main>
        </div>
    )
}