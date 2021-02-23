import React, { useState } from 'react'
import EmployeesForm from './EmployeesForm';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import PageHeader from '../../components/PageHeader';
import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import useTable from '../../components/controls/useTable';
import * as employeeService from "../../services/employeeService";
import Controls from '../../components/controls/Controls';
import Search from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Popup from '../../components/controls/Popup';
import EditOutlined from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme =>({
    pageContent:{
        margin:theme.spacing(5),
        padding:theme.spacing(3)
    },
    searchInput:{
        width:'75%'
    },
    newButton : {
        position:'absolute',
        right:'10px'
    }
}))

const headCells = [
    {id:'fullName',label:'Employee Name'},
    {id:'email',label:'Email Address (personal)'},
    {id:'mobile',label:'Mobile Number'},
    {id:'deparment',label:'Department',disableSorting:true},
    {id:'actions', label:'Actions',disableSorting:true}
]

export default function Employees(){

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records,setRecords] = useState(employeeService.getAllEmployees());
    const [filterFn, setfilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false);

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

    const addOrEdit = (employee, resetForm) => {
        if (employee.id == 0)
            employeeService.insertEmployee(employee)
        else
            employeeService.updateEmployee(employee)
            resetForm()
            setRecordForEdit(null)
            setOpenPopup(false)
            setRecords(employeeService.getAllEmployees())
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    return (
    <>
        <PageHeader 
        title="New Employee"
        subTitle="Form design with validation"
        icon = {<PeopleOutlineTwoToneIcon fontSize='large'/>}
        />
        <Paper className={classes.pageContent}>
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
            <Controls.Button 
                text = "Add New"
                variant = "outlined"
                className = {classes.newButton}
                startIcon = {<AddIcon />}
                onClick = {() => { setOpenPopup(true); setRecordForEdit(null);}}
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
                            <TableCell>
                                <Controls.ActionButton
                                    color="primary"
                                    onClick = {() => {openInPopup(item)}}>
                                      <EditOutlined fontSize="small" />
                                </Controls.ActionButton>
                                <Controls.ActionButton
                                    color="secondary">
                                      <CloseIcon fontSize="small" />
                                </Controls.ActionButton>
                            </TableCell>
                        </TableRow>)
                        )
                }
            </TableBody>
        </TblContainer>
        <TblPagination />
        </Paper>
        <Popup
            title = "Employee Form"
            openPopup = {openPopup}
            setOpenPopup = {setOpenPopup}
        >
        <EmployeesForm 
            recordForEdit={recordForEdit}
            addOrEdit={addOrEdit}/>
        </Popup>
    </>
    )
}