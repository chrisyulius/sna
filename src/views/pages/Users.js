import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { addMember, deleteMember } from 'store/networkReducer';
import { useContext } from 'react';
import { NotificationContext } from 'Context/NotificationContext';

const Users = () => {
    const data = useSelector((state) => state.network);
    const dispatch = useDispatch();
    const { showSnackBar, showSnackBarError } = useContext(NotificationContext);
    const [open, setOpen] = useState(false);
    const [openErr, setOpenErr] = useState(false);
    const [rows, setRows] = useState([]);
    const [idDel, setIdDel] = useState();
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [errorId, setErrorId] = useState();
    const [errorName, setErrorName] = useState();

    useEffect(() => {
        const userData = [...data.nodes];
        setRows(userData.filter((user) => user.type == '1'));
        console.log(rows);
    }, [data]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        // {
        //     field: 'Edit',
        //     headerName: 'Edit',
        //     sortable: false,
        //     renderCell: (params) => {
        //         const onClick = (e) => {
        //             e.stopPropagation(); // don't select this row after clicking

        //             const api = params.api;
        //             const thisRow = {};

        //             api.getAllColumns()
        //                 .filter((c) => c.field !== '__check__' && !!c)
        //                 .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

        //             return alert(JSON.stringify(thisRow, null, 4));
        //         };

        //         return (
        //             <Button variant="contained" onClick={onClick}>
        //                 Edit
        //             </Button>
        //         );
        //     }
        // },
        {
            field: 'Delete',
            headerName: 'Delete',
            sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking

                    const api = params.api;
                    const thisRow = {};

                    api.getAllColumns()
                        .filter((c) => c.field !== '__check__' && !!c)
                        .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

                    return handleDelete(thisRow);
                };

                return (
                    <Button variant="contained" onClick={onClick}>
                        Delete
                    </Button>
                );
            }
        }
    ];

    const handleAdd = () => {
        setErrorId();
        setErrorName();
        if (!id) setErrorId('Id is required');
        if (!name) setErrorName('Name is required');
        if (id && name) {
            const exist = data.nodes.filter((user) => {
                return user.id == id && user.type == '1';
            });

            if (exist.length > 0) {
                showSnackBarError('The member is already exist');
            } else {
                dispatch(addMember({ id, name }));
                showSnackBar('The new member has been added successfully');
                handleClose();
            }
        }
    };

    const handleClose = () => {
        setOpen(false);
        setOpenErr(false);
        resetForm();
    };

    const handleOpen = () => {
        setOpen(true);
        setOpenErr(false);
    };

    const resetForm = () => {
        setErrorId('');
        setErrorName();
        setName('');
        setId('');
    };

    const handleDelete = (data) => {
        setIdDel(data.id);
        setOpenErr(true);
    };

    const handledel = () => {
        dispatch(deleteMember({ id: idDel }));
        showSnackBar('The new member has been deleted successfully');
        setOpenErr(false);
    };

    return (
        <>
            <MainCard title="Users">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <DataGrid
                            rows={rows}
                            autoHeight={true}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[5]}
                            checkboxSelection={false}
                        />
                    </Grid>
                    <Grid item xs>
                        <Button variant="contained" onClick={handleOpen}>
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </MainCard>
            <Dialog open={open || openErr} onClose={handleClose}>
                <DialogTitle>{openErr ? 'Delete Member' : 'Add Member'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{openErr && 'Are you sure you want to delete this member?'}</DialogContentText>
                    {open && (
                        <>
                            <TextField
                                margin="dense"
                                error={errorId}
                                required
                                id="Id"
                                label="Id"
                                fullWidth
                                variant="standard"
                                helperText={errorId}
                                onChange={(event) => setId(event.target.value)}
                            />
                            <TextField
                                margin="dense"
                                required
                                error={errorName}
                                id="name"
                                label="name"
                                fullWidth
                                variant="standard"
                                helperText={errorName}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={(openErr && handledel) || handleAdd}>{openErr ? 'Ok' : 'Submit'}</Button>
                </DialogActions>
            </Dialog>

            {/* <Dialog
                open={openErr}
                onClose={setOpenErr(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are
                        running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={setOpenErr(false)}>Disagree</Button>
                    <Button onClick={setOpenErr(false)}>Agree</Button>
                </DialogActions>
            </Dialog> */}
        </>
    );
};

export default Users;
