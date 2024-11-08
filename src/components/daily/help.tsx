import React from 'react'
import { Icons, Title, Divider, Text } from '@/components';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { instructions } from '@/constants/help/instructions';

interface HelpProps {
  setShowHelp: (showHelp: boolean) => void;
}
function Help({ setShowHelp }: HelpProps) {
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowHelp(false);
    }
  };

  return (
    <div 
      className='absolute inset-0 w-full h-full debug bg-gray-300 flex justify-center items-center'
      onClick={handleOutsideClick}
    >
      <div className='max-w-[730px] w-full h-full bg-white px-8'>
        <nav className='relative flex items-center justify-around w-full h-[72px]'>
          <Title
            title='HOW TO PLAY?'
            className='text-center flex-1 '
          />
          <div className='absolute right-0 top-1/2 -translate-y-1/2'>
            <Icons
              icon={<IoIosCloseCircleOutline className='w-[30px] h-[30px] md:w-[40px] md:h-[40px]' />}
              className='mx-2 bg-white'
              onClick={() => setShowHelp(false)}
            />
          </div>
        </nav>
        <Divider isVertical={false} className='w-[80%] mx-auto my-4' />
        
        {instructions.map((section, sectionIndex) => (
          <React.Fragment key={sectionIndex}>
            <section className='flex flex-col justify-center gap-4'>
              {section.map((text, textIndex) => (
                <Text key={textIndex}>{text}</Text>
              ))}
            </section>
            {sectionIndex < instructions.length - 1 && (
              <Divider isVertical={false} className='w-[80%] mx-auto my-4' />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Help