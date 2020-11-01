import React from "react"
import { AuthError, LoginPage } from "./LoginPage";
import { Coach } from "../components/coach/CoachPage";
import { Freelancer } from "../components/freelancer/FreelancerPage";
import { Route, Switch } from 'react-router-dom'
import { AuthContext } from "../utils/AuthContext";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { FreelancerView } from "../components/coach/ViewFreelancerPage";

export const AuthWrapper = () => {
    const history = useHistory()

    const logout = async () => {
        await Auth.signOut({ global: true });
        localStorage.clear()
        history.push("/")
    }

    const login = async (
        email: string,
        password: string,
        setError: React.Dispatch<React.SetStateAction<AuthError>>) => {
        try {
            setError(null)
            const auth = await Auth.signIn(email, password);
            localStorage.setItem("authState", JSON.stringify(auth))
            history.push((auth.attributes["custom:roles"].toLowerCase()))
        } catch (err) {
            setError(err)
        }
    }

    return (
        <AuthContext.Provider value={{
            login,
            logout
        }}>
            <Switch>
                <Route exact path={["/", "/login"]} component={LoginPage} />
                <Route exact path="/coach" component={() => <Coach />} />
                <Route exact path="/freelancer" component={Freelancer} />
                <Route exact path="/freelancer/:id" component={FreelancerView} />
            </Switch>
        </AuthContext.Provider >
    )
}
