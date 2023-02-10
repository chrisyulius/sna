import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Button, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Project', width: 130 },
    {
        field: 'Edit',
        headerName: 'Edit',
        sortable: false,
        renderCell: (params) => {
            const onClick = (e) => {
                e.stopPropagation(); // don't select this row after clicking

                const api = params.api;
                const thisRow = {};

                api.getAllColumns()
                    .filter((c) => c.field !== '__check__' && !!c)
                    .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

                return alert(JSON.stringify(thisRow, null, 4));
            };

            return (
                <Button variant="contained" onClick={onClick}>
                    Edit
                </Button>
            );
        }
    },
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

                return alert(JSON.stringify(thisRow, null, 4));
            };

            return (
                <Button variant="contained" onClick={onClick}>
                    Delete
                </Button>
            );
        }
    }
];

const Projects = () => {
    const data = useSelector((state) => state.network);
    const [rows, setRows] = useState([]);
    useEffect(() => {
        const userData = [...data.nodes];
        setRows(userData.filter((user) => user.type == '2'));
        console.log(rows);
    }, [data]);
    return (
        <>
            <MainCard title="Project">
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
                    <Grid item xs={12}>
                        <Button variant="contained"> Add </Button>
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default Projects;
