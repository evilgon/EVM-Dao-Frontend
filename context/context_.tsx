import { createContext, PropsWithChildren } from 'react'
import {
  useVote,
  useToken,
  useAddress,
  useMetamask,
  useDisconnect,
  useContract,
} from '@thirdweb-dev/react'
import { VoteType } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'


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

export const ChainlabsDaoContext = createContext<IStoreContext | any>('');
export const ChainlabsDaoProvider = ({ children }: PropsWithChildren<any>) => {
  const address = useAddress()
  const connectWithMetamask = useMetamask()
  const disconnectWallet = useDisconnect()
  const {data:vote} = useContract("0x0C00F9fff5EC51EAfa591e3f381c4C2A4B7E69fe", "vote")
  const {data: token} = useContract("0x0EEF9Df851A5bE84870406407dD537CCDF4Bff4d", "token")
//  const vote = useVote('0x0C00F9fff5EC51EAfa591e3f381c4C2A4B7E69fe')
//   const token = useToken('0x0EEF9Df851A5bE84870406407dD537CCDF4Bff4d')
 


  const getAllProposals = async () => {
    const proposals = await vote?.getAll()
    return proposals
  }
  const isExecutable = async (id:string) => {
    const canExecute = await vote?.canExecute(id)
    return canExecute
  }
  const checkIfVoted = async (id:string) => {
    const res = await vote?.hasVoted(id, address)
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
      const delegation = await token?.getDelegationOf(address!)
      if (delegation === ethers.constants.AddressZero) {
        await token?.delegateTo(address!)
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
    <ChainlabsDaoContext.Provider
      value={{
        getAllProposals,
        isExecutable,
        voteFor,
        createProposal,
        address,
        connectWithMetamask,
        disconnectWallet,
        executeProposal,

      }}
    >
      {children}
    </ChainlabsDaoContext.Provider>
  )
}
