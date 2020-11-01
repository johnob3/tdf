import React from 'react'
import { Box, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { UserInfo } from '../freelancer/FreelancerInfo';

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

type Props = {
    info: UserInfo
}

export const FreelancerGrid = (props: Props) => {
    const classes = useStyles()

    const BoldText = ({ text }: { text: string }) => {
        return <Typography className={classes.boldText} variant="caption">{text}</Typography>
    }
    const RegularText = ({ text }: { text: string }) => {
        return <Typography className={classes.regularText} variant="caption">{text}</Typography>
    }

    return (<Box className={classes.box}>
        <Typography variant="h4" className={classes.boldText}>Account Information</Typography>
        <Grid className={classes.divider} container spacing={2}>
            <Grid item xs={6}>
                <BoldText text="First Name:" />
            </Grid>
            <Grid item xs={6}>
                <RegularText text={props.info.first_name} />
            </Grid>
        </Grid>
        <Grid className={classes.divider} container spacing={2}>
            <Grid item xs={6}>
                <BoldText text="Last Name:" />
            </Grid>
            <Grid item xs={6}>
                <RegularText text={props.info.last_name} />
            </Grid>
        </Grid>
        <Grid className={classes.divider} container spacing={2}>
            <Grid item xs={6}>
                <BoldText text="E-mail:" />
            </Grid>
            <Grid item xs={6}>
                <RegularText text={props.info.email} />
            </Grid>
        </Grid>
        <Grid className={classes.divider} container spacing={2}>
            <Grid item xs={6}>
                <BoldText text="Phone:" />
            </Grid>
            <Grid item xs={6}>
                <RegularText text={props.info.phone} />
            </Grid>
        </Grid>
        <Grid className={classes.divider} container spacing={2}>
            <Grid item xs={6}>
                <BoldText text="Role:" />
            </Grid>
            <Grid item xs={6}>
                <RegularText text={props.info.role} />
            </Grid>
        </Grid>
        <Grid className={classes.divider} container spacing={2}>
            <Grid item xs={6}>
                <BoldText text="Status:" />
            </Grid>
            <Grid item xs={6}>
                <RegularText text={props.info.status} />
            </Grid>
        </Grid>
    </Box>)
}