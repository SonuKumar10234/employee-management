import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeList from './components/EmployeeList';
import Navbar from './components/Navbar';

function App() {

  return (
    <>
    <ToastContainer />
      <Navbar />
      <EmployeeList />
    </>
  )
}

export default App;
