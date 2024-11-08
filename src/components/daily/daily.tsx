'use client'
import React, { useEffect, useState } from 'react'
import { TiThMenu } from "react-icons/ti";
import { FaHeart, FaQuestion } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { Icons, Title, Board, Button } from '@/components';
import { getDailyPuzzle } from '@/api/daily-api';
import { checkGuess, getAdjacentCount } from '@/services/puzzle';
import Help from './help'

function Daily() {

    const [boardSize] = useState<number>(6);
    const [attempts, setAttempts] = useState<number>(15);
    const [board, setBoard] = useState<string[][]>(Array.from({ length: boardSize }, () => Array(boardSize).fill('')));
    const [shape, setShape] = useState<string[][]>(Array.from({ length: boardSize }, () => Array(boardSize).fill('')));
    const [guess, setGuess] = useState<string[][]>(Array.from({ length: boardSize }, () => Array(boardSize).fill('')));
    const [gameStatus, setGameStatus] = useState<"playing" | "guessing" | "won" | "lost">("playing");
    const [guessTileCount, setGuessTileCount] = useState<number>(0);
    const [incorrectGuess, setIncorrectGuess] = useState<boolean>(false);
    const [showHelp, setShowHelp] = useState<boolean>(true);

    if (attempts < 0 && gameStatus === "playing") {
        setGameStatus("lost");
    }
    console.log("shape", shape);
    console.log("guess", guess);
    useEffect(() => {
        getDailyPuzzle(boardSize).then((data) => setShape(data.board));
    }, [boardSize]);


    const handleTileClick = (x: number, y: number) => {
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
            const adjacentCount = getAdjacentCount(shape, x, y);
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
        }
    }

    const handleSubmitButton = () => {
        console.log("make guess");
        switch (gameStatus) {
            case "won":
            case "lost":
                getDailyPuzzle(boardSize).then((data) => setShape(data.board));
                setGameStatus("playing");
                setBoard(Array.from({ length: boardSize }, () => Array(boardSize).fill('')));
                setGuess(Array.from({ length: boardSize }, () => Array(boardSize).fill('')));
                setGuessTileCount(0);
                setAttempts(10);
                break;
            case "guessing":
                const gameWon = checkGuess(shape, guess);
                console.log("shape", shape);
                console.log("guess", guess);
                console.log("gameWon", gameWon);
                if (gameWon) {
                    setGameStatus("won");
                    setBoard(shape);
                    break;
                }
                setIncorrectGuess(true);
                setTimeout(() => {
                    setIncorrectGuess(false);
                    setGuess(Array.from({ length: boardSize }, () => Array(boardSize).fill('')));
                    setGuessTileCount(0);
                }, 1000);
                setAttempts(prevAttempts => prevAttempts - 1);
                if (attempts <= 0) {
                    setGameStatus("lost");
                }
                else {
                    setGameStatus("playing");
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
                <Icons icon={<TiThMenu className='w-[20px] h-[20px] md:w-[24px] md:h-[24px]' />}/>
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
                                className=' h-[48px] md:h-[64px] bg-yellow-medium font-bold text-xl md:text-2xl'
                            >
                                GO BACK
                            </Button>
                        }
                        <Button
                            onClick={handleSubmitButton}
                            disabled={gameStatus === "guessing" && guessTileCount !== boardSize}
                            className='h-[48px] md:h-[64px] bg-green-medium font-bold text-xl md:text-2xl'
                        >
                            {gameStatus === "won" || gameStatus === "lost" ? 'PLAY AGAIN' : gameStatus === "guessing" ? 'SUBMIT' : 'MAKE A GUESS'}
                        </Button>
                    </div>

                    {(gameStatus === "playing" || gameStatus === "guessing") && <p className='text-black font-bold text-xl md:text-2xl'>{attempts} <span className='text-[#a9abad] font-normal'>ATTEMPTS REMAINING</span></p>}
                    {gameStatus === "won" && <p className='text-green-medium font-bold text-xl md:text-2xl'>CONGRATS! YOU WON!</p>}
                    {gameStatus === "lost" && <p className='text-red-600 font-bold text-xl md:text-2xl'>GAME OVER!</p>}
                </div>
                <div className='flex-1 w-full h-full'></div>
            </div>
        </div>
    )
}

export default Daily