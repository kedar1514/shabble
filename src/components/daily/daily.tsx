'use client'
import React, { useEffect, useState } from 'react'
import { TiThMenu } from "react-icons/ti";
import { FaHeart, FaQuestion } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { Icons, Title, Board, Button } from '@/components';
import { getDailyPuzzle } from '@/api/daily-api';

function Daily() {

    const [boardSize, setBoardSize] = useState<number>(5);
    const [attempts, setAttempts] = useState<number>(0);
    const [board, setBoard] = useState<string[][]>(Array.from({ length: boardSize }, () => Array(boardSize).fill('')));
    const [shape, setShape] = useState<string[][]>(Array.from({ length: boardSize }, () => Array(boardSize).fill('')));
    const [guess, setGuess] = useState<string[][]>(Array.from({ length: boardSize }, () => Array(boardSize).fill('')));

    console.log("board",board);

    useEffect(() => {
        getDailyPuzzle(boardSize).then((data) => setShape(data.board));
    }, [boardSize]);

    return (
        <div className='flex flex-col items-center w-full h-full px-2'>
            <nav className='flex items-center justify-around w-full h-[72px]'>
                <Icons icon={<TiThMenu className='w-[24px] h-[24px]' />} className='mx-2' />
                <Icons icon={<FaHeart className='w-[24px] h-[24px]' />} className='mx-2' />
                <Title title='SHABBLE' className='flex-1 text-center' />
                <Icons icon={<MdLeaderboard className='w-[24px] h-[24px]' />} className='mx-2' />
                <Icons icon={<FaQuestion className='w-[24px] h-[24px]' />} className='mx-2' />
            </nav>
            <div className='flex flex-col items-center justify-center w-full h-full'>
                <Board board={board} />
                <Button className='mt-4 !w-[440px] !h-[64px] !bg-green-medium font-bold text-2xl'>
                    MAKE A GUESS
                </Button>
            </div>
        </div>
    )
}

export default Daily