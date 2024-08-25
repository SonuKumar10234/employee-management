import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    employees: [],
    loading: false,
}

export const getAllEmployees = createAsyncThunk('employee/getAllEmployees', async () => {
    const resp = await axios.get('http://localhost:5000/api/employees');
    return resp.data;
})

export const createEmployee = createAsyncThunk('employee/createEmployee', async (employeeData) => {
    const resp = await axios.post('http://localhost:5000/api/employees', employeeData);
    return resp.data;
})

export const updateEmployee = createAsyncThunk('employee/updateEmployee', async ({ id, employeeData }) => {
    const resp = await axios.put(`http://localhost:5000/api/employees/${id} `, employeeData);
    return { ...resp.data, employee: { ...employeeData, id } };
})

export const deleteEmployee = createAsyncThunk('employee/deleteEmployee', async (employeeId) => {
    const resp = await axios.delete(`http://localhost:5000/api/employees/${employeeId} `);
    return { ...resp.data, employeeId };
})


const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllEmployees.pending, (state) => {
            state.loading = true;  // Set loading to true
        })
            .addCase(getAllEmployees.fulfilled, (state, action) => {
                state.loading = false;
                const { status } = action.payload;
                if (status === 200) {
                    state.employees = action.payload.employees;
                }
                else if (status === 500) {
                    toast.error(action.payload.message, {
                        position: 'bottom-right'
                    })
                }
                else {
                    toast.error('Internal server error', {
                        position: 'bottom-right'
                    })
                }
            })
            .addCase(getAllEmployees.rejected, (state) => {
                state.loading = false;
                toast.error('Failed to fetch employees', {
                    position: 'bottom-right'
                });
            })




            .addCase(createEmployee.pending, (state) => {
                state.loading = true; 
            })
           
            .addCase(createEmployee.fulfilled, (state, action) => {
                state.loading = false;
                const { message, status } = action.payload;
                if (status === 201) {
                    state.employees.push(action.payload.employee);
                    toast.success(message, {
                        position: "bottom-right"
                    })
                }
                else if (status === 500) {
                    toast.error(message, {
                        position: "bottom-right"
                    })
                }
                else {
                    toast.error('Internal server error', {
                        position: 'bottom-right'
                    })
                }
            })
            .addCase(createEmployee.rejected, (state) => {
                state.loading = false;
                toast.error('Failed to create employee', {
                    position: 'bottom-right'
                });
            })
           



            .addCase(updateEmployee.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.loading = false;
                const { employee, message, status } = action.payload;
                if (status === 200) {
                    // finding the index of employee to be updated
                    const index = state.employees.findIndex(emp => emp.id === employee.id);

                    // updating the old employee data with the updated data
                    if (index !== -1) {
                        state.employees[index] = employee;
                    }
                    toast.success(message, {
                        position: "bottom-right"
                    })
                }
                else if (status === 404) {
                    toast.error(message, {
                        position: "bottom-right"
                    })
                }
                else if (status === 500) {
                    toast.error(message, {
                        position: "bottom-right"
                    })
                }
                else {
                    toast.error('Internal server error', {
                        position: 'bottom-right'
                    })
                }
            })
            .addCase(updateEmployee.rejected, (state) => {
                state.loading = false;
                toast.error('Failed to update employee', {
                    position: 'bottom-right'
                });
            })
           



            .addCase(deleteEmployee.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.loading = false;
                const { message, status, employeeId } = action.payload;
                if (status === 200) {
                    // Removing the deleted employee from the state
                    state.employees = state.employees.filter((employee) => employee.id !== employeeId);
                    toast.success(message, {
                        position: "bottom-right"
                    })
                }
                else if (status === 404) {
                    toast.error(message, {
                        position: "bottom-right"
                    })
                }
                else if (status === 500) {
                    toast.error(message, {
                        position: "bottom-right"
                    })
                }
                else {
                    toast.error('Internal server error', {
                        position: 'bottom-right'
                    })
                }
            })
            .addCase(deleteEmployee.rejected, (state) => {
                state.loading = false;
                toast.error('Failed to delete employee', {
                    position: 'bottom-right'
                });
            })
    }
});


export default employeeSlice.reducer;

