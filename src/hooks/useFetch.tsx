import React from 'react'
import { VARIABLES } from "../config/variables"

export function useFetch(endpoint: string) {
    const [data, setData] = React.useState<any>({});
    const [error, setError] = React.useState<any>({});
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("authState")!)
        if (!auth) {
            setError('no auth found')
            return
        }
        const idToken = auth.signInUserSession.idToken.jwtToken
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(VARIABLES.URL + endpoint, {
                    headers: {
                        "Authorization": `Bearer ${idToken}`,
                        "content-type": "application/json"
                    }
                });
                const json = await res.json();
                setData(json);
                setIsLoading(false)
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, [endpoint]);
    return { data, error, isLoading };
};