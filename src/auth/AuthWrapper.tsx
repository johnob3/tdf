import React from "react"
import { IAuthenticatorProps } from "aws-amplify-react/lib-esm/Auth/Authenticator";
import { CustomSignIn } from "./SignIn";
import { Auth } from "aws-amplify";
import { Coach } from "../main/coach/Coach";
import { Freelancer } from "../main/freelancer/Freelancer";

export const AuthWrapper = (props: IAuthenticatorProps) => {

    const [user, updateUser] = React.useState<any>({})


    React.useEffect(() => {
        checkUser()
    }, [])

    const checkUser = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser()
            console.log(user)
            updateUser(user)
        } catch (err) {
            //
        }
    }


    if (!user) {
        return <CustomSignIn updateUser={updateUser} />
    } else if (user && user.attributes) {
        switch (user!!.attributes["custom:roles"]) {
            case "FREELANCER": {
                return <Freelancer />
            }
            case "COACH": {
                return <Coach updateUser={updateUser} />
            }
            default: {
                // should never happen
                return null
            }
        }
    } else {
        // should never happen
        return null
    }
}