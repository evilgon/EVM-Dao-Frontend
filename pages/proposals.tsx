import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/context';
import _lodash from 'lodash';
import styles from '../styles/Home.module.css';
import Login from '../components/Login';
import Header from '../components/Header';
import ProposalCard from '../components/ProposalCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import { Proposal } from '@thirdweb-dev/sdk';
import Loader from '../components/Loader';
import LoginHeader from '../components/LoginHeader';

const Proposals = () => {
  const [proposals, setProposals] = useState<Proposal[]>();
  const [proposalInput, setProposalInput] = useState('');

  //   const onGoinProposals = _lodash.filter(proposals, { state: 1 });
  //   const executedProposals = _lodash.filter(proposals, { state: 7 });
  //   const passedProposals = _lodash.filter(proposals, { state: 4 });
  //const failed = _lodash.filter(proposals, { state: 3 });

  const { getAllProposals, isExecutable, userAddress, createProposal } =
    useContext(StoreContext);

  useEffect(() => {
    getAllProposals()
      .then((proposals: any[]) => {
        if (proposals.length > 0) {
          setProposals(proposals.reverse());
          console.log(proposals);
          isExecutable(proposals[0].proposalId);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  //if (!proposals) return <Loader />;

  return (
    <div className={`bg-gradient ${styles.wrapper}`}>
      {userAddress ? (
        <>
      <LoginHeader />

          <ToastContainer />

          <div className={styles.content}>
            <div className={styles.createProposalForm}>
              <div className={styles.formTitle}>Make a Proposal</div>
              <input
                className={styles.formInput}
                placeholder="Make a Proposal"
                value={proposalInput}
                onChange={(e) => {
                  setProposalInput(e.target.value);
                }}
              />
              <button
                className={styles.formButton}
                disabled={!proposalInput}
                onClick={() => {
                  createProposal(proposalInput);
                  setProposalInput('');
                  toast.info('⏳ Submitting Proposal ⏳', {
                    position: 'top-center',
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                  });
                }}
              >
                Submit
              </button>
            </div>

            <div className={styles.proposals}>
              <>
                {/* <span> OnGoing: {onGoinProposals?.length}</span>
                <span> Executed: {executedProposals?.length}</span>
                <span> Password: {passedProposals?.length}</span> */}

                {proposals &&
                  proposals.map((proposal) => {
                    return (
                      <ProposalCard
                        key={Math.random()}
                        proposal={proposal}
                        proposals={proposals}
                      />
                    );
                  })}
              </>
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Proposals;
