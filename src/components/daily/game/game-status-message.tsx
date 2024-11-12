import { MAX_HINTS } from '@/constants'
import { useGameSettings } from '@/contexts'

export function GameStatusMessage() {
    const { settings } = useGameSettings()

    const getMessage = (): React.ReactNode => {
        switch (settings.gameStatus) {
            case "won":
            case "lost":
            case "playing":
                if (settings.hints === 0 && settings.gameStatus !== "won") {
                    return <span className='text-[#a9abad] font-normal'>CLICK ANY TILE TO GET A HINT</span>
                }
                return (
                    <span className='text-[#a9abad] font-normal'>
                        <span className='font-bold text-black'>
                            {MAX_HINTS[settings.boardSize] - settings.hints}
                        </span> HINTS REMAINING
                    </span>
                )
            case "guess-loading":
                return <span className='text-[#a9abad] font-normal'>CHECKING...</span>
            case "guessing":
                return (
                    <span className='text-[#a9abad] font-normal'>
                        {settings.guessTileCount}/{settings.boardSize} TILES OF HIDDEN SHAPE SELECTED
                    </span>
                )
            default:
                return null
        }
    }

    return (
        <div className='text-black font-bold text-sm sm:text-xl md:text-2xl'>
            {getMessage()}
        </div>
    )
}