import React from 'react';
import { NavLink } from 'react-router-dom';

export const Accountnav = () => {
  return (
    <header className='w-full flex gap-3 justify-center items-center mt-4'> 
      <NavLink 
        to={'profile'}
        className={({ isActive }) => 
          isActive ? 'bg-slate-500 text-white px-4 py-2 rounded text-xl' : 'text-gray-500 text-xl hover:text-gray-700'
        }
      >
        Profile
      </NavLink>

      <NavLink 
        to='blog'
        className={({ isActive }) => 
            isActive ? 'bg-slate-500 text-white px-4 py-2 rounded text-xl' : 'text-gray-500 text-xl hover:text-gray-700'
          }
      >
        Blog
      </NavLink>



      <NavLink 
        to='create'
        className={({ isActive }) => 
            isActive ? 'bg-slate-500 text-white px-4 py-2 rounded text-xl' : 'text-gray-500 text-xl hover:text-gray-700'
          }
      >
        Create
      </NavLink>
     
    </header>
  );
};
