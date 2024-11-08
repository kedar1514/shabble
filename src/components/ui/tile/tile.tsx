import React from 'react'
import { tv } from 'tailwind-variants'

interface TileProps {
  className?: string;
  tileContent?: string;
  guessContent?: string;
  onClick?: () => void;
  gameStatus?: string;
  incorrectGuess?: boolean;
}

const tile = tv({
  base: "flex items-center justify-center rounded-md md:rounded-xl font-bold text-2xl md:text-4xl cursor-pointer text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.05)]",
  variants: {
    status: {
      "tile-empty": "bg-gray-200",
      "tile-filled": "bg-yellow-400",
      "guess-empty": "bg-green-200",
      "guess-filled": "bg-green-600",
      "guess-incorrect": "bg-red-600 animate-shake",
      "won": "animate-rainbow bg-green-600"
    }
  },
  defaultVariants: {
    status: "tile-empty"
  }
})

function Tile({ className, tileContent, guessContent, onClick, gameStatus, incorrectGuess }: TileProps) {
  return (
    <div
      onClick={onClick}
      className={tile({
        status: gameStatus === "won" && guessContent
          ? "won"
          : incorrectGuess && guessContent 
            ? "guess-incorrect" 
            : gameStatus === "guessing"
              ? (guessContent ? "guess-filled" : "guess-empty")
              : (tileContent ? "tile-filled" : "tile-empty"),
        className
      })}
    >
      {gameStatus === "won" && guessContent ? 'x' : ''}
      {gameStatus === "playing" && tileContent ? tileContent : ''}
    </div>
  )
}

export default Tile