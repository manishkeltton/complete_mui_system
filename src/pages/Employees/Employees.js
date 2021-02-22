import React, { useState } from 'react'
import EmployeesForm from './EmployeesForm';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import PageHeader from '../../components/PageHeader';
import { makeStyles, Paper, TableBody, TableCell, TableRow } from '@material-ui/core';
import useTable from '../../components/controls/useTable';
import * as employeeService from "../../services/employeeService";

const useStyles = makeStyles(theme =>({
    pageContent:{
        margin:theme.spacing(5),
        padding:theme.spacing(3)
    }
}))

const headCells = [
    {id:'fullName',label:'Employee Name'},
    {id:'email',label:'Email Address (personal)'},
    {id:'mobile',label:'Mobile Number'},
    {id:'deparment',label:'Department '}
]

export default function Employees(){

    const classes = useStyles();
    const [records,setRecords] = useState(employeeService.getAllEmployees());

    const {
        TblContainer,
        TblHead
    } = useTable(records,headCells);

    return (
    <>
        <PageHeader 
        title="New Employee"
        subTitle="Form design with validation"
        icon = {<PeopleOutlineTwoToneIcon fontSize='large'/>}
        />
        <Paper className={classes.pageContent}>
        {/* <EmployeesForm /> */}
        <TblContainer>
            <TblHead />
            <TableBody>
                {
                    records.map(item =>
                        (<TableRow key={item.id}>
                            <TableCell>{item.fullName}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.mobile}</TableCell>
                            <TableCell>{item.department}</TableCell>
                        </TableRow>)
                        )
                }
            </TableBody>
        </TblContainer>
        </Paper>
    </>
    )
}