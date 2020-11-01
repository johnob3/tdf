import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { IconButton, ListItem, ListItemIcon } from "@material-ui/core"
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';

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
            fontSize: "12px",
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
        addIcon: {
            background: "#e84c4c57",
            borderRadius: "50%",
            marginLeft: "85px",
            width: "32px",
            height: "32px"
        }
    }),
);

export const CoachSidebar = () => {
    const classes = useStyles()
    return (
        <>
            <Typography variant="h6" className={classes.listTitle}>
                User management
                </Typography>
            <Link to="/coach" className={classes.listLink}>
                <ListItem button key={"Users"}>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <span className={classes.listLink}>Users</span>
                    <IconButton className={classes.addIcon} color="secondary" aria-label="add an alarm">
                        <AddIcon />
                    </IconButton>
                </ListItem>
            </Link>
        </>
    )
}