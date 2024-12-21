import React, { createContext, useEffect, useState, useCallback } from "react";
import Web3, { Contract, ContractAbi } from "web3";
import { abi } from "../../abi";
import { getContract } from "../getContract";

interface WebtriContextProps {
  client: Web3 | null;
  contract: Contract<ContractAbi> | null;
  account: string | null;
  connect: () => Promise<void>;
  disconnect: () => void; // Add disconnect to the context
  loading: boolean;
}

const WebtriContext = createContext<WebtriContextProps | undefined>(undefined);

export const WebtriProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [contract, setContract] = useState<any>(null);


  // Initialize contract
  useEffect(() => {
    setLoading(true);
    const VITE_CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
    if (!client) return;
    if (!VITE_CONTRACT_ADDRESS) {
      console.error("Contract address not found");
      return;
    }
    const contract = getContract(client, VITE_CONTRACT_ADDRESS as string, abi);
    setContract(contract);
    setLoading(false);
  }, [client]);

  // Initialize web3 client
  const init = useCallback(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      web3Instance.eth.getAccounts().then((accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      });
      setClient(web3Instance);
    } else {
      setError("Please install MetaMask!");
      console.error(error);
    }
  }, [error]);

  // Initialize web3 client on mount
  useEffect(() => {
    init();
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null); // If no accounts, consider the user disconnected
        }
      });
    }
    // Clean up event listener on unmount
    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener("accountsChanged", () => {});
      }
    };
  }, [init]);

  // Connect wallet
  const connect = async () => {
    setLoading(true);
    if (client && window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // console.log("Connected to wallet");
        const accounts = await client.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error("User denied account access:", error);
      }
    }
    setLoading(false);
  };

  // Disconnect wallet
  const disconnect = () => {
    setAccount(null);
    setContract(null);
    setClient(null); // Optional, depends if you want to fully clear the Web3 client
  };

  return (
    <WebtriContext.Provider value={{ client, account, connect, disconnect, loading, contract }}>
      {children}
    </WebtriContext.Provider>
  );
};

export { WebtriContext };
