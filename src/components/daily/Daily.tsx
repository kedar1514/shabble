'use client'
import React, { useState } from 'react'
import { TiThMenu } from "react-icons/ti";
import { FaHeart, FaQuestion } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { Icons, Title, Tile } from '@/components';

function Daily() {

    const [boardSize, setBoardSize] = useState<number>(5);
    return (
        <div className='flex flex-col items-center w-full h-full px-2'>
            <nav className='flex items-center justify-around w-full h-[72px]'>
                <Icons icon={<TiThMenu className='w-[24px] h-[24px]' />} className='mx-2' />
                <Icons icon={<FaHeart className='w-[24px] h-[24px]' />} className='mx-2' />
                <Title title='SHABBLE' className='flex-1 text-center' />
                <Icons icon={<MdLeaderboard className='w-[24px] h-[24px]' />} className='mx-2' />
                <Icons icon={<FaQuestion className='w-[24px] h-[24px]' />} className='mx-2' />
            </nav>
            <div className='flex flex-wrap items-center justify-center w-full h-full'>
                <div className='flex flex-col items-center justify-around w-[440px] h-[440px]'>
                    {Array.from({ length: boardSize }, (_, index) => (
                        <div key={index} className='flex w-full items-center justify-around'>
                            {Array.from({ length: boardSize }, (_, index) => (
                                <React.Fragment key={index}>
                                    <Tile tileContent={index.toString()} />
                                </React.Fragment>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Daily