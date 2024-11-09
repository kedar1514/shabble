'use client'
import React, { useState } from 'react'
import { TiThMenu } from "react-icons/ti";
import { FaHeart, FaQuestion } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { Icons, Title, Board, Button, Text, Loader, TileLoader } from '@/components';
import { getHint, checkGuess } from '@/api/daily-api';
import Help from './help'

interface DailyProps {
    date?: string;
}
function Daily({
    date = new Date().toISOString().split('T')[0]
}: DailyProps) {

    const [boardSize] = useState<number>(6);
    const [attempts, setAttempts] = useState<number>(15);
    const [board, setBoard] = useState<string[][]>(Array.from({ length: boardSize }, () => Array(boardSize).fill('')));
    const [guess, setGuess] = useState<string[][]>(Array.from({ length: boardSize }, () => Array(boardSize).fill('')));
    const [gameStatus, setGameStatus] = useState<"playing" | "guessing" | "won" | "lost" | "guess-loading">("playing");
    const [guessTileCount, setGuessTileCount] = useState<number>(0);
    const [incorrectGuess, setIncorrectGuess] = useState<boolean>(false);
    const [showHelp, setShowHelp] = useState<boolean>(true);

    if (attempts < 0 && gameStatus === "playing") {
        setGameStatus("lost");
    }

    const handleTileClick = async (x: number, y: number, setIsLoading: (isLoading: boolean) => void) => {

        if (gameStatus === "guessing") {
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
                if (guessTileCount >= boardSize) return;
                setGuess(prevGuess => {
                    const newGuess = [...prevGuess];
                    newGuess[x][y] = 'X';
                    return newGuess;
                });
                setGuessTileCount(prevCount => prevCount + 1);
            }
        }
        else {
            if (board[x][y] !== '' || attempts <= 0) return;
            setIsLoading(true);
            try {
                const data = await getHint(date, boardSize, x, y);
                const adjacentCount = data.adjacentCount;
                console.log("adjacentCount", adjacentCount);
                setBoard(prevBoard => {
                    const newBoard = [...prevBoard];
                    newBoard[x][y] = adjacentCount.toString();
                    return newBoard;
                });
                setAttempts(prevAttempts => prevAttempts - 1);
                if (attempts <= 0) {
                    setGameStatus("lost");
                }
            } catch (error) {
                console.error('Error fetching hint:', error);
            }
            setIsLoading(false);
        }
    }

    const handleSubmitButton = async () => {
        console.log("make guess");
        switch (gameStatus) {
            case "won":
            case "lost":
                setGameStatus("playing");
                setBoard(Array.from({ length: boardSize }, () => Array(boardSize).fill('')));
                setGuess(Array.from({ length: boardSize }, () => Array(boardSize).fill('')));
                setGuessTileCount(0);
                setAttempts(10);
                break;
            case "guessing":
                try {
                    setGameStatus("guess-loading");
                    const [_, response] = await Promise.all([
                        new Promise(resolve => setTimeout(resolve, 2000)), 
                        checkGuess(date, boardSize, guess, attempts)
                    ]);
                    const gameWon = response.isCorrect;
                    console.log("gameWon", gameWon);
                    if (gameWon) {
                        setGameStatus("won");
                        setBoard(guess)
                        break;
                    }
                    setIncorrectGuess(true);
                    setTimeout(() => {
                        setIncorrectGuess(false);
                        setGuess(Array.from({ length: boardSize }, () => Array(boardSize).fill('')));
                        setGuessTileCount(0);
                    }, 1000);
                    setAttempts(prevAttempts => prevAttempts - 2);
                    if (attempts <= 0) {
                        setGameStatus("lost");
                    }
                    else {
                        setGameStatus("playing");
                    }
                } catch (error) {
                    console.error('Error checking guess:', error);
                }
                break;
            case "playing":
                setGameStatus("guessing");
                break;
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
                        {gameStatus === "guessing" || gameStatus === "guess-loading" ? `${guessTileCount}/${boardSize} TILES OF HIDDEN SHAPE SELECTED` : "CLICK ANY TILE TO GET A HINT"}
                    </Text>
                    <Board
                        board={board}
                        guess={guess}
                        onTileClick={handleTileClick}
                        gameStatus={gameStatus}
                        incorrectGuess={incorrectGuess}
                        className='!w-[80%] md:!w-[70%] mt-20'
                    />
                    <div className='flex items-center justify-center space-x-4 w-[80%] md:!w-[70%]'>
                        {gameStatus === "guessing" &&
                            <Button
                                onClick={() => setGameStatus("playing")}
                                className=' h-[48px] md:h-[64px] bg-yellow-400 font-bold text-xl md:text-2xl'
                            >
                                GO BACK
                            </Button>
                        }
                        <Button
                            onClick={handleSubmitButton}
                            disabled={gameStatus === "guessing" && guessTileCount !== boardSize}
                            className='h-[48px] md:h-[64px] bg-green-600 font-bold text-xl md:text-2xl'
                        >
                            {gameStatus === "won" || gameStatus === "lost" ? 'PLAY AGAIN' : gameStatus === "guessing" ? 'SUBMIT' : 'MAKE A GUESS'}
                        </Button>
                    </div>

                    {(gameStatus === "playing" || gameStatus === "guessing" || gameStatus === "guess-loading") && <p className='text-black font-bold text-xl md:text-2xl'>{attempts} <span className='text-[#a9abad] font-normal'>ATTEMPTS REMAINING</span></p>}
                    {gameStatus === "won" && <p className='text-green-600 font-bold text-xl md:text-2xl'>CONGRATS! YOU WON!</p>}
                    {gameStatus === "lost" && <p className='text-red-600 font-bold text-xl md:text-2xl'>GAME OVER!</p>}
                </div>
                <div className='flex-1 w-full h-full'></div>
            </div>
        </div>
    )
}

export default Daily