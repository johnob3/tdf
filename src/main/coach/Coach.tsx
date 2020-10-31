import React from "react"
import { SignOut } from "aws-amplify-react"
import { CircularProgress } from "@material-ui/core"
import { useFetch } from "../../hooks/useFetch"
import { UsersTable } from "./UsersTable"

type Props = {
    updateUser: (user: any) => void
}
export const Coach = (props: Props) => {
    const { data, isLoading } = useFetch("/users")

    if (isLoading && !data) {
        return (
            <>
                <SignOut />
                <CircularProgress />
            </>
        )
    } else {
        return (
            <div>
                <div>Coach screen</div>
                <SignOut />
                <UsersTable users={data} />
            </div>)
    }
}