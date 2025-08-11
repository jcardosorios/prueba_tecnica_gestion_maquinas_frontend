import React from 'react'

function Card({children}) {
  return (
    <div className='w-full flex flex-col rounded-md bg-card shadow-md p-6 gap-4'>
        {children}
    </div>
  )
}

export default Card