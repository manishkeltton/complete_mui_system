import React, { useState } from 'react'
import EmployeesForm from './EmployeesForm';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import PageHeader from '../../components/PageHeader';
import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import useTable from '../../components/controls/useTable';
import * as employeeService from "../../services/employeeService";
import Controls from '../../components/controls/Controls';
import { Search } from '@material-ui/icons';

const useStyles = makeStyles(theme =>({
    pageContent:{
        margin:theme.spacing(5),
        padding:theme.spacing(3)
    },
    searchInput:{
        width:'75%'
    }
}))

const headCells = [
    {id:'fullName',label:'Employee Name'},
    {id:'email',label:'Email Address (personal)'},
    {id:'mobile',label:'Mobile Number'},
    {id:'deparment',label:'Department',disableSorting:true}
]

export default function Employees(){

    const classes = useStyles();
    const [records,setRecords] = useState(employeeService.getAllEmployees());
    const [filterFn, setfilterFn] = useState({ fn: items => { return items; } })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records,headCells,filterFn);

    const handleSearch = e =>  {
        let target = e.target;
        setfilterFn({
            fn: items => {
                if(target.value == "")
                    return items;
                else 
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value))
            }
        })
    }

    return (
    <>
        <PageHeader 
        title="New Employee"
        subTitle="Form design with validation"
        icon = {<PeopleOutlineTwoToneIcon fontSize='large'/>}
        />
        <Paper className={classes.pageContent}>
        {/* <EmployeesForm /> */}
        <Toolbar>
            <Controls.Input
                label="Search Employees"
                className = {classes.searchInput} 
                InputProps={{
                    startAdorment: (<InputAdornment position="start">
                        <Search />
                    </InputAdornment>)
               }}
               onChange={ handleSearch }
            />
        </Toolbar>
        <TblContainer>
            <TblHead />
            <TableBody>
                {
                    recordsAfterPagingAndSorting().map(item =>
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
        <TblPagination />
        </Paper>
    </>
    )
}