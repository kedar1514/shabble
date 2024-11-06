import React from 'react'

interface TileProps {
    className?: string;
    tileContent?: string;
}

function Tile({className, tileContent}: TileProps) {
  return (
    <div className={`flex items-center justify-center w-[84px] h-[84px] rounded-xl bg-gray-medium font-bold text-4xl ${className}`}>
        {tileContent}
    </div>
  )
}

export default Tile