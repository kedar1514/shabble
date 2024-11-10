'use client'
import React, { useState } from 'react'
import { TiThMenu } from "react-icons/ti";
import { FaHeart, FaQuestion } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { Icons, Title, Board, Button, Text, Confetti } from '@/components';
import { getHint, checkGuess } from '@/api/daily-api';
import { MAX_HINTS } from '@/constants';
import { useGameSettings } from '@/hooks';
import Help from './help'


function Daily() {

    const { settings, updateSettings } = useGameSettings();
    const [guess, setGuess] = useState<string[][]>(Array.from({ length: settings.boardSize }, () => Array(settings.boardSize).fill('')));
    // const [settings.gameStatus, setGameStatus] = useState<"playing" | "guessing" | "won" | "lost" | "guess-loading">("playing");
    const [guessTileCount, setGuessTileCount] = useState<number>(0);
    const [incorrectGuess, setIncorrectGuess] = useState<boolean>(false);
    const [showHelp, setShowHelp] = useState<boolean>(true);
    // const [statistics, setStatistics] = useState<{
    //     played: number;
    //     totalStars: number;
    //     currentStreak: number;
    //     bestStreak: number;
    //     starDistribution: number[]
    // }>({
    //     played: 0,
    //     totalStars: 0,
    //     currentStreak: 0,
    //     bestStreak: 0,
    //     starDistribution: Array(STAR_COUNT + 1).fill(0)
    // });
    console.log("Settings inside daily",settings)
    // if (settings.hints >= MAX_HINTS[settings.boardSize] && settings.gameStatus === "playing") {
    //     setGameStatus("lost");
    // }

    const handleTileClick = async (x: number, y: number, setIsLoading: (isLoading: boolean) => void) => {

        if (settings.gameStatus === "guessing") {
            if (guess[x][y] !== '') {
                setGuess(prevGuess => {
                    const newGuess = [...prevGuess];
                    newGuess[x][y] = '';
                    console.log("newGuess inside handletileclick", newGuess);

                    return newGuess;
                });
                setGuessTileCount(prevCount => prevCount - 1);
            }
            else {
                if (guessTileCount >= settings.boardSize) return;
                setGuess(prevGuess => {
                    const newGuess = [...prevGuess];
                    newGuess[x][y] = 'X';
                    return newGuess;
                });
                setGuessTileCount(prevCount => prevCount + 1);
            }
        }
        else {
            if (settings.board[x][y] !== '' || settings.hints >= MAX_HINTS[settings.boardSize]) return;
            setIsLoading(true);
            try {
                const data = await getHint(settings.puzzleId, x, y);
                const adjacentCount = data.adjacentCount;
                console.log("adjacentCount", adjacentCount);
                const newBoard = [...settings.board]
                newBoard[x][y] = adjacentCount.toString();
                updateSettings({ hints: data.hintCount, board: newBoard }); 
                // if (settings.hints >= MAX_HINTS[settings.boardSize]) {
                //     setGameStatus("lost");
                // }
            } catch (error) {
                console.error('Error fetching hint:', error);
            }
            setIsLoading(false);
        }
    }

    const handleSubmitButton = async () => {
        console.log("make guess");
        switch (settings.gameStatus) {
            case "won":
            case "lost":
                // setGameStatus("playing");
                // setBoard(Array.from({ length: settings.boardSize }, () => Array(settings.boardSize).fill('')));
                // setGuess(Array.from({ length: settings.boardSize }, () => Array(settings.boardSize).fill('')));
                // setGuessTileCount(0);
                // updateSettings({ hints: MAX_HINTS[settings.boardSize] }); 
                break;
            case "guessing":
                try {
                    updateSettings({ gameStatus: "guess-loading" });
                    const [response,] = await Promise.all([
                        checkGuess(settings.puzzleId, guess, settings.hints),
                        new Promise(resolve => setTimeout(resolve, 2000))
                    ]);
                    const gameWon = response.isCorrect;
                    console.log("gameWon", gameWon);
                    if (gameWon) {
                        // setGameStatus("won");
                        updateSettings({ board: guess, gameStatus: "won" });
                        Confetti()
                        break;
                    }
                    setIncorrectGuess(true);
                    setTimeout(() => {
                        setIncorrectGuess(false);
                        setGuess(Array.from({ length: settings.boardSize }, () => Array(settings.boardSize).fill('')));
                        setGuessTileCount(0);
                    }, 1000);
                    updateSettings({ hints: response.hintCount, gameStatus: response.gameStatus });
                    // if (settings.hints >= MAX_HINTS[settings.boardSize]) setGameStatus("lost");
                    // else setGameStatus("playing");
                } catch (error) {
                    console.error('Error checking guess:', error);
                }
                break;
            case "playing":
                updateSettings({ gameStatus: "guessing" });
                break;
        }
    }

    const gameStatusMessage = function (): React.ReactNode {
        switch (settings.gameStatus) {
            case "playing":
                if (settings.hints === 0) return <span className='text-[#a9abad] font-normal'>CLICK ANY TILE TO GET A HINT</span>
                else return <span className='text-[#a9abad] font-normal'>{MAX_HINTS[settings.boardSize] - settings.hints} ATTEMPTS REMAINING</span>
            case "guessing":
                return <span className='text-[#a9abad] font-normal'>{guessTileCount}/{settings.boardSize} TILES OF HIDDEN SHAPE SELECTED</span>
            case "guess-loading":
                return <span className='text-[#a9abad] font-normal'>CHECKING...</span>
            case "won":
                return <span className='text-green-600'>CONGRATS! YOU WON!</span>
            case "lost":
                return <span className='text-red-600'>GAME OVER!</span>
        }
    }


    return (
        <div className='flex flex-col items-center w-full h-full p-2'>
            {showHelp && <Help setShowHelp={setShowHelp} />}
            <nav className='flex items-center justify-around w-full h-[72px] gap-2'>
                <Icons icon={<TiThMenu className='w-[20px] h-[20px] md:w-[24px] md:h-[24px]' />} />
                <Icons icon={<FaHeart className='w-[20px] h-[20px] md:w-[24px] md:h-[24px]' />} />
                <Title title='SHABBLE' className='flex-1 text-center' />
                <Icons icon={<MdLeaderboard className='w-[20px] h-[20px] md:w-[24px] md:h-[24px]' />} />
                <Icons
                    icon={<FaQuestion className='w-[20px] h-[20px] md:w-[24px] md:h-[24px]' />}
                    onClick={() => setShowHelp(!showHelp)}
                />
            </nav>
            <div className='flex flex-col items-center w-full h-full overflow-auto hide-scrollbar'>
                <div className='flex-1 w-full h-full'></div>
                <div className='flex flex-col items-center w-full space-y-4'>
                    <Text className='!text-base md:!text-2xl text-gray-400'>
                        DAILY SHABBLE
                    </Text>
                    <Board
                        board={settings.board}
                        guess={guess}
                        onTileClick={handleTileClick}
                        gameStatus={settings.gameStatus}
                        incorrectGuess={incorrectGuess}
                        className='!w-[80%] md:!w-[70%] mt-20'
                    />
                    <div className='flex items-center justify-center space-x-4 w-[80%] md:!w-[70%]'>
                        {settings.gameStatus === "guessing" &&
                            <Button
                                onClick={() => updateSettings({ gameStatus: "playing" })}
                                className=' h-[48px] md:h-[64px] bg-yellow-400 font-bold text-xl md:text-2xl'
                            >
                                GO BACK
                            </Button>
                        }
                        <Button
                            onClick={handleSubmitButton}
                            disabled={settings.gameStatus === "guessing" && guessTileCount !== settings.boardSize}
                            className='h-[48px] md:h-[64px] bg-green-600 font-bold text-xl md:text-2xl'
                        >
                            {settings.gameStatus === "won" || settings.gameStatus === "lost" ? 'PLAY AGAIN' : settings.gameStatus === "guessing" ? 'SUBMIT' : 'MAKE A GUESS'}
                        </Button>
                    </div>

                    <div className='text-black font-bold text-sm sm:text-xl md:text-2xl'>
                        {gameStatusMessage()}
                    </div>
                </div>
                <div className='flex-1 w-full h-full'></div>
            </div>
        </div>
    )
}

export default Daily