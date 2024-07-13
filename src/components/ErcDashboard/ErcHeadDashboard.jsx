import React from 'react'
import Sidebar from '../layout/Sidebar'
export default function ErcHeadDashboard() {
  return (
    <div className="flex  xl:flex-row flex-col h-[100vh] overflow-hidden  ">
                {/*  */}
                <Sidebar className=' ' pageName="vsd" />
                {/*  */}
                <div className='w-full xl:w-[85%]  overflow-y-auto  '>
                   Page
                </div>
            </div>
  )
}
