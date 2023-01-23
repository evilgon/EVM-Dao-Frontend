import React, { useContext } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import NavButton from './NavButton';
import { SiEthereum } from 'react-icons/si';
import Link from 'next/link';
import { StoreContext } from '../context/context';

const Header = () => {
  // const userAddress = useAddress();
  // const disconnect = useDisconnect();
  // const connectWithMetamask = useMetamask();
  //const navigate = useNavigation();
  const {
    connectWithMetamask,
    userAddress,
    disconnectWallet: disconnect,
  } = useContext(StoreContext);
  return (
    <header className="grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5">
      <div className="flex  items-center space-x-2">
        <Link href="/">
          <img
            src="/images/logo.png"
            alt=""
            className="rounded-full h-20 w-20 cursor-pointer"
          />
        </Link>
      </div>

      <div className="hidden md:flex md:col-span-2">
        <div className="text-white p-4 space-x-2">
          <Link href='/proposals'>Governance</Link>
        </div>
        <div className="text-white p-4 space-x-2">
          <Link href='/'>Game</Link>
        </div>
      </div>

      <div>
        {userAddress ? (
          <>
            <p className="text-xs truncate" style={{ color: '#EAE287' }}>
              User: {userAddress?.substring(0, 5)}{' '}
              
              {userAddress?.substring(
                userAddress?.length,
                userAddress?.length - 5
              )}
            </p>
          </>
        ) : (
          <button
            type="button"
            onClick={connectWithMetamask}
            className="flex flex-row justify-center items-center my-5 bt3-gradient p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
          >
            <AiFillPlayCircle className="text-white mr-2" />
            <p className="text-white text-base font-semibold">Connect Wallet</p>
          </button>
        )}
      </div>
      {userAddress && (
        <div className="hidden md:flex flex-col ml-auto text-right">
          {/* <HiMenuAlt2 className="h-8 w-8 mx-auto text-white cursor-pointer" /> */}
          <NavButton onClick={disconnect} title="Logout" />
        </div>
      )}
      <span className="md:hidden">
        {userAddress && (
          <>
            <NavButton onClick={disconnect} title="Logout" />

            <NavButton title="Play Game" />
          </>
        )}
      </span>
    </header>
  );
};

export default Header;
