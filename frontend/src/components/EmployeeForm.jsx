import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createEmployee, updateEmployee } from '../redux/slices/employeeSlice';

const EmployeeForm = ({ employee, onClose }) => {

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (employee) {
      setValue('firstName', employee.firstName);
      setValue('lastName', employee.lastName);
      setValue('email', employee.email);
      setValue('phoneNumber', employee.phoneNumber);
      setValue('address', employee.address);
    }
  }, [employee]);

  return (
    <form className="bg-white w-full max-w-lg mx-auto rounded-md" onSubmit={handleSubmit((data) => {
      if (employee) {
        // call edit api 
        dispatch(updateEmployee({ id: employee.id, employeeData: data }));
      }
      else {
        // call create api
        dispatch(createEmployee(data));
      }
      reset();
      onClose();

    })}
    >
      <h2 className="text-base font-semibold leading-7 text-gray-900 text-center bg-gray-50 px-4 py-3 sm:px-6">{employee ? 'Edit Employee' : 'Add Employee'}</h2>

      <div className=" grid grid-cols-1 gap-x-6 gap-y-4 sm:gap-y-6 sm:grid-cols-6 px-6 py-6 lg:px-8">
        <div className="sm:col-span-3">
          <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
            First name
          </label>
          <div className="mt-2">
            <input
              id="firstName"
              {...register('firstName', {
                required: 'First name is required',
              })}
              type="text"
              className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.firstName && <p className='text-red-500'>{errors.firstName.message}</p>}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
            Last name
          </label>
          <div className="mt-2">
            <input
              id="lastName"
              {...register('lastName', {
                required: 'name is required',
              })}
              type="text"
              className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.lastName && <p className='text-red-500'>{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              {...register('email', {
                required: 'email is required',
                pattern: {
                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                  message: 'email is not valid'
                }
              })}
              type="email"
              className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </div>
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
            Phone Number
          </label>
          <div className="mt-2">
            <input
              id="phoneNumber"
              {...register('phoneNumber', {
                required: 'Phone number is required',
                pattern: {
                  value: /^\d{10}$/,
                  message: "Please enter a valid 10 digits Phone Number."
                }
              })}
              type="tel"
              className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.phoneNumber && <p className='text-red-500'>{errors.phoneNumber.message}</p>}
          </div>
        </div>



        <div className="col-span-full">
          <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
            Address
          </label>
          <div className="mt-2">
            <input
              id="address"
              name="address"
              {...register('address', {
                required: 'Address is required',
              })}
              type="text"
              className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.address && <p className='text-red-500'>{errors.address.message}</p>}
          </div>
        </div>

      </div>

      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
        >
          Save
        </button>
        <button
          type="button"
          data-autofocus
          onClick={onClose}
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default EmployeeForm;