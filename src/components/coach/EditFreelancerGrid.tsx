import React from 'react'
import { Box, createStyles, Grid, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import { RequestBody } from './ViewFreelancerPage';

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
            borderBottom: "solid 1px #ddd",
            padding: theme.spacing(2)
        },
    }),
);

type Props = {
    data: React.MutableRefObject<RequestBody>
    editField: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}


export const EditFreelancerGrid = (props: Props) => {
    const classes = useStyles()


    const BoldText = ({ text }: { text: string }) => {
        return <Typography className={classes.boldText} variant="caption">{text}</Typography>
    }

    return (<Box className={classes.box}>
        <Typography variant="h4" className={classes.boldText}>Account Information</Typography>
        <Grid className={classes.divider} container spacing={2}>
            <Grid item xs={6}>
                <BoldText text="First Name:" />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="first_name"
                    defaultValue={props.data.current["first_name"]}
                    onChange={e => props.editField(e)}
                />
            </Grid>
        </Grid>
        <Grid className={classes.divider} container spacing={2}>
            <Grid item xs={6}>
                <BoldText text="Last Name:" />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="last_name"
                    defaultValue={props.data.current["last_name"]}
                    onChange={e => props.editField(e)}
                />
            </Grid>
        </Grid>
        <Grid className={classes.divider} container spacing={2}>
            <Grid item xs={6}>
                <BoldText text="E-mail:" />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="E-mail"
                    name="email"
                    defaultValue={props.data.current["email"]}
                    onChange={e => props.editField(e)}
                />
            </Grid>
        </Grid>
        <Grid className={classes.divider} container spacing={2}>
            <Grid item xs={6}>
                <BoldText text="Phone:" />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    type="text"
                    id="phone"
                    label="Phone"
                    name="phone"
                    defaultValue={props.data.current["phone"]}
                    onChange={e => props.editField(e)}
                />
            </Grid>
        </Grid>
    </Box>)
}