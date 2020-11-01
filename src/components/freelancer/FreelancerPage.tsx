import React from "react"
import { useFetch } from "../../hooks/useFetch"
import { FreelancerInfo } from "./FreelancerInfo"
import { AuthContext } from "../../utils/AuthContext"
import { Layout } from "../../elements/Layout"

export const Freelancer = () => {
    const authContext = React.useContext(AuthContext)
    const { data, isLoading } = useFetch("/users/me")

    if (data.message) {
        authContext.logout()
    }

    if (isLoading) {
        return null
    }
    return (
        <Layout sidebarJSX={<></>} mainJSX={<FreelancerInfo info={data} />} />
    )
}