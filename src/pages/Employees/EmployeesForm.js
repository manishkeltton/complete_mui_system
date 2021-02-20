import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { useForm, Form } from '../../components/useForm';
import Controls from '../../components/controls/Controls';
import * as employeeService from "../../services/employeeService";

const genderItems = [
    {id:'male',title:'Male'},
    {id:'Female',title:'Female'},
    {id:'other',title:'other'},
]

const initialFValues = {
    id :0,
    fullName:'',
    email:'',
    mobile:'',
    city:'',
    gender:'male',
    departmentId:'',
    hireDate:new Date(),
    isPermanent: false,
}

export default function EmployeesForm(){
    
    const {
        values,
        setValues,
        handleInputChange
    } = useForm(initialFValues);

    return (
        <Form>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="fullName"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                    />
                   <Controls.Input 
                        name="Email"
                        label="email"
                        value={values.email}
                        onChange= {handleInputChange}
                   />
                   <Controls.Input 
                        name="mobile"
                        label="Mobile"
                        value={values.email}
                        onChange= {handleInputChange}
                   />
                   <Controls.Input 
                        name="city"
                        label="City"
                        value={values.email}
                        onChange= {handleInputChange}
                   />
                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup 
                        name="gender"
                        label="Gender"
                        values={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                    <Controls.Select
                        name="departmentId"
                        label="Department"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                    />

                    <Controls.DatePicker
                        name="hireDate"
                        label="Hire Date"
                        value={values.hireDate}
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                        name="isPermanent"
                        label="Permanent Employee"
                        value={values.isPermanent}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Controls.Button
                         type="submit"
                         text="Submit" />
                        <Controls.Button
                         text="Reset"
                         color="default" />
                    </div>

                </Grid>
            </Grid>
        </Form>
    )
}