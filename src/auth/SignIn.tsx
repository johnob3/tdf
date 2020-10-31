
import React from "react";
import {
    Button,
    Checkbox,
    colors,
    Container,
    createMuiTheme,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import { Auth } from "aws-amplify";
import catAvatar from "../assets/img/cat-head.png"


type AuthError = {
    code: string,
    name: string,
    message: string
} | null


type Props = {
    updateUser: (user: any) => void
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#007ac7"
        },
        secondary: {
            main: "#E84C4C"
        },
        error: {
            main: colors.red.A400
        },
        background: {
            default: "#fff"
        }
    }
});

const useStyles = makeStyles(() => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        padding: theme.spacing(10, 3, 3, 3),
        backgroundColor: "#FFFFFF",
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(20)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.primary.main
    },
    cat: {
        position: "absolute",
        top: theme.spacing(0)
    }
}));

export const CustomSignIn = (props: Props) => {
    // COACH
    // const [email, setEmail] = React.useState("ivan+no@tdf.dev")
    // const [password, setPassword] = React.useState("DufjrsuU")

    // FREELANCER
    const [email, setEmail] = React.useState("ivan+ad@tdf.dev")
    const [password, setPassword] = React.useState("XNdOz1ah")

    const [error, setError] = React.useState<AuthError>(null)

    const classes = useStyles();

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)

        try {
            const res = await Auth.signIn(email, password);
            const user = await Auth.currentUserInfo()

            console.log(res)
            localStorage.setItem("jwt", res.signInUserSession.idToken.jwtToken)
            props.updateUser(user)

        } catch (err) {
            setError(err)
        }
    }



    return (
        <div className="login">
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <img src={catAvatar} alt="cat-logo" className={classes.cat} />
                    <form className={classes.form} onSubmit={signIn}>
                        <Typography component="h1" variant="h5" align="center">
                            Welcome
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="E-mail"
                                    name="email"
                                    autoComplete="email"
                                    defaultValue={email}
                                    error={error?.code === "UserNotFoundException"}
                                    helperText={error?.message}
                                    onChange={(e) => setEmail(e.currentTarget.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    defaultValue={password}
                                    error={error?.code === "NotAuthorizedException"}
                                    helperText={error?.message}
                                    onChange={(e) => setPassword(e.currentTarget.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="rememberMe" color="primary" />}
                                    label="Remember me"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                       </Button>
                        <Grid container justify="center">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Don't have an account? Contact us
                               </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>
    )
}