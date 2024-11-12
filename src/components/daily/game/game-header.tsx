import { Icons, Title } from '@/components'
import { TiThMenu } from "react-icons/ti"
import { FaHeart, FaQuestion } from "react-icons/fa"
import { MdLeaderboard } from "react-icons/md"
import { Statistics, Help } from '../nav'
import { StatisticsProps } from '@/types'
import { useState } from 'react'
import Menu from '../nav/menu'
import { useGameSettings } from '@/contexts'

interface GameHeaderProps {
    showHelp: boolean;
    showStatistics: boolean;
    setShowHelp: (showHelp: boolean) => void;
    setShowStatistics: (showStatistics: boolean) => void;
    statistics: StatisticsProps;
}
export function GameHeader({ showHelp, showStatistics, setShowHelp, setShowStatistics, statistics }: GameHeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { settings, updateSettings } = useGameSettings();

    const handleDifficultySelect = (size: number) => {
        updateSettings({ boardSize: size as 5 | 6 | 7 });
        setIsMenuOpen(false);
    };
    return (
        <div className='flex flex-col items-center w-full'>
            {showHelp && <Help setShowHelp={setShowHelp} />}
            {showStatistics && <Statistics statistics={statistics} setShowStatistics={setShowStatistics} />}
            <Menu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onSelectDifficulty={handleDifficultySelect}
                onShowStatistics={() => {
                    setShowStatistics(true);
                    setIsMenuOpen(false);
                }}
                onShowHelp={() => {
                    setShowHelp(true);
                    setIsMenuOpen(false);
                }}
            />
            <nav className='flex items-center justify-around w-full h-[72px] gap-2 p-2'>
                <Icons
                    icon={<TiThMenu className='w-[20px] h-[20px] md:w-[24px] md:h-[24px]' />}
                    onClick={() => setIsMenuOpen(true)}
                />
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
        </div>
    )
}