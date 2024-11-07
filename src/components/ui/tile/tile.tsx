import React from 'react'
import { tv } from 'tailwind-variants'

interface TileProps {
  className?: string;
  tileContent?: string;
  guessContent?: string;
  onClick?: () => void;
  guessMode?: boolean;
  incorrectGuess?: boolean;
}

const tile = tv({
  base: "flex items-center justify-center w-[40px] h-[40px] md:w-[84px] md:h-[84px] rounded-lg md:rounded-xl font-bold text-4xl m-0.5 md:m-1 cursor-pointer text-white",
  variants: {
    status: {
      "tile-empty": "bg-gray-medium",
      "tile-filled": "bg-yellow-medium",
      "guess-empty": "bg-green-light",
      "guess-filled": "bg-green-medium",
      "guess-incorrect": "bg-red-600 animate-shake"
    }
  },
  defaultVariants: {
    status: "tile-empty"
  }
})

function Tile({ className, tileContent, guessContent, onClick, guessMode, incorrectGuess }: TileProps) {
  return (
    <div
      onClick={onClick}
      className={tile({
        status: incorrectGuess && guessContent ? "guess-incorrect" : guessMode
          ? (guessContent ? "guess-filled" : "guess-empty")
          : (tileContent ? "tile-filled" : "tile-empty"),
        className
      })}
    >
      {!guessMode && tileContent ? tileContent : ''}
    </div>
  )
}

export default Tile