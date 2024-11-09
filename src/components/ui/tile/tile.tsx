'use client'
import { TileLoader } from '@/components';
import React, { useState } from 'react'
import { tv } from 'tailwind-variants'
import { TILE_CORRECT_EMOJI } from '@/constants/daily/game-settings';

interface TileProps {
  className?: string;
  tileContent?: string;
  guessContent?: string;
  onClick?: (setIsLoading: (isLoading: boolean) => void) => void;
  gameStatus?: string;
  incorrectGuess?: boolean;
}

const tile = tv({
  base: "flex items-center justify-center rounded-md sm:rounded-xl md:rounded-xl font-bold text-2xl md:text-4xl cursor-pointer text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.05)]",
  variants: {
    status: {
      "tile-empty": "bg-gray-200",
      "tile-filled": "bg-yellow-400",
      "guess-empty": "bg-green-200",
      "guess-filled": "bg-green-600",
      "guess-loading": "animate-guessLoading",
      "guess-incorrect": "bg-red-600 animate-shake",
      "won": "bg-green-600"
    }
  },
  defaultVariants: {
    status: "tile-empty"
  }
})

function Tile({ className, tileContent, guessContent, onClick, gameStatus, incorrectGuess }: TileProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getTileStatus = () => {
    switch (gameStatus) {
      case "guess-loading":
        if (guessContent) return "guess-loading";
      case "won":
        if (guessContent) return "won";
      case "guessing":
        return guessContent ? "guess-filled" : "guess-empty";
      default:
        if (incorrectGuess && guessContent) return "guess-incorrect";
        return (tileContent || isLoading) ? "tile-filled" : "tile-empty";
    }
  };

  return (
    <div
      onClick={() => onClick && onClick(setIsLoading)}
      className={tile({
        status: getTileStatus(),
        className
      })}
    >
      {gameStatus === "won" && guessContent ? TILE_CORRECT_EMOJI : ''}
      {gameStatus === "playing" && tileContent ? tileContent : ''}
      {isLoading && <TileLoader />}
    </div>
  )
}

export default Tile