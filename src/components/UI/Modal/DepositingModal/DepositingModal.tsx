import React from 'react'
import QRCode from 'qrcode.react'
import Modal from "../Modal";
import style from './depositingModal.module.scss';
import InputText from "../../Input/Input";
import {depositingWallet} from "../../../../helpers/common";
import P from '../../P/P'
import Span from '../../Span/Span'


interface DepositModalProps {
  visible: boolean,
  onClose: () => void,
}


const valueInput = depositingWallet || "";

const DepositingModal = ({
                           visible = false,
                           onClose
                         }: DepositModalProps) => {


  return (


    <Modal title={"Deposit Tokens"} closeOutClick={true}
           onClose={() => {
             onClose()
           }}
           visible={visible}
           footer={''}>
      {() => {
        return <div>
          <div className={style.item}>
            <InputText onChange={() => {
            }}
                       value={valueInput}
                       id={1}
                       type={'string'}
                       name={"Address"}
                       label={"Address"}
                       tabindex={0}
                       isSuccess={true}
                       isError={false}
                       error={""}
                       copyToClipboard={true}
            />

          </div>
          <div className={style.description}>
            <div className={style.qrcodeWrapper}>
              <QRCode size={180} value={valueInput}/>
            </div>
            <div className={style.text}>
              <P fontWeight={"500"}>Scan the code on the payment or wallet App
              </P>
              <P>
                1. Send only <Span fontWeight={'600'}>CLS</Span> to this deposit address.
              </P>
              <P>
                2. Ensure the network is <Span color={'accent'}>Ethereum (ERC20)</Span> or <Span color={'accent'}>Binance Smart Chain (BEP20).</Span>
              </P>
              <P>
                3. Minimum deposit: 1.00 CLS
              </P>
            </div>
          </div>
        </div>;
      }}
    </Modal>

  )
};

export default DepositingModal;
