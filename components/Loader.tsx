import React from 'react'
//import PacmanLoader from "react-spinners/PacmanLoader";
import PropagateLoader from "react-spinners/PropagateLoader";

interface Props {
  message?: string
}
const Loader = ({message='Loading ....'}: Props) => {
  return (
    <div className=" h-screen flex flex-col items-center justify-center">
        <div className='flex items-center space-x-2 mb-10'>
          <img src="/images/logo.png"
           className='rounde-full h-20 w-20' />
          <h1 className='text-lg text-white font-bold'>{message}</h1>
        </div>
        
 
        <PropagateLoader color='#fff'  size={30} />
      </div>
  )
}

export default Loader