import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Modal from "../Modal";
import Button from "../../Button/Button";
import Flex from "../../../shared/Flex";
import {
  verifiers,
  GOOGLE, FACEBOOK,
} from "../../../../containers/AuthPage/wallet-providers/torus/verifiers";
import { login, setNetwork } from "../../../../containers/AuthPage/wallet-providers/torus"
import SvgGoogle from 'icons/Google';
import SvgFacebook from 'icons/Facebook';
import style from './style.module.scss';
import ToggleButtons from 'components/shared/ToggleButtons';
import { NETWORKS, WALLETS } from 'helpers/constants';
import Preloader from '../../../shared/Preloader';
import CircleLoader from "react-spinners/CircleLoader";
import { finishAuth, setAuthError } from "../../../../modules/user/actions";
import UseWeb3 from 'helpers/web3/UseWeb3';
import { setConnectingWallet } from "../../../../Redux/account/Actions/accountActions";

const { TESTNET, MAINNET } = NETWORKS;
const { TORUS } = WALLETS;

interface AuthErrorModalProps {
  visible: boolean
  onClose: () => void
  errorText?: string
}

const AuthErrorModal = ({
  visible = false,
  onClose,
  errorText,
}: AuthErrorModalProps) => {
  useEffect(() => {
    setNetwork(MAINNET)
  }, []);

  const [selectedProvider, setSelectedProvider] = useState(MAINNET);
  const dispatch = useDispatch();
  const { initWalletIfPossible } = UseWeb3();

  const toggleNetwork = (network) => {
    setNetwork(network);
  }

  const loginVia = async (provider) => {
    await initWalletIfPossible(TORUS);
    login(provider, selectedProvider)
      .then(async (authDetails) => {
        if (window.wallet) {
          dispatch(
            finishAuth({
              signFunc: window.wallet.sign.bind(window.wallet),
              account: authDetails.publicAddress
            })
          )
        }
      })
      .catch((err) => {
        console.error(err)
        dispatch(setAuthError({ open: true, errorText: `Error while connecting Torus wallet via ${provider}` }));
      })
  }

  const onCloseAction = () => {
    onClose();
    dispatch(setConnectingWallet(''));
  }

  return (
    <Modal title={"Connect Torus wallet"} closeOutClick={true} onClose={onCloseAction} footerCenter={true} visible={visible}>
      {() => {
        return (
          <>
            <label>Selected network:</label>
            <ToggleButtons
              options={[MAINNET, TESTNET]}
              selected={MAINNET}
              onClick={toggleNetwork}
            />

            <br />
            <br />

            <Flex justifyContent="center" fullWidth>
              <Preloader
                showSpinner={selectedProvider === GOOGLE}
                label={
                  <Flex alignItems='center'>
                    <CircleLoader color='#0099ff' loading size={40} />
                    <div className={style.buttonLabel}>
                      <Button color={"accent"} size={"tiny"} onClickHandler={() => setSelectedProvider('')}>
                        Cancel
                      </Button>
                    </div>
                  </Flex>
                }
              >
                <Button color={"lightgray"} size={"large"} onClickHandler={() => loginVia(GOOGLE)}>
                  <SvgGoogle width="30px" /> <span className={style.buttonLabel}>Connect via {verifiers[GOOGLE][selectedProvider].name}</span>
                </Button>
              </Preloader>
            </Flex>

            <br />

            <Flex justifyContent="center" fullWidth>
              <Preloader
                showSpinner={selectedProvider === FACEBOOK}
                label={
                  <Flex alignItems='center'>
                    <CircleLoader color='#0099ff' loading size={40} />
                    <div className={style.buttonLabel}>
                      <Button color={"accent"} size={"tiny"} onClickHandler={() => setSelectedProvider('')}>
                        Cancel
                      </Button>
                    </div>
                  </Flex>
                }
              >
                <Button color={"lightgray"} size={"large"} onClickHandler={() => loginVia(FACEBOOK)}>
                  <SvgFacebook width="30px" /> <span className={style.buttonLabel}>Connect via {verifiers[FACEBOOK][selectedProvider].name}</span>
                </Button>
              </Preloader>
            </Flex>
          </>
        )
      }}
    </Modal >
  )
};

export default AuthErrorModal;
