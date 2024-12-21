import { useWeb3 } from './webtri/providers/webtri-provider';

export const useActiveAccount = () => {
  const { account } = useWeb3();
  return account;
};
