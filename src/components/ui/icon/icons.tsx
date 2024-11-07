import React from 'react'

interface IconsProps {
    icon: React.ReactNode
    className?: string
}

function Icons({icon, className}: IconsProps) {
  return (
    <div className={`flex items-center justify-center w-[40px] h-[40px] md:w-[48px] md:h-[48px] rounded-lg md:rounded-xl bg-gray-medium ${className}`}>
        {icon}
    </div>
  )
}

export default Icons