import React from "react"
import { AuthError, LoginPage } from "./LoginPage";
import { CoachPage } from "../components/coach/CoachPage";
import { FreelancerPage } from "../components/freelancer/FreelancerPage";
import { FreelancerViewPage } from "../components/coach/FreelancerViewPage";
import { Route, Switch } from 'react-router-dom'
import { AuthContext } from "../utils/AuthContext";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

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
                {/* should protect routes for different roles */}
                <Route exact path={["/", "/login"]} component={LoginPage} />
                <Route exact path="/coach" component={CoachPage} />
                <Route exact path="/freelancer" component={FreelancerPage} />
                <Route exact path="/freelancer/:id" component={FreelancerViewPage} />
            </Switch>
        </AuthContext.Provider >
    )
}
