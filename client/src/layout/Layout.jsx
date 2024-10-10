import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

export const Layout = () => {
  return (
    <div className='w-full h-screen'>

<Header/>
        <Outlet/>
    </div>
  )
}
