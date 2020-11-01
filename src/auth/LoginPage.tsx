
import React from "react";
import {
    Button,
    Container,
    Grid,
    Link,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import { AuthContext } from "../utils/AuthContext";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import background from "../assets/img/login-bg.jpg"
import logo from "../assets/img/logo.png"

export type AuthError = {
    code: string,
    name: string,
    message: string
} | null

const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    cat: {
        position: "absolute",
        top: theme.spacing(15),
        width: "104px"
    },
    title: {
        color: "#000",
        fontWeight: "bold",
        fontSize: "4rem",
        padding: theme.spacing(0, 4, 4, 4)
    },
    form: {
        padding: theme.spacing(5),
        backgroundColor: "#FFFFFF",
        width: "100%", // Fix IE 11 issue.
        minWidth: "504px",
        marginTop: theme.spacing(20),
        borderRadius: "16px",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#0A7BC4",
        textTransform: "uppercase",
        lineHeight: "50px",
        borderRadius: "12px"
    },
    passwordContainer: {
        position: "relative"
    },
    toggle: {
        position: "absolute",
        right: "12px",
        top: "24px"
    },
    login: {
        backgroundImage: `url(${background})`,
        height: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    }
}));

export const LoginPage = () => {
    // FREELANCER
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")


    const [error, setError] = React.useState<AuthError>(null)
    const [passwordVisible, setPasswordVisible] = React.useState(false)

    const authContext = React.useContext(AuthContext)
    const classes = useStyles();

    const login = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        authContext.login(email, password, setError)
    }

    return (
        <div className={classes.login}>
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <img src={logo} alt="cat-logo" className={classes.cat} />
                    <form className={classes.form} onSubmit={login}>
                        <Typography className={classes.title} component="h1" variant="h5" align="center">
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
                            <Grid item xs={12} className={classes.passwordContainer}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={passwordVisible ? "text" : "password"}
                                    defaultValue={password}
                                    error={error?.code === "NotAuthorizedException"}
                                    helperText={error?.message}
                                    onChange={(e) => setPassword(e.currentTarget.value)}
                                />
                                <Link
                                    className={classes.toggle}
                                    onClick={() => setPasswordVisible(!passwordVisible)}>
                                    {passwordVisible ?
                                        <VisibilityIcon htmlColor="#000" /> :
                                        <VisibilityOffIcon htmlColor="#000" />}
                                </Link>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Log In
                          </Button>
                    </form>
                </div>
            </Container>
        </div>
    )
}