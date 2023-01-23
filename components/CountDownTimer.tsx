import React from 'react';
import { useContract, useContractRead} from '@thirdweb-dev/react';
import Countdown from 'react-countdown';
import {lotteryAddress } from '../utils/constants';

interface Props {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}
const CountDownTimer = () => {
  const { contract } = useContract(lotteryAddress);
  const { data: expiration } = useContractRead(contract, "expiration")
  const renderer = ({ hours = 0, minutes = 0, seconds = 0, completed }: Props) => {
    if (completed) {
      return (
        <div >
          <h2 className='text-white text-xl text-center animate-bounce'>Ticket Sales have now CLOSED for this draw</h2>

          <div className='flex space-x-6'>
            <div className='flex-1'>
                <div className='countdown'>{hours && hours }</div>
                <div className='countdown-label'>hours </div>
            </div>

            <div className='flex-1'>
                <div className='countdown'>{minutes && minutes}</div>
                <div className='countdown-label'>minutes</div>
            </div>

            <div className='flex-1'>
                <div className='countdown'>{seconds && seconds}</div>
                <div className='countdown-label'>seconds</div>
            </div>
        </div>
        </div>
      );
    } else {
      return(
        <div>
        <h3 className="text-white text-sm mb-2 italic">Time Remaining</h3>
        <div className='flex space-x-6'>
            <div className='flex-1'>
                <div className='countdown'>{hours && hours }</div>
                <div className='countdown-label'>hours</div>
            </div>

            <div className='flex-1'>
                <div className='countdown'>{minutes && minutes}</div>
                <div className='countdown-label'>minutes</div>
            </div>

            <div className='flex-1'>
                <div className='countdown'>{seconds && seconds}</div>
                <div className='countdown-label'>seconds</div>
            </div>
        </div>
      </div>
      )
    }
  };
  return <Countdown date={new Date(expiration * 1000)} renderer={renderer} />;
};

export default CountDownTimer;
