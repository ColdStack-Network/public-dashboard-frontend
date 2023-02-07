import Button from "components/UI/Button/Button";
import { ButtonIcon } from "components/UI/ButtonIcon/ButtonIcon";
import SvgPlus from "icons/Plus";
import React from "react";
import styles from "./StakeButton.module.scss";

type StakeButtonProps = {
  onClick: () => void;
};

export const StakeButton: React.FC<StakeButtonProps> = ({ onClick }) => {
  return (
    <>
      <ButtonIcon className={styles.visibleSm} onClick={onClick}>
        <SvgPlus />
      </ButtonIcon>
      <Button className={styles.visibleMd} onClickHandler={onClick} color="primary" size="big">
        Stake Tokens
      </Button>
    </>
  );
};
