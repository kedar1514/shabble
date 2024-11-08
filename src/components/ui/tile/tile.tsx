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
  base: "flex items-center justify-center rounded-md md:rounded-xl font-bold text-2xl md:text-4xl cursor-pointer text-white",
  variants: {
    status: {
      "tile-empty": "bg-gray-medium",
      "tile-filled": "bg-yellow-medium",
      "guess-empty": "bg-green-light",
      "guess-filled": "bg-green-medium",
      "guess-incorrect": "bg-red-600 animate-shake",
      "won": "animate-rainbow bg-green-medium"
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
      {gameStatus === "won" && guessContent ? '•' : ''}
      {gameStatus === "playing" && tileContent ? tileContent : ''}
    </div>
  )
}

export default Tile