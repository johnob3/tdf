import React from "react"
import { useFetch } from "../../hooks/useFetch"
import { FreelancerInfo } from "./FreelancerInfo"
import { AuthContext } from "../../utils/AuthContext"
import { Layout } from "../../elements/Layout"
import { createStyles, ListItem, ListItemIcon, makeStyles, Theme, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"
import DashboardIcon from '@material-ui/icons/Dashboard';

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
        },
        listLink: {
            color: "#000",
            textDecoration: "none",
            '&:visited': {
                color: "#000",
            },
        },
    }),
);

export const FreelancerPage = () => {
    const classes = useStyles()

    const authContext = React.useContext(AuthContext)
    const { data, isLoading } = useFetch("/users/me")

    if (data.message) {
        authContext.logout()
    }

    if (isLoading) {
        return null
    }

    const SidebarJSX = () => {
        return (
            <>
                <Typography variant="h6" className={classes.listTitle}>
                    My management
                </Typography>
                <ListItem button key={"Users"}>
                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                    <Link className={classes.listLink} to="/freelancer">Dashboard</Link>
                </ListItem>
            </>
        )
    }

    return (
        <Layout sidebarJSX={<SidebarJSX />} mainJSX={<FreelancerInfo info={data} />} />
    )
}