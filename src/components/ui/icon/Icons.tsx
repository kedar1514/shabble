import React from 'react'

interface IconsProps {
    icon: React.ReactNode
    className?: string
}

function Icons({icon, className}: IconsProps) {
  return (
    <div className={`flex items-center justify-center w-[48px] h-[48px] rounded-xl bg-gray-medium ${className}`}>
        {icon}
    </div>
  )
}

export default Icons