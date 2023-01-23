import React, { createContext, PropsWithChildren } from 'react';
import {
  useAddress,
  useMetamask,
  useDisconnect,
  useContract,
} from '@thirdweb-dev/react'
import { Proposal, VoteType } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'
import {voteAddress, tokenAddress } from '../utils/constants';


interface IStoreContext {
  connectWithMetamask: () => Promise<{}>,
  disconnectWallet: () => Promise<{}>,
  executeProposal: () => Promise<{}>,
  userAddress: string | undefined,
  getAllProposals: () => void,
  isExecutable: (id:string) => void,
  createProposal: (e:string) => void,
  voteFor: (id: string, type: string, reason: string | undefined) => void,
}
export const StoreContext = createContext<IStoreContext | any>('');


export const StoreProvider = ({ children }: PropsWithChildren<any>) => {
  const userAddress = useAddress()
  const connectWithMetamask = useMetamask()
  const disconnectWallet = useDisconnect()

  const { contract: vote } = useContract(voteAddress, 'vote');
  const token = useContract(tokenAddress, "token").contract;
 


  const getAllProposals = async () => {
    const proposals = await vote?.getAll()
    return proposals
  }
  const isExecutable = async (id:string) => {
    const canExecute = await vote?.canExecute(id)
    return canExecute
  }
  const checkIfVoted = async (id:string) => {
    const res = await vote?.hasVoted(id, userAddress)
    console.log(res, 'hasVoted')
    return res
  }

  const createProposal = async (description: string) => {
    const amount = 100_000
    
    const executions = [
      {
        toAddress: token!.getAddress(),
        nativeTokenValue: 0 ,
        transactionData: token!.encoder.encode('mintTo', [
          vote!.getAddress(),
          ethers.utils.parseUnits(amount.toString(), 18),
        ]),
      },
    ]
    const proposal = await vote?.propose(description, executions)
    console.log(proposal)
  }


  const executeProposal = async (id: string) => {
    const canExecute = await isExecutable(id)
    if (canExecute) {
      const res = await vote?.execute(id)
      console.log(res)
    } else {
      console.log('Can not execute')
    }
  }

  const voteFor = async (id: string, type: string, reason: string | undefined) => {
    try {
      const delegation = await token?.getDelegationOf(userAddress!)
      if (delegation === ethers.constants.AddressZero) {
        await token?.delegateTo(userAddress!)
      }
      let voteType
      if (type === 'Against') {
        voteType = VoteType.Against
      } else if (type === 'For') {
        voteType = VoteType.For
      } else {
        voteType = VoteType.Abstain
      }
      const res = await checkIfVoted(id)
      if (!res) {
        await vote?.vote(id, voteType, reason)
      } else {
        console.log('You have already voted for this proposal')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <StoreContext.Provider
      value={{
        getAllProposals,
        isExecutable,
        voteFor,
        createProposal,
        userAddress,
        connectWithMetamask,
        disconnectWallet,
        executeProposal,

      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
