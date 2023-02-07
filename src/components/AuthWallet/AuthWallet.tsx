import React from "react";
import style from "./authWallet.module.scss";
import Badge from "../UI/Badge/Badge";
import Button from "../UI/Button/Button";
import Preloader from "../shared/Preloader";
import Flex from "../shared/Flex";
import CircleLoader from "react-spinners/CircleLoader";
import { useDispatch, useSelector } from "react-redux";
import { setConnectingWallet } from "Redux/account/Actions/accountActions";
import { selectConnectingWallet } from "Redux/account/Selectors/selectConnectingWallet";

export interface AuthWalletProps {
  title: string;
  token: string;
  subtitle: string;
  icon: React.ReactNode;
  active: boolean;
  badgeText: string;
  onClick: () => void;
  highLight?: boolean;
}

const AuthWallet: React.FC<AuthWalletProps> = ({
  token,
  active,
  title,
  subtitle,
  icon,
  badgeText,
  onClick,
  highLight = false,
}: AuthWalletProps) => {
  const dispatch = useDispatch();
  const connectingWallet = useSelector(selectConnectingWallet);
  const isConnectingWallet = connectingWallet === token;

  const onClickAction = () => {
    if (active) {
      dispatch(setConnectingWallet(token));
      onClick();
    }
  };

  return (
    <Preloader
      showSpinner={isConnectingWallet}
      className={style.onHover}
      label={
        <Flex alignItems="center">
          <CircleLoader color="#0099ff" loading size={40} />
          <div>
            <Flex justifyContent="center">
              <h5 className={style.label}>Connecting wallet...</h5>
            </Flex>
            <Flex justifyContent="center">
              <Button color={"accent"} size={"tiny"} onClickHandler={() => dispatch(setConnectingWallet(""))}>
                Cancel request
              </Button>
            </Flex>
          </div>
        </Flex>
      }
    >
      <div
        className={`${style.container} ${!active ? style.containerDisabled : ""}`}
        onClick={!isConnectingWallet ? onClickAction : () => {}}
      >
        <div className={`${highLight ? style.highLight : ""}`} />
        <div className={style.iconBlock}>{icon}</div>
        <div className={style.title}>{title}</div>
        <div className={style.subtitle}>{subtitle}</div>
        {badgeText && (
          <div className={style.badgeWrap}>
            <Badge active={active} text={badgeText} />
          </div>
        )}
      </div>
    </Preloader>
  );
};

export default AuthWallet;
