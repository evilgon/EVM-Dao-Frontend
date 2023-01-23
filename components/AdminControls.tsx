import React, {  } from 'react';
import { HiStar, HiCurrencyDollar, HiArrowNarrowLeft, HiArrowCircleLeft } from 'react-icons/hi'
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import {
  useContract,
  useContractRead,
  useContractWrite,
} from '@thirdweb-dev/react';
import { lotteryAddress } from '../utils/constants';

const AdminControls = () => {
    const { contract, isLoading } = useContract(
       lotteryAddress
    );
    const { data: operatorTotalCommission} = useContractRead(contract, "operatorTotalCommission");
    const { mutateAsync: WithdrawCommission } = useContractWrite(contract, "WithdrawCommission")
    const { mutateAsync: DrawWinnerTicket } = useContractWrite(contract, "DrawWinnerTicket")
    const { mutateAsync: restartDraw } = useContractWrite(contract, "restartDraw")
    const { mutateAsync: RefundAll } = useContractWrite(contract, "RefundAll")

    const withdrawCommission = async () => {
        const notification = toast.loading('Withdrawing your commision...');
        try {
          const data = await WithdrawCommission([{}]);
    
          toast.success('Commission withdrew successfully!', {
            id: notification,
          });
        } catch (err) {
          toast.error('Whoops somethings went rong!', {
            id: notification,
          });
          console.error('contract call failure', err);
        }
    }

    const drawTicket = async () => {
        const notification = toast.loading('drawing your winning ticket...');
        try {
          const data = await DrawWinnerTicket([{}]);
    
          toast.success('Ticket drew successfully!', {
            id: notification,
          });
        } catch (err) {
          toast.error('Whoops somethings went rong!', {
            id: notification,
          });
          console.error('contract call failure', err);
        }
    }

    const refundAll = async () => {
        const notification = toast.loading('refunding ...');
        try {
          const data = await RefundAll([{}]);
    
          toast.success('refunding successfully!', {
            id: notification,
          });
        } catch (err) {
          toast.error('Whoops somethings went rong!', {
            id: notification,
          });
          console.error('contract call failure', err);
        }
    }


    const restartdraw = async () => {
        const notification = toast.loading('restarting the draw...');
        try {
          const data = await restartDraw([{}]);
    
          toast.success('Draw restarted successfully!', {
            id: notification,
          });
        } catch (err) {
          toast.error('Whoops somethings went rong!', {
            id: notification,
          });
          console.error('contract call failure', err);
        }
    }

  return (
    <div className='text-white text-center px-5 py-3 rounded-md border-[#43001f] border'>
        <h2 className='font-bold'>Admin Controls</h2>
        <p>Total Commission to be withdrawn: {operatorTotalCommission && ethers.utils.formatEther(operatorTotalCommission?.toString())}{' '}</p>

        <div className='flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2'>
            <button className='admin-button' onClick={drawTicket}>
                <HiStar className='h-6 mx-auto mb-2 text-orange-500' />
                Draw Winner</button>
            <button className='admin-button' onClick={withdrawCommission}>
            <HiCurrencyDollar className='h-6 mx-auto mb-2 text-orange-500' />
                Withdraw Commission</button>
            <button className='admin-button' onClick={restartdraw }>
            <HiArrowNarrowLeft className='h-6 mx-auto mb-2 text-orange-500' />
                Restart Draw</button>
            <button className='admin-button' onClick={refundAll}>
            <HiArrowCircleLeft className='h-6 mx-auto mb-2 text-orange-500' />
                Refund All</button>
        </div>
    </div>
  )
}

export default AdminControls