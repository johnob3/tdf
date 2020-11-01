import React from "react"
import { useFetch } from "../../hooks/useFetch"
import { UsersTable } from "./UsersTable"
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Icon, IconButton, ListItem, ListItemIcon } from "@material-ui/core"
import Typography from '@material-ui/core/Typography';
import { BrowserRouterProps, Link } from "react-router-dom";
import { Layout } from "../../elements/Layout"
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            fontWeight: "bold",
            padding: theme.spacing(3),
        },
        button: {
            marginTop: theme.spacing(4)
        },
        listTitle: {
            textTransform: "uppercase",
            color: "#5f5e5e",
            padding: theme.spacing(3),
            fontSize: "15px",
            fontWeight: 400,
            letterSpacing: 1
        }
    }),
);
export const Coach = (props: BrowserRouterProps) => {
    const { data, error } = useFetch("/users")

    const classes = useStyles()

    const SidebarJSX = () => {
        return (
            <>
                <Typography variant="h6" className={classes.listTitle}>
                    User management
                </Typography>
                <ListItem button key={"Users"}>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <Link to="/coach">Users</Link>
                    <IconButton color="secondary" aria-label="add an alarm">
                        <AddIcon />
                    </IconButton>
                </ListItem>
            </>
        )
    }

    const MainJSX = () => {
        return (
            <>
                <Grid container spacing={3}>
                    <Grid item xs={10}>
                        <Typography variant="h3" className={classes.title}>
                            Users
                    </Typography>
                    </Grid>
                    <Grid item xs={2} className={classes.button}>
                        <Button variant="contained" color="primary">
                            <Icon><PersonAddIcon /></Icon>
                        Create User
                    </Button>
                    </Grid>
                </Grid>

                <UsersTable users={data} />
            </>
        )
    }

    if (Object.keys(data).length === 0) {
        return null
    } else {
        return (
            <Layout sidebarJSX={<SidebarJSX />} mainJSX={<MainJSX />} />
        );
    }
}