import React from 'react'

interface IconsProps {
  icon: React.ReactNode
  className?: string
  onClick?: () => void
}

function Icons({ icon, className, onClick }: IconsProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center w-[40px] h-[40px] md:w-[48px] md:h-[48px] rounded-lg md:rounded-xl bg-gray-200 cursor-pointer ${className}`}
    >
      {icon}
    </div>
  )
}

export default Icons