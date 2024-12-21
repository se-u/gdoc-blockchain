import  { useState } from 'react';
import { Button } from 'antd';
import WalletModal from '../../WalletModal';  // Make sure the path is correct
import { useActiveAccount } from '../hooks/useActiveAccount';
import { useConnectWallet } from '../hooks/useConnectWallet';
import { useStatus } from '../hooks/useStatus';

const ConnectButton = () => {
  const {walletLoading: loading} = useStatus();
  const connect = useConnectWallet();
  const account = useActiveAccount();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleConnect = async () => {
    if (!account) {
      await connect();
    } else {
      setIsModalVisible(true);
    }
  };

  return (
    <>
      <Button onClick={handleConnect}>

        {/* Add a conditional rendering to show the account address */}
        {loading ? 'Loading...' : account ? `Connected: ${account}` : 'Connect Wallet'}
      </Button>
      <WalletModal
        isVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        account={account}
      />
    </>
  );
};

export default ConnectButton;
