import Web3, { Contract, ContractAbi } from 'web3';


export interface IContractMethods {
  methods: {
    [methodName: string]: (...params: unknown[]) => {
      call: () => Promise<unknown>; // Function for calling the method
      send: (options: { from: string; gas?: number; value?: number }) => Promise<void>; // Function for sending a transaction
      estimateGas: (options: { from: string; value?: number }) => Promise<number>; // Optional gas estimation
      encodeABI: () => string; // Function to get ABI encoded data
    };
  };

  events: {
    [eventName: string]: (options?: {
      filter?: { [key: string]: unknown };
      fromBlock?: number;
      toBlock?: 'latest' | number;
    }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      on: (event: 'data' | 'changed' | 'error', callback: (error: any, event?: any) => void) => void;
      unsubscribe: () => void; // To stop listening for the event
    };
  };
}


// Generic function to fetch contract with given ABI and address
export const getContract = (client: Web3, address: string, abi: ContractAbi): Contract<ContractAbi> | null => {
  return new client.eth.Contract(abi, address);
};
