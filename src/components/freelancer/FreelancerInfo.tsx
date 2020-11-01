import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { FreelancerGrid } from '../common/FreelancerGrid';

export type Props = {
    info: UserInfo
}

export type UserInfo = {
    id: string,
    email: string,
    first_name: string,
    last_name: string,
    phone: string,
    role: string
    status: "ACTIVE" | "INACTIVE"
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            padding: theme.spacing(5),
            backgroundColor: "#fff"
        },
        title: {
            fontWeight: "bold",
            padding: theme.spacing(5, 0, 5, 0),
            fontSize: "3vw"
        },
        button: {
            marginTop: theme.spacing(4)
        },
        boldText: {
            fontWeight: "bolder"
        },
        regularText: {

        },
        divider: {
            borderBottom: "solid 1px"
        },
    }),
);



export const FreelancerInfo = (props: Props) => {
    const classes = useStyles()

    return (
        <>
            <Typography variant="h1" className={classes.title}>Hello, {props.info.first_name}</Typography>
            <FreelancerGrid info={props.info} />
        </>
    )
}