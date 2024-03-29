import { useWeb3 } from "helpers/web3/useWeb3";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setConnectingWallet } from "Redux/account/Actions/accountActions";

const usePortis = () => {
  const { activateWallet } = useWeb3();
  const dispatch = useDispatch();

  return useCallback(() => {
    activateWallet("portis", { dAppId: process.env.REACT_APP_PORTIS_DAPP_ID }).catch(() =>
      dispatch(setConnectingWallet(""))
    );
  }, [activateWallet, dispatch]);
};

export default usePortis;
