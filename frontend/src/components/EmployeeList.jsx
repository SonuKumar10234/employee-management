import React, { useEffect, useState } from 'react';
import { PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Modal from './Modal';
import { deleteEmployee, getAllEmployees } from '../redux/slices/employeeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from './Loader';


const EmployeeList = () => {
    const [modalData, setModalData] = useState({ open: false, employee: null });
    const [searchTerm, setSearchTerm] = useState('');
    const { employees, loading } = useSelector(store => store.employee);
    const dispatch = useDispatch();

    const handleModalOpen = (employee = null) => {
        setModalData({ open: true, employee });
    };

    const handleModalClose = () => {
        setModalData({ open: false, employee: null });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase().trim());
    };

    const filteredEmployees = employees.filter(employee =>
        employee.email.toLowerCase().includes(searchTerm)
    );

    useEffect(() => {
        dispatch(getAllEmployees());
    }, []);
    
    if(loading){
        return(
            <Loader />
        )
    }

    return (
        <div className="mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div>
                    <h2 className="text-2xl font-semibold leading-tight mb-6">Employees</h2>
                </div>
                <div className="my-2 flex sm:flex-row flex-col sm:justify-between gap-4 sm:gap-0">
                    <div className="relative">
                        <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                            <MagnifyingGlassIcon className="h-4 w-4 fill-current text-gray-500"/>
                        </span>
                        <input
                            placeholder="Search by email Id"
                            onChange={handleSearch}
                            className="border border-gray-400 rounded-md pl-8 pr-6 py-2 w-full bg-white text-gray-700 text-sm placeholder-gray-400 focus:placeholder-gray-600 outline-none"
                        />
                    </div>
                    <div>
                        <button
                            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded transition-all duration-200"
                            onClick={() => handleModalOpen()}
                        >
                            Add Employee
                        </button>
                        {modalData.open && (
                            <Modal
                                selectedEmployee={modalData.employee}
                                onClose={handleModalClose}
                            />
                        )}
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-5 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        S. No.
                                    </th>
                                    <th className="px-5 py-5 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        First Name
                                    </th>
                                    <th className="px-5 py-5 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Last Name
                                    </th>
                                    <th className="px-5 py-5 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-5 py-5 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Phone
                                    </th>
                                    <th className="px-5 py-5 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Address
                                    </th>
                                    <th className="px-5 py-5 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredEmployees && filteredEmployees.length > 0 ? (

                                        filteredEmployees.map((employee, index) => (
                                            <tr key={employee.id}>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{employee.firstName}</p>
                                                </td>

                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{employee.lastName}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{employee.email}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{employee.phoneNumber}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 text-sm font-medium">{employee.address}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div className='flex '>
                                                        <div className="cursor-pointer text-gray-600 hover:text-gray-400 mr-2" onClick={() => dispatch(deleteEmployee(employee.id))}>
                                                            <TrashIcon className="w-5 h-5 text-base" />
                                                        </div>
                                                        <div className="cursor-pointer text-gray-600 hover:text-gray-400 mx-2" onClick={() => handleModalOpen(employee)}>
                                                            <PencilIcon className="w-5 h-5 text-base" />
                                                        </div>
                                                    </div>
                                                </td>


                                            </tr>
                                        ))

                                    )
                                        :
                                        (
                                            <tr>
                                                <td
                                                    colSpan="7"
                                                    className="px-5 py-5 text-sm text-center text-gray-500"
                                                >
                                                    No employee found !!!
                                                </td>
                                            </tr>
                                        )
                                }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeList;