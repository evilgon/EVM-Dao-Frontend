import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useContext,
  useMemo,
  useState,
} from 'react';
import styles from '../styles/ProposalCard.module.css';
import { ethers } from 'ethers';
import { StoreContext } from '../context/context';


const ProposalCard = ({ proposal }: any) => {
  const { address, voteFor, executeProposal } = useContext(StoreContext);
  const [statusText, setStatusText] = useState('');
  const [statusColor, setStatusColor] = useState('#fff');

  const setStatus = () => {
    switch (proposal.state) {
      case 0:
        setStatusText('Pending');
        setStatusColor('#48494a');
      case 1:
        setStatusText('Active');
        setStatusColor('#21b66f');
        break;
      case 3:
        setStatusText('Defeated');
        setStatusColor('#f44336');
        break;
      case 7:
        setStatusText('Executed');
        setStatusColor('#0011ff');
        break;
      case 4:
        setStatusText('Successful');
        setStatusColor('#21b66f');
        break;
      default:
        setStatusText('Unknown');
        setStatusColor('#fff');
    }
  };

  useMemo(() => {
    setStatus();
  }, [statusText, statusColor, proposal.state]);
  return (
    <>
      <div className={styles.card}>
        <div className={styles.top}>
          <div>
            <div className={styles.proposer}>
              Proposer: {(proposal.proposer.slice(0, 10))}
            </div>

            <div className={styles.description}>{proposal.description}</div>
          </div>
          <div
            className={styles.status}
            style={{ backgroundColor: statusColor }}
          >
            {statusText}
          </div>
        </div>
        {proposal.votes.map(
          (vote: {
            label:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | ReactFragment
              | ReactPortal
              | null
              | undefined;
          }) => {
            return (
              <div key={Math.random()}>
                <button
                  className={styles.voteButton}
                  key={Math.random()}
                  onClick={() => {
                    voteFor(proposal.proposalId, vote.label, '');
                  }}
                >
                  {vote.label}
                </button>
              </div>
            );
          }
        )}
        <div className={styles.bottom}>
          <div className={styles.results}>
            {proposal.votes.map(
              (vote: {
                count: ethers.BigNumberish;
                label:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | ReactFragment
                  | ReactPortal
                  | null
                  | undefined;
              }) => {
                const voteCount = ethers.utils.formatEther(vote.count);

                return (
                  <div key={Math.random()}>
                    <div>
                      {vote.label}: {Math.trunc(Number(voteCount))} CDAO
                    </div>
                  </div>
                );
              }
            )}
          </div>
          {proposal.state === 4 && (
            <button
              className={styles.executeButton}
              onClick={() => {
                executeProposal(proposal.proposalId);
              }}
            >
              Execute
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProposalCard;
