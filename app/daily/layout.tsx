import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-screen h-screen bg-gray-medium'>
      <div className='w-full h-full flex justify-center items-center'>
        <div className='max-w-[730px] w-full h-full bg-white'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default layout