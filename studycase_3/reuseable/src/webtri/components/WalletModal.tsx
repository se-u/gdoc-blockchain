import { Modal } from "antd";
// import { useDisconnectWallet } from "./webtri/hooks/useDisconnectWallet";
import { Dispatch, SetStateAction } from "react";

const WalletModal = ({
  isVisible,
  account,
  setIsModalVisible,
}: {
  isVisible: boolean | undefined;
  account: string | null;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  // const disconnect = useDisconnectWallet();
  return (
    <Modal
      title="Wallet Information"
      open={isVisible}
      onOk={() => {}}
      onCancel={() => {
        setIsModalVisible(false);
      }}
      footer={[]}
    >
      <p>Account: {account}</p>
      {/* <Button onClick={disconnect}>Disconnect</Button> */}
    </Modal>
  );
};

export default WalletModal;
