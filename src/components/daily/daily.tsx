'use client'
import React, { useState } from 'react'
import { TiThMenu } from "react-icons/ti";
import { FaHeart, FaQuestion } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { RiStarSFill } from "react-icons/ri";
import { Icons, Title, Board, Button, Text, Confetti, Loader } from '@/components';
import { MAX_HINTS } from '@/constants';
import { useGameSettings } from '@/hooks';
import Help from './help'
import Statistics from './statistics';


function Daily() {

    const { settings, updateSettings, takeHint, makeGuess, updateGuess, isLoading } = useGameSettings();
    const [incorrectGuess, setIncorrectGuess] = useState<boolean>(false);
    const [showHelp, setShowHelp] = useState<boolean>(true);
    const [showStatistics, setShowStatistics] = useState<boolean>(false);

    const handleTileClick = async (x: number, y: number, setIsLoading: (isLoading: boolean) => void) => {
        if (settings.gameStatus === "guessing") {
            handleGuessingMode(x, y);
        } else {
            setIsLoading(true);
            await takeHint(x, y);
            setIsLoading(false);
        }
    }

    const handleGuessingMode = (x: number, y: number) => {
        if (settings.guess[x][y] !== '') {
            updateGuess(x, y, '');
            updateSettings({ guessTileCount: settings.guessTileCount - 1 });
        } else if (settings.guessTileCount < settings.boardSize) {
            updateGuess(x, y, 'X');
            updateSettings({ guessTileCount: settings.guessTileCount + 1 });
        }
    }

    const handleSubmitButton = async () => {
        switch (settings.gameStatus) {
            case "won":
            case "lost":
                break;
            case "guessing":
                const result = await makeGuess();
                if (result.won) {
                    Confetti();
                } else if (result.won === false && result.success) {
                    setIncorrectGuess(true);
                    setTimeout(() => {
                        setIncorrectGuess(false);
                        updateSettings({
                            guess: Array.from({ length: settings.boardSize }, () => Array(settings.boardSize).fill('')),
                            guessTileCount: 0
                        });
                    }, 1000);
                }
                break;
            case "playing":
                updateSettings({ gameStatus: "guessing" });
                break;
        }
    }

    const gameStatusMessage = function (): React.ReactNode {
        switch (settings.gameStatus) {
            case "won":
            case "lost":
            case "playing":
                if (settings.hints === 0 && settings.gameStatus !== "won") return <span className='text-[#a9abad] font-normal'>CLICK ANY TILE TO GET A HINT</span>
                else return <span className='text-[#a9abad] font-normal'><span className='font-bold text-black'>{MAX_HINTS[settings.boardSize] - settings.hints}</span> HINTS REMAINING</span>
            case "guess-loading":
                return <span className='text-[#a9abad] font-normal'>CHECKING...</span>
            case "guessing":
                return <span className='text-[#a9abad] font-normal'>{settings.guessTileCount}/{settings.boardSize} TILES OF HIDDEN SHAPE SELECTED</span>


            // case "won":
            //     return <span className='text-green-600'>CONGRATS! YOU WON!</span>
            // case "lost":
            //     return <span className='text-red-600'>GAME OVER!</span>
        }
    }


    return (
        <div className='flex flex-col items-center w-full h-full'>
            {showHelp && <Help setShowHelp={setShowHelp} />}
            {showStatistics && <Statistics statistics={settings.statistics} setShowStatistics={setShowStatistics} />}
            <nav className='flex items-center justify-around w-full h-[72px] gap-2 p-2'>
                <Icons icon={<TiThMenu className='w-[20px] h-[20px] md:w-[24px] md:h-[24px]' />} />
                <Icons icon={<FaHeart className='w-[20px] h-[20px] md:w-[24px] md:h-[24px]' />} />
                <Title title='SHABBLE' className='flex-1 text-center' />
                <Icons
                    icon={<MdLeaderboard className='w-[20px] h-[20px] md:w-[24px] md:h-[24px]' />}
                    onClick={() => setShowStatistics(true)}
                />
                <Icons
                    icon={<FaQuestion className='w-[20px] h-[20px] md:w-[24px] md:h-[24px]' />}
                    onClick={() => setShowHelp(!showHelp)}
                />
            </nav>
            <div className='flex flex-col items-center w-full h-full overflow-auto hide-scrollbar'>
                {isLoading ?
                    <div className='flex items-center justify-center w-full h-full'>
                        <Loader />
                    </div>
                    :
                    <>
                        <div className='flex-1 w-full h-full'></div>
                        <div className='flex flex-col items-center w-full space-y-4'>
                            <Text className='!text-base md:!text-2xl text-gray-400'>
                                DAILY SHABBLE
                            </Text>
                            <Board
                                board={settings.board}
                                guess={settings.guess}
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
                                    disabled={settings.gameStatus === "guessing" && settings.guessTileCount !== settings.boardSize}
                                    className='h-[48px] md:h-[64px] bg-green-600 font-bold text-xl md:text-2xl'
                                >
                                    {settings.gameStatus === "won" || settings.gameStatus === "lost" ? 'PLAY AGAIN' : settings.gameStatus === "guessing" ? 'SUBMIT' : 'MAKE A GUESS'}
                                </Button>
                            </div>

                            <div className='text-black font-bold text-sm sm:text-xl md:text-2xl'>
                                {gameStatusMessage()}
                            </div>
                            {(settings.gameStatus === "won" || settings.gameStatus === "lost") && (
                                <>
                                    <div className='flex items-center justify-center space-x-2 h-[30px] md:h-[50px]'>
                                        {settings.stars ? Array.from({ length: settings.stars }, (_, index) => (
                                            <RiStarSFill className='w-[40px] h-[40px] md:w-[50px] md:h-[50px] text-[#ffac33]' key={index} />
                                        )) : <span className='text-[#a9abad] font-normal text-sm sm:text-xl md:text-2xl'>NO STARS THIS TIME</span>}
                                    </div>
                                    <div className='flex items-center justify-center w-full h-[90px] bg-gray-100'>
                                        {settings.gameStatus === "won" && <span className='text-green-700 font-bold text-sm sm:text-xl md:text-2xl'>CONGRATS! YOU WON!</span>}
                                        {settings.gameStatus === "lost" && <span className='text-red-700 font-bold text-sm sm:text-xl md:text-2xl'>GAME OVER!</span>}
                                    </div>
                                </>
                            )}
                        </div>
                        <div className='flex-1 w-full h-full'></div>
                    </>
                }
            </div>
        </div>
    )
}

export default Daily