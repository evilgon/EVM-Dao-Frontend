// Git confirm
import React, { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from '@thirdweb-dev/react';
import Login from '../components/Login';
import Loader from '../components/Loader';
import { currency } from '../constants';
import CountDownTimer from '../components/CountDownTimer';
import Marquee from 'react-fast-marquee';
import AdminControls from '../components/AdminControls';
import Footer from '../components/Footer';
import { lotteryAddress } from '../utils/constants';
import { StoreContext } from '../context/context';
import LoginHeader from '../components/LoginHeader';
import { NextPage } from 'next';

const Home: NextPage = () => {
  const { userAddress } = useContext(StoreContext);
  const [userTickets, setUserTickets] = useState(0);
  const { contract, isLoading } = useContract(lotteryAddress);
  const [quantity, setQuantity] = useState<number>(1);
  const { data: expiration } = useContractRead(contract, 'expiration');
  const { data: remainingTickets } = useContractRead(
    contract,
    'RemainingTickets'
  );
  const { data: currentWinningReward } = useContractRead(
    contract,
    'CurrentWinningReward'
  );
  const { data: ticketPrice } = useContractRead(contract, 'ticketPrice');
  const { data: ticketCommission } = useContractRead(
    contract,
    'ticketCommission'
  );
  const { data: tickets } = useContractRead(contract, 'getTickets');
  const { mutateAsync: BuyTickets } = useContractWrite(contract, 'BuyTickets');
  const { data: winnings } = useContractRead(
    contract,
    'getWinningsForAddress',
    userAddress
  );
  const { mutateAsync: WithdrawWinnings } = useContractWrite(
    contract,
    'WithdrawWinnings'
  );
  const { data: lastWinner } = useContractRead(contract, 'lastWinner');
  const { data: lastWinnerAmount } = useContractRead(
    contract,
    'lastWinnerAmount'
  );
  const { data: isLotteryOprator } = useContractRead(
    contract,
    'lotteryOperator'
  );

  useEffect(() => {
    if (!tickets) return;

    const totalTickets: string[] = tickets;

    const noOfUserTickets = totalTickets.reduce(
      (total, ticketAddress) =>
        ticketAddress === userAddress ? total + 1 : total,
      0
    );
    setUserTickets(noOfUserTickets);
  }, [tickets, useAddress]);

  const handleClick = async () => {
    if (!ticketPrice) return;
    const notification = toast.loading('Buying your ticket...');

    try {
      const data = await BuyTickets([
        {
          value: ethers.utils.parseEther(
            (
              Number(ethers.utils.formatEther(ticketPrice)) * quantity
            ).toString()
          ),
        },
      ]);
      toast.success('Tickets purchased successfully!', {
        id: notification,
      });
    } catch (err) {
      // alert('Whoops something went wrong!');
      toast.error('Whoops somethings went rong!', {
        id: notification,
      });
      console.error('contract call failure', err);
    }
  };

  const onWithdrawWinnings = async () => {
    const notification = toast.loading('Withdrawing your winning...');
    try {
      const data = await WithdrawWinnings([{}]);

      toast.success('Winning withdrew successfully!', {
        id: notification,
      });
    } catch (err) {
      toast.error('Whoops somethings went rong!', {
        id: notification,
      });
      console.error('contract call failure', err);
    }
  };

  if (!userAddress) return <Login />;
  if (isLoading) return <Loader />;

  return (
    <div className=" min-h-screen flex flex-col bg-[url('/images/bg.webp')]">
      <LoginHeader />
      <div>
        <Marquee className=" P-5 mb-5" gradient={false} speed={100}>
          <div className="flex space-x-2 mx-10">
            <h4 className="text-white font-bold">
              Last Winner: {lastWinner?.toString()}
            </h4>
            <h4 className="text-white font-bold">
              Previous winnings:{' '}
              {lastWinnerAmount &&
                ethers.utils.formatEther(lastWinnerAmount?.toString())}{' '}
            </h4>
          </div>
        </Marquee>
        {isLotteryOprator === userAddress && (
          <div className="flex justify-center">
            <AdminControls />
          </div>
        )}
        {winnings > 0 && (
          <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5">
            <button
              onClick={onWithdrawWinnings}
              className="text-white p-5 bg-gradient-to-b from-[#770d08] to-[#770d56] animate-pulse text-center rounded-xl w-full"
            >
              <p className="font-bold">Winner Winner Chicken Dinner!</p>
              <p className="text-[#F26219]">
                Total Winnings {ethers.utils.formatEther(winnings.toString())}{' '}
                {currency}
              </p>
              <br />
              <p className="font-bold">Click here to withdraw</p>
            </button>
          </div>
        )}

        {/* The Next Draw box */}
        <div className="space-y-5 md:space-y-0 m-5 md:flex  md:flex-row md:space-x-10 items-start justify-center ">
          <div className="stats-container ">
            <h1 className="text-5xl text-white font-semibold text-center">
              The Next Draw
            </h1>

            <div className="flex justify-between p-2 space-x-2">
              <div className="stats">
                <h2 className="text-sm">Total Pool</h2>
                <p className="text-xl">
                  {currentWinningReward &&
                    ethers.utils.formatEther(
                      currentWinningReward.toString()
                    )}{' '}
                  {currency}
                </p>
              </div>
              <div className="stats">
                <h2 className="text-sm">Tickets Remaining</h2>
                <p className="text-xl">{remainingTickets?.toNumber()}</p>
              </div>
            </div>
            {/* Countdown timer  */}
            <div className="mt-5 mb-3">
              <CountDownTimer />
            </div>

            {/* ... */}
          </div>
          <div className="stats-container space-y-2 ">
            <div className="stats-container">
              <div className="flex justify-between items-center text-white pb-2">
                <h2>Price per ticket</h2>
                <p>
                  {ticketPrice &&
                    ethers.utils.formatEther(ticketPrice.toString())}{' '}
                  {currency}
                </p>
              </div>

              <div
                className="flex text-black items-center space-x-2  p-2
              bg-[#fff] border-[#000] rounded-md border-4"
              >
                <p>TICKETS</p>
                <input
                  className="flex w-full  bg-transparent text-black text-right outline-none"
                  type="number"
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2 mt-5">
                <div className="flex items-center justify-between text-white text-xs italic font-extrabold">
                  <p>Total cost of tickets</p>
                  <p>
                    {ticketPrice &&
                      Number(ethers.utils.formatEther(ticketPrice.toString())) *
                        quantity}{' '}
                    {currency}
                  </p>
                </div>

                <div className="flex items-center justify-between text-white text-xs italic">
                  <p>Service fees</p>
                  <p>
                    {ticketCommission &&
                      ethers.utils.formatEther(
                        ticketCommission.toString()
                      )}{' '}
                    {currency}
                  </p>
                </div>

                <div className="flex items-center justify-between text-white text-xs italic">
                  <p>+ Network Fees</p>
                  <p>TBC</p>
                </div>
              </div>

              <button
                onClick={handleClick}
                disabled={
                  expiration?.toString() < Date.now().toString() ||
                  remainingTickets?.toNumber() === 0
                }
                className="mt-5 w-full bg-gradient-to-br from-orange-500
               to-red-600 px-10 py-5 rounded-md text-white font-semibold
                shadow-xl disabled:from-gray-600 disabled:text-gray-100 disabled:to-gray-600 disabled:cursor-not-allowed"
              >
                Buy {quantity} tickets for{' '}
                {ticketPrice &&
                  Number(ethers.utils.formatEther(ticketPrice.toString())) *
                    quantity}{' '}
                {currency}
              </button>
            </div>
            {userTickets > 0 && (
              <div className="stats">
                <p className="text-lg mb-2">
                  You have {userTickets} Tickets in this draw
                </p>
                <div className="flex max-w-sm flex-wrap gap-x-2 gap-y-2">
                  {Array(userTickets)
                    .fill('')
                    .map((_, index) => (
                      <p
                        className="text-white h-20 w-12 bg-amber-600 rounded-lg flex flex-shrink-0 items-center justify-center text-xs italic"
                        key={index}
                      >
                        {index + 1}
                      </p>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* The price per ticket box */}
      <Footer />
    </div>
  );
};

export default Home;
