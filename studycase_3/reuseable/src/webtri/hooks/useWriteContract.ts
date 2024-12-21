/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { IContractMethods } from '../getContract';
import { useContract } from './useContract';
import { useActiveAccount } from './useActiveAccount';


export const useWriteContract = (methodName: keyof IContractMethods['methods'], ...params: unknown[]) => {
  const account = useActiveAccount();
  const contract = useContract();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const triggerSend = async () => {
    if (!contract) {
      setError('Contract could not be initialized');
      setLoading(false);
      return;
    }

    if (!account) {
      setError('Account not found');
      setLoading(false);
      return;
    }
    try {
      await contract.methods[methodName](...params).send({
        from: account,
        gas: "3000000",
      });
      console.log(`Transaction successful for ${methodName}`);
      setData('Transaction successful');
    } catch (err) {
      console.error(`Error calling ${methodName}:`, err);
      setError(`Error sending transaction for ${methodName}: ${err}`);
    } finally {
      setData(false);
    }
  };

  return { triggerSend, data, error, loading };
};
