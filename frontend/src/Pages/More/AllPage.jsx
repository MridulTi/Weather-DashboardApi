import React from 'react'
import { Outlet } from 'react-router-dom'
import ErrorModal from '../../Components/ErrorModal'
import { useError } from '../../Context/ErrorContext'

function AllPage() {
    const{error,closeError}=useError()
  return (
    <>
    <div className="z-10">
        <Outlet/>
    </div>
    {error&&<ErrorModal message={error} onClose={closeError}/>}
    </>
    
  )
}

export default AllPage