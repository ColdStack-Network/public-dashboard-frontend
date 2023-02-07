import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CoreModal } from "../Modal";
import style from "./giftModal.module.scss";
import Gift from "../../../../icons/Gift";
import Button from "../../Button/Button";
import OpenedGiftBox from "../../../../icons/OpenedGiftBox";
import Confeti from "../../../../icons/Confeti";
import BigCLS from "../../../../icons/BigCLS";
import { closeGiftModal, getGift } from "../../../../Redux/user/Actions/userActions";
import { toCLS } from "../../../../helpers/toCLS";
import { selectGiftXsmasGift } from "../../../../Redux/user/Selectors/selectGiftXsmasGift";
import clsx from "clsx";

interface IGiftmModal {
  visible: boolean;
  onClose: () => void;
}

const GIFT_STATES = {
  closed: 1,
  opened: 2,
  finished: 3,
};

const GiftmModal = ({ visible = false, onClose }: IGiftmModal) => {
  const dispatch = useDispatch();
  const xsmasGift = useSelector(selectGiftXsmasGift);
  const [isOpened, setIsOpened] = useState(false);
  const [giftState, setGiftState] = useState(GIFT_STATES.closed);

  const openHandler = () => {
    switch (giftState) {
      case GIFT_STATES.closed:
        dispatch(getGift());
        setIsOpened(true);
        setGiftState(GIFT_STATES.opened);
        setTimeout(() => {
          setGiftState(GIFT_STATES.finished);
        }, 4000);
        break;

      case GIFT_STATES.opened:
        break;

      case GIFT_STATES.finished:
        dispatch(closeGiftModal());

        setTimeout(() => {
          window.location.reload();
        }, 1000);
        break;
    }
  };

  const buttonText = () => {
    switch (giftState) {
      case GIFT_STATES.closed:
        return "Open";

      case GIFT_STATES.opened:
        return "Opening...";

      case GIFT_STATES.finished:
        return "Thank you, Santa!";
    }
  };

  return (
    <CoreModal
      titleClassName={style.titleClassName}
      title={giftState === GIFT_STATES.finished ? "Congrats!" : "Merry Christmas and Happy New Year!"}
      showClose={false}
      closeOutClick={false}
      onClose={onClose}
      visible={visible}
    >
      <div>
        {giftState === GIFT_STATES.finished ? (
          <div>
            <p className={style.presentText}>
              You've been gifted <span>{xsmasGift?.amount ? toCLS(xsmasGift?.amount) : 0} CLS tokens</span> in your
              account!
            </p>
            <div className={style.giftIconWrapper}>
              <BigCLS />
            </div>
            <p className={style.secondPresentText}>
              It's pure magic: you can only spend them storing files here, but cannot withdraw them.
            </p>
          </div>
        ) : (
          <div>
            <p className={style.presentText}>Get your presents from ColdStack.</p>
            <div className={style.giftIconWrapper}>
              <div className={clsx(style.closed, isOpened ? style.closedHide : style.closedShowed)}>
                <Gift />
              </div>
              <div className={clsx(style.opened, isOpened ? style.openedShowed : style.openedHide)}>
                <div className={style.confeti}>
                  <Confeti />
                </div>
                <div className={style.giftBox}>
                  <OpenedGiftBox />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className={style.buttonWrapper}>
          <Button onClickHandler={() => openHandler()} size="gift" color="secondary">
            {buttonText()}
          </Button>
        </div>
      </div>
    </CoreModal>
  );
};

export default GiftmModal;
