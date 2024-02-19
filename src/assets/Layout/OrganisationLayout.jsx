import React from 'react'
import { Outlet } from 'react-router-dom'
import OrgHeader from '../Components/OrgHeader'
const OrganisationLayout = () => {
  return (
    <>
   <OrgHeader />
   <Outlet />
   </>
  )
}

export default OrganisationLayout