import { useCallback } from "react";
import { useWeb3 } from "helpers/web3/useWeb3";
import { useDispatch } from "react-redux";
import { setConnectingWallet } from "Redux/account/Actions/accountActions";

const useMetamask = () => {
  const { checkWalletAuth, activateWallet, account } = useWeb3();
  const dispatch = useDispatch();

  return useCallback(async () => {
    const isMetamaskAuth = await checkWalletAuth();

    if (isMetamaskAuth) {
      await window.ethereum
        .request({
          method: "eth_requestAccounts",
          params: [
            {
              eth_accounts: {},
            },
          ],
        })
        .then((param) => {
          console.log("param!", param);
        });
      // Runs only they are brand new, or have hit the disconnect button
      await window.ethereum
        .request({
          method: "wallet_requestPermissions",
          params: [
            {
              eth_accounts: {},
            },
          ],
        })
        .then((permissions) => {
          console.log("then", permissions, account);
          const accountsPermission = permissions.find((permission) => permission.parentCapability === "eth_accounts");
          if (accountsPermission) {
            console.log("eth_accounts permission successfully requested!");
          }

          activateWallet("metamask").catch(() => {
            dispatch(setConnectingWallet(""));
          });
        })
        .catch((err) => {
          if (err.code === 4001) {
            dispatch(setConnectingWallet(""));
          }
        });
    } else {
      activateWallet("metamask").catch(() => dispatch(setConnectingWallet("")));
    }
  }, [activateWallet, checkWalletAuth, account, dispatch]);
};

export default useMetamask;
