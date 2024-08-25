import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/solid'

const Navbar = () => {
    return (
        <nav className="bg-gray-900 fixed w-full top-0 start-0 border-b border-gray-600 z-10">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                <a
                    href="/"
                >
                    <span className="self-center text-2xl whitespace-nowrap text-white">
                        Employee Management
                    </span>
                </a>

                <button className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 hover:bg-gray-700 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-600">
                    <Bars3Icon className='w-8 h-8'/>
                </button>

            </div>
        </nav>

    )
}

export default Navbar;