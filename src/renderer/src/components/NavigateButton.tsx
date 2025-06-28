import type { FC } from 'react'

interface NavigateButtonProps {
  title: string
}

export const NavigateButton: FC<NavigateButtonProps> = ({ title }) => {
  return (
    <button className="box-border border-[1.5px] border-gray-600 w-28 h-12 text-center hover:border-[2.5px]">
      {title}
    </button>
  )
}
