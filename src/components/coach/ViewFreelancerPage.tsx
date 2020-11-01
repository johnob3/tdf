import React from "react"
import { useFetch } from "../../hooks/useFetch"
import { AuthContext } from "../../utils/AuthContext"
import { Layout } from "../../elements/Layout"
import { Button, createStyles, Grid, Icon, IconButton, ListItem, ListItemIcon, makeStyles, Theme, Typography } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom";
import { FreelancerGrid } from "../common/FreelancerGrid"
import CreateIcon from '@material-ui/icons/Create';
import { EditFreelancerGrid } from "./EditFreelancerGrid"
import SaveIcon from '@material-ui/icons/Save';
import { VARIABLES } from "../../config/variables"

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
export type RequestBody = {
    "first_name": string,
    "last_name": string,
    "email": string,
    "phone": string
}

export const FreelancerView = () => {
    const authContext = React.useContext(AuthContext)
    const history = useHistory()
    const classes = useStyles()

    const { data, isLoading } = useFetch(`/users/${history.location.pathname.split("/")[2]}`)

    if (data.message) {
        authContext.logout()
    }

    const requestBody = React.useRef<RequestBody>({
        "first_name": data.first_name,
        "last_name": data.last_name,
        "email": data.email,
        "phone": data.phone
    })


    React.useEffect(() => {
        requestBody.current = {
            "first_name": data.first_name,
            "last_name": data.last_name,
            "email": data.email,
            "phone": data.phone
        }
    }, [data])
    const [editMode, setEditMode] = React.useState(false)

    const makeChange = () => {
        const auth = JSON.parse(localStorage.getItem("authState")!)
        if (!auth) {
            return
        }
        const idToken = auth.signInUserSession.idToken.jwtToken

        fetch(`${VARIABLES.URL}/users/${data.id}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${idToken}`,
                "content-type": "application/json"
            },
            body: JSON.stringify(requestBody.current),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
    }

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

    const editField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //@ts-ignore
        requestBody.current[e.currentTarget.name] = e.currentTarget.value
    }

    const renderFreelancer = () => {
        if (!editMode) {
            return (
                <FreelancerGrid info={data} />
            )
        } else {
            return (
                <>
                    <EditFreelancerGrid editField={editField} data={requestBody} />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => setEditMode(false)}
                    >
                        Cancel
                     </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={makeChange}
                    >
                        Save Changes
                     </Button>
                </>
            )
        }
    }

    const MainJSX = () => {
        return (<>
            <Grid container spacing={3}>
                <Grid item xs={10}>
                    <Typography variant="h3" className={classes.title}>{data.first_name + " " + data.last_name}</Typography>
                    <Typography variant="caption">{data.role} • User ID {data.id} </Typography>
                </Grid>
                <Grid item xs={2} className={classes.button}>
                    {!editMode && <Button variant="contained" color="primary" onClick={() => setEditMode(!editMode)}>
                        <Icon><CreateIcon /></Icon>
                        Edit User
                        </Button>
                    }
                </Grid>
            </Grid>
            {renderFreelancer()}
        </>
        )
    }

    if (isLoading) {
        return null
    }
    return (
        <Layout sidebarJSX={<SidebarJSX />} mainJSX={<MainJSX />} />
    )
}