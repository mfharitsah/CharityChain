import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';

import { StateContextProvider } from './context';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThirdwebProvider
    activeChain={{
      chainId: 11155111,
      rpc: [import.meta.env.VITE_THIRDWEB_RPC_SEPOLIA],
      nativeCurrency: {
        name: "SepoliaETH",
        symbol: "ETH",
        decimals: 18,
      },
      shortName: "sep",
      slug: "sepolia",
      name: "Sepolia Testnet",
      testnet: true,
    }}
    clientId='1e2181ab895c64c6051e5ff174b3734f'
  >
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);