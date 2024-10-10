import React from 'react'
import { Outlet } from 'react-router-dom'
import { Accountnav } from '../components/Accountnav'

const Account = () => {
  return (
    <div>
        <Accountnav/>
        <Outlet/>
    </div>
  )
}

export default Account