import React from 'react';

interface Props {
  title: string;
  isActive?: boolean;
  onClick?: () => void;
}
const NavButton = ({ title, isActive, onClick }: Props) => {
  return (
    <button
      className={`${isActive && 'bg-[#F77F00]'} 
      hover:bg-[#FCBF49]
       text-white py-2 px-4 rounded font-bold`}
       onClick={onClick}
    >
      {title}
    </button>
  );
};

export default NavButton;
