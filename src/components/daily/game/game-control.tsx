import { Button } from '@/components'
import { GameState } from '@/types'
import { useGameSettings } from '@/contexts'

interface GameControlsProps {
    gameStatus: GameState
    guessTileCount: number
    boardSize: number
    onSubmit: () => void
}

export function GameControls({ 
    gameStatus, 
    guessTileCount, 
    boardSize, 
    onSubmit 
}: GameControlsProps) {
    const { updateSettings } = useGameSettings()

    const showControls = gameStatus !== "won" && gameStatus !== "lost"
    const showBackButton = gameStatus === "guessing"
    const isSubmitDisabled = gameStatus === "guessing" && guessTileCount !== boardSize

    return (
        <div className='flex items-center justify-center space-x-4 w-[80%] md:!w-[70%]'>
            {showBackButton && (
                <Button
                    onClick={() => updateSettings({ gameStatus: "playing" })}
                    className='h-[48px] md:h-[64px] bg-yellow-400 font-bold text-xl md:text-2xl'
                >
                    GO BACK
                </Button>
            )}
            {showControls && (
                <Button
                    onClick={onSubmit}
                    disabled={isSubmitDisabled}
                    className='h-[48px] md:h-[64px] bg-green-600 font-bold text-xl md:text-2xl'
                >
                    {gameStatus === "guessing" ? 'SUBMIT' : 'MAKE A GUESS'}
                </Button>
            )}
        </div>
    )
}