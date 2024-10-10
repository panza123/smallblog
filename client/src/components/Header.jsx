import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/ContextProvider';
import { IoIosContact } from "react-icons/io";

const Header = () => {
    const { user } = useContext(UserContext);

    return (
        <header className='w-full bg-white shadow-md'>
            <div className='container mx-auto flex justify-between items-center h-16 px-4'>
                {/* Logo / Title */}
                <NavLink to='/' className='text-2xl font-bold text-blue-600 hover:text-blue-500'>
                    MyApp
                </NavLink>

                {/* User Account Link */}
                <NavLink to={user ? 'account' : '/login'} className='flex items-center space-x-2 text-gray-700 hover:text-blue-600'>
                    <IoIosContact className="text-2xl" />
                    {user ? (
                        <p className="text-lg font-medium">{user.name}</p>
                    ) : (
                        <p className="text-lg font-medium">Login</p>
                    )}
                </NavLink>
            </div>
        </header>
    );
}

export default Header;