import React, { useContext } from 'react';
import NavButton from './NavButton';
import Link from 'next/link';
import { StoreContext } from '../context/context';

const Header = () => {
  // const userAddress = useAddress();
  //const disconnect = useDisconnect();
  const { currentUserAddress: userAddress, disconnectWallet: disconnect } =
    useContext(StoreContext);

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

      <div className="hidden md:flex md:col-span-3">
        <div className="text-white p-4 space-x-2">
          {userAddress && (
            <>
              <NavButton onClick={disconnect} title="Logout" />
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col ml-auto text-right">
        {/* <HiMenuAlt2 className="h-8 w-8 mx-auto text-white cursor-pointer" /> */}
      </div>

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
