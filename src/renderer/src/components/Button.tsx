import type { FC } from 'react'

interface ButtonProps {
  title: string
}

export const Button: FC<ButtonProps> = ({ title }) => {
  return (
    <button
      className="box-border border-2 border-secondary w-28 h-12 text-center font-bold text-sm text-white 
                 bg-secondary hover:bg-transparent active:text-primary hover:text-secondary hover:border-secondary
                 active:bg-transparent active:border-primary 
                 transition-all duration-200"
    >
      {title}
    </button>
  )
}
