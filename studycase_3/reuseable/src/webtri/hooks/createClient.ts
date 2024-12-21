import { useContext } from "react";
import { WebtriContext } from "../providers/webtri-provider";

export const createClient = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const context = useContext(WebtriContext);
    if (!context) {
      throw new Error('useWeb3 must be used within a Web3Provider');
    }
    return context.client;
  };