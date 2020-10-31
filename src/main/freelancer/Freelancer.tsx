import { CircularProgress } from "@material-ui/core"
import { Auth } from "aws-amplify"
import React from "react"
import { useFetch } from "../../hooks/useFetch"
import { FreelancerInfo } from "./FreelancerInfo"

export const Freelancer = () => {
    const { data, isLoading } = useFetch("/users/me")

    console.log(data)

    const signOut = async () => {
        await Auth.signOut({ global: true });
    }

    if (isLoading) {
        return <CircularProgress />
    }
    return (
        <div>
            <button onClick={signOut}>Sign Out</button>
            <>Freelancer</>
            <FreelancerInfo info={data} />
        </div>
    )
}