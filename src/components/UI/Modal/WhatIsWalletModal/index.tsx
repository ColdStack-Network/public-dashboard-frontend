import React from 'react'
import Modal from "../Modal";
import Button from "../../Button/Button";
import style from './style.module.scss';
import Flex from "../../../shared/Flex";

interface WhatIsWalletModalProps {
  visible: boolean
  onClose: () => void
}

const WhatIsWalletModal = ({ visible, onClose }: WhatIsWalletModalProps) => (
  <Modal title={"What is wallet?"} closeOutClick={true} onClose={onClose} footerCenter={true} visible={visible}>
    {() => {
      return (
        <div className={style.centerText}>
          Wallets are used to send, receive, and store digital assets like Ether.
          Wallets come in many forms. They are either built into your browser,
          an extension added to your browser, a piece of hardware plugged into
          your computer or even an app on your phone.

          <br />
          <br />

          <Flex justifyContent='center'>
            <Button color={"primary"} size={"small"} onClickHandler={onClose}>
              Ok, I got it.
            </Button>
          </Flex>
        </div>
      )
    }}
  </Modal >
)

export default WhatIsWalletModal;
