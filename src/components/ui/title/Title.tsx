import React from 'react'

interface TitleProps {
    title: string;
    className?: string;
}

function Title({title, className}: TitleProps) {
  return (
    <div className={`text-3xl font-bold ${className}`}>{title}</div>
  )
}

export default Title