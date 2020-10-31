import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


type Props = {
    users: User[]
}

type User = {
    id: string,
    email: string,
    first_name: string,
    last_name: string,
    phone: string,
    role: string
}

export const UsersTable = (props: Props) => {
    const classes = useStyles()

    const renderUsers = () => {
        return props.users.map((user) => {
            return (
                <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                        {user.email}
                    </TableCell>
                    <TableCell>{user.first_name + " " + user.last_name}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.phone}</TableCell>

                </TableRow>
            )
        })
    }
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>Full name</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Phone</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderUsers()}
                </TableBody>
            </Table>
        </TableContainer>
    );

}