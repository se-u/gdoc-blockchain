import { useContext } from "react";
import { WebtriContext } from "../providers/webtri-provider";

export const useStatus = () => {
    const context = useContext(WebtriContext);
    if (!context) {
      throw new Error('useWeb3 must be used within a Web3Provider');
    }
    return {walletLoading: context.loading};
  };