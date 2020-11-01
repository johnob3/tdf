import React from "react"
import { useFetch } from "../../hooks/useFetch"
import { AuthContext } from "../../utils/AuthContext"
import { Layout } from "../../elements/Layout"
import { Button, CircularProgress, createStyles, Grid, makeStyles, Theme, Typography } from "@material-ui/core"
import { useHistory } from "react-router-dom";
import { FreelancerGrid } from "../common/FreelancerGrid"
import CreateIcon from '@material-ui/icons/Create';
import { EditFreelancerGrid } from "./EditFreelancerGrid"
import SaveIcon from '@material-ui/icons/Save';
import { CoachSidebar } from "./CoachSidebar"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            fontWeight: "bold",
            padding: theme.spacing(5, 3, 3, 0),
        },
        button: {
            marginTop: theme.spacing(4),
        },
        listTitle: {
            textTransform: "uppercase",
            color: "#5f5e5e",
            padding: theme.spacing(3),
            fontSize: "15px",
            fontWeight: 400,
            letterSpacing: 1
        },
        buttonContainer: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"
        },
        editButton: {
            backgroundColor: "#0A7BC4",
            color: "#fff"
        }
    }),
);
export type RequestBody = {
    "first_name": string,
    "last_name": string,
    "email": string,
    "phone": string
}

export const FreelancerViewPage = () => {
    const authContext = React.useContext(AuthContext)
    const history = useHistory()
    const classes = useStyles()

    const { data, isLoading } = useFetch(`/users/${history.location.pathname.split("/")[2]}`)
    const [editMode, setEditMode] = React.useState(false)


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


    const saveChanges = () => {
        const auth = JSON.parse(localStorage.getItem("authState")!)
        if (!auth) {
            return
        }
        const idToken = auth.signInUserSession.idToken.jwtToken

        fetch(`${process.env.REACT_APP_API_URL}/users/${data.id}`, {
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
        setEditMode(false)
    }

    const editField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        switch (e.currentTarget.name) {
            case "first_name": {
                requestBody.current["first_name"] = e.currentTarget.value
                break;
            }
            case "last_name": {
                requestBody.current["first_name"] = e.currentTarget.value
                break;
            }
            case "email": {
                requestBody.current["first_name"] = e.currentTarget.value
                break;
            }
            case "phone": {
                requestBody.current["phone"] = e.currentTarget.value
                break;
            }
            default: {
                return null
            }
        }
        // this would be shorter but ts complains
        // requestBody.current[e.currentTarget.name] = e.currentTarget.value
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
                    <Grid container className={classes.buttonContainer}>
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
                            onClick={saveChanges}
                        >
                            Save Changes
                     </Button>
                    </Grid>
                </>
            )
        }
    }

    const MainJSX = () => {
        if (data === null) {
            return <CircularProgress />
        } else {
            return (<>
                <Grid container spacing={3}>
                    <Grid item xs={10}>
                        <Typography variant="h3" className={classes.title}>{data.first_name + " " + data.last_name}</Typography>
                        <Typography variant="caption">{data.role} • User ID {data.id} </Typography>
                    </Grid>

                    <Grid item xs={2} className={classes.buttonContainer}>
                        {!editMode && <Button variant="contained" className={classes.editButton} onClick={() => setEditMode(!editMode)} startIcon={<CreateIcon />}>
                            Edit User
                        </Button>
                        }
                    </Grid>
                </Grid>
                {renderFreelancer()}
            </>
            )
        }
    }

    if (isLoading && data !== undefined) {
        <Layout sidebarJSX={<CoachSidebar />} mainJSX={<></>} />
    }
    return (
        <Layout sidebarJSX={<CoachSidebar />} mainJSX={<MainJSX />} />
    )
}