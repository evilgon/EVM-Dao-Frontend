import Image from 'next/image'
import React from 'react'
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { AiFillPlayCircle } from 'react-icons/ai';

const Banner = () => {
    const userAddress = useAddress();
    const disconnect = useDisconnect();
    const connectWithMetamask = useMetamask();

    const companyCommonStyles =
    'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white';
     

  return (
    <div>
         <div className='flex items-center justify-around space-x-2'>
        <Image src={'/images/mobile.png'} alt='' width={393} height={680}/> 
        <div>
        {/* <Image src={'/images/text.webp'} alt='' width={551} height={233} objectFit='cover' /> */}

<div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
  <h1 className="text-xl sm:text-5xl text-white text-gradient py-1">
    Play <br /> To Earn Game
  </h1>
  <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
    Chain Games Dao is the best lottery game in crypto.
  </p>
  {!userAddress && (
    <button
      type="button"
      onClick={connectWithMetamask}
      className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
    >
      <AiFillPlayCircle className="text-white mr-2" />
      <p className="text-white text-base font-semibold">
        Play Game
      </p>
    </button>
  )}

  <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
    <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
      Reliability
    </div>
    <div className={companyCommonStyles}>Security</div>
    <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
      Matic
    </div>
    <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
      Web 3.0
    </div>
    <div className={companyCommonStyles}>Low Fees</div>
    <div className={`rounded-br-2xl ${companyCommonStyles}`}>
      Blockchain
    </div>
  </div>
</div>
        </div>
        </div>
        
       
       
    </div>
  )
}

export default Banner