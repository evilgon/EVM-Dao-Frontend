import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react';
import { Toaster } from 'react-hot-toast';
import { StoreProvider } from '../context/context';


const MyApp = ({ Component, pageProps }: AppProps) => {
  
  const projectId = process.env.NEXT_PUBLIC_ALCHEMY_KEY;

  console.log(projectId)
  return (
    <div className="bg-gradient">
      <ThirdwebProvider
        desiredChainId={ChainId.Mumbai}
        chainRpc={{
          [ChainId.Mumbai]:
            `https://polygon-mumbai.g.alchemy.com/v2/${projectId}`,
        }}
      >
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </ThirdwebProvider>

      <Toaster />
    </div>
  );
};

export default MyApp;
