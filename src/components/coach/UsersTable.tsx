import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TablePagination } from '@material-ui/core';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    fullNameCell: {
        '&:hover': {
            background: "#ddd",
            cursor: "pointer"
        },
    }
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
    const history = useHistory()
    const classes = useStyles()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const showUser = (id: string) => {
        history.push(`/freelancer/${id}`)
    }

    const renderUsers = () => {
        return props.users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => {
            return (
                <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                        {user.email}
                    </TableCell>
                    <TableCell
                        onClick={() => showUser(user.id)}
                        className={classes.fullNameCell}>
                        {user.first_name + " " + user.last_name}
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                </TableRow>
            )
        })
    }
    return (
        <>
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
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={props.users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    );

}