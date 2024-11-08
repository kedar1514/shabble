import React from 'react'

interface DividerProps {
  isVertical?: boolean;
  className?: string;
}

function Divider({
  isVertical = false,
  className,
}: DividerProps) {
  return (
    <div
      className={`${className} ${isVertical ? 'h-full w-[1px]' : 'w-full h-[1px]'} bg-gray-200`}
    />
  )
}

export default Divider