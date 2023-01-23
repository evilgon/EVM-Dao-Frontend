import { useContract } from '@thirdweb-dev/react';


const client = () => {
  const {contract: vote} = useContract('0x8EFDE19C16eeD796c9725549817f3a78Cb4b41Ab', 'vote');

  const getAllProposals = async () => {
    await vote?.getAll();
  };

  const getProposal = async (id: string) => {
    await vote?.get(id);
  };
};

export default client;
