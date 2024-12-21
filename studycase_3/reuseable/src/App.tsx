import React from 'react';
import ConnectButton from './webtri/components/ConnectButton';
import ReadMessage from './ReadMessage';
import { WebtriProvider } from './webtri/providers/webtri-provider';

const App: React.FC = () => {
  return (
    <WebtriProvider>
      <div>
        <h1>Web3 React App</h1>
        <ConnectButton />
        {/* Other components can go here */}
        <ReadMessage />

      </div>
    </WebtriProvider>
  );
};

export default App;
