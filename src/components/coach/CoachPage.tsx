import React from "react"
import { useFetch } from "../../hooks/useFetch"
import { UsersTable } from "./UsersTable"
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from "@material-ui/core"
import Typography from '@material-ui/core/Typography';
import { Layout } from "../../elements/Layout"
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { CoachSidebar } from "./CoachSidebar";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            fontWeight: "bold",
            padding: theme.spacing(5, 3, 3, 3),
        },
        buttonContainer: {
            marginTop: theme.spacing(4),
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"
        },
        button: {
            backgroundColor: "#0A7BC4",
            borderRadius: 8,
            color: "#fff"
        },
        listTitle: {
            textTransform: "uppercase",
            color: "#5f5e5e",
            padding: theme.spacing(3),
            fontSize: "12px",
            fontWeight: 400,
            letterSpacing: 1
        },
        listLink: {
            color: "rgba(0, 0, 0, NaN)",
            textDecoration: "none",
            '&:visited': {
                color: "#000"
            },
        },
        addIcon: {
            background: "#e84c4c57",
            borderRadius: "50%",
            marginLeft: "85px",
            width: "32px",
            height: "32px"
        }
    }),
);
export const CoachPage = () => {
    const { data } = useFetch("/users")
    const classes = useStyles()

    const MainJSX = () => {
        return (
            <>
                <Grid container spacing={3}>
                    <Grid item xs={10}>
                        <Typography variant="h3" className={classes.title}>
                            Users
                    </Typography>
                    </Grid>
                    <Grid item xs={2} className={classes.buttonContainer}>
                        <Button variant="contained" className={classes.button}
                            startIcon={<PersonAddIcon />}>
                            Create User
                    </Button>
                    </Grid>
                </Grid>

                <UsersTable users={data} />
            </>
        )
    }

    if (Object.keys(data).length === 0) {
        return <Layout sidebarJSX={<CoachSidebar />} mainJSX={<></>} />
    } else {
        return <Layout sidebarJSX={<CoachSidebar />} mainJSX={<MainJSX />} />
    }
}