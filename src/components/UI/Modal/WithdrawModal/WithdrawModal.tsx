import React, { useEffect, useMemo, useState } from "react";
import { CoreModal } from "../Modal";
import Button from "../../Button/Button";
import InputText from "../../Input/Input";
import { IFormInputs, updateInputs, validateInputs } from "../../Input/types";
import style from "./withdrawModal.module.scss";
import Link from "../../Link/Link";
import { selectUserDataBalanceCLS } from "../../../../Redux/user/Selectors/selectUserDataBalanceCLS";
import { TStore } from "../../../../reducers";
import { useDispatch, useSelector } from "react-redux";
import LinkComponent from "../../Link/Link";
import SvgSuccess from "../../../../icons/SvgSuccess";
import TargetNetworkSelect from "../../../TargetNetworkSelect";
import Metamask from "../../../../icons/Metamask";
import { NETWORKS_LIST } from "../../../../helpers/constants";
import { getWithdrawBalanceData, getWithdrawComissionsData } from "../../../../Redux/account/Actions/accountActions";
import { isEmpty } from "lodash";
import { ITicket } from "actions/interfaces";

interface WithdrawModalProps {
  visible: boolean;
  topic: string;
  subTopic: string;
  onClose: () => void;
  onSubmit: (params: ITicket) => void;
}

const initialInputs = {
  withdraw: {
    value: "",
    error: "",
    isError: false,
    isSuccess: false,
  },
} as IFormInputs;

const WithdrawModal = ({ visible = false, topic, subTopic, onClose, onSubmit }: WithdrawModalProps) => {
  const [inputs, setInputs] = useState(initialInputs);
  const [isSuccess, setIsSuccess] = useState(false);

  const balanceCLS = useSelector(selectUserDataBalanceCLS);
  const [withdrawalResult, setWithdrawalResult] = useState(0);

  const minimumWithdrawal = {
    eth: 25,
    bsc: 10,
  };

  const networks = {
    eth: NETWORKS_LIST.ETHEREUM_MAINNET,
    bsc: NETWORKS_LIST.BINANCE_SMART_CHAIN_MAINNET,
  };

  const [selectedNetwork, setSelectedNetwork] = useState("eth");

  const dispatch = useDispatch();

  const withdrawBalanceData = useSelector((state: TStore) => state.account.withdrawBalanceData);
  const withdrawComissionsData = useSelector((state: TStore) => state.account.withdrawCommissionsData);

  useEffect(
    () => {
      if (visible && (isEmpty(withdrawBalanceData) || isEmpty(withdrawComissionsData))) {
        dispatch(getWithdrawBalanceData());
        dispatch(getWithdrawComissionsData());
      }
    },
    //eslint-disable-next-line
    [visible]
  );

  const onTextInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const name = evt.currentTarget.name;
    const value = evt.currentTarget.value;

    if (balanceCLS) {
      const minCLS = minimumWithdrawal[selectedNetwork];
      const newInputs = updateInputs(inputs, name, "value", value);
      const [updatedInputs] = validateInputs(newInputs, [name], balanceCLS, minCLS);
      setInputs(updatedInputs);
    }

    setWithdrawalResult(+value - withdrawComissionsData[selectedNetwork.toUpperCase()]);
  };

  const submit = () => {
    const [updatedInputs, errors] = validateInputs(inputs, ["withdraw"], balanceCLS);
    setInputs(updatedInputs);

    if (errors?.length === 0) {
      onSubmit({
        fields: {
          amount: parseFloat(inputs.withdraw.value.toString()),
          chain: networks[selectedNetwork].shortName,
        },
        onSuccess: () => {
          setInputs({
            withdraw: {
              value: inputs.withdraw?.value,
              error: "",
              isError: false,
              isSuccess: true,
            },
          } as IFormInputs);
          setInputs(initialInputs);
          setIsSuccess(true);
        },
      });
    }
  };

  const maxValueFunc = () => {
    inputs.withdraw.value = balanceCLS as string;

    const [updatedInputs] = validateInputs(inputs, ["withdraw"], balanceCLS, minimumWithdrawal[selectedNetwork]);
    setInputs(updatedInputs);
  };

  const footer = useMemo(
    () => {
      return (
        <div className={style.footer}>
          <div className={style.wrapBtn1}>
            <Button
              onClickHandler={() => {
                setInputs(initialInputs);
                onClose();
              }}
              color={"additional"}
              size={"small"}
            >
              Cancel
            </Button>
          </div>
          {Number(balanceCLS) < 25 ? (
            <Button onClickHandler={submit} isDisabled={true} color={"additional"} size={"small"}>
              Withdraw
            </Button>
          ) : (
            <Button onClickHandler={submit} color={"accent"} size={"small"}>
              Withdraw
            </Button>
          )}
        </div>
      );
    },
    // eslint-disable-next-line
    [onSubmit, inputs, balanceCLS]
  );

  const onSelectNetwork = (value: string) => {
    setSelectedNetwork(value);
  };

  return (
    <>
      {!isSuccess && (
        <CoreModal
          title="Withdraw Tokens"
          closeOutClick={true}
          onClose={() => {
            setInputs(initialInputs);
            onClose();
          }}
          visible={visible}
          footer={footer}
          className={style.wrap}
        >
          <div>
            <div>Please, select target account:</div>
            <br />
            <div className={style.rowNetworks}>
              <TargetNetworkSelect
                icon={networks.eth.icon}
                title="Ethereum"
                mobile="left"
                connectedIcon={<Metamask />}
                onSelect={(value) => onSelectNetwork(value)}
                network="eth"
                isSelected={selectedNetwork === "eth"}
              />

              <TargetNetworkSelect
                icon={networks.bsc.icon}
                title="Binance Smart Chain"
                mobile="right"
                connectedIcon={<Metamask />}
                onSelect={(value) => onSelectNetwork(value)}
                network="bsc"
                isSelected={selectedNetwork === "bsc"}
              />
            </div>

            <br />

            <div className={style.item}>
              <InputText
                onChange={onTextInputChange}
                value={inputs.withdraw.value as string}
                id={1}
                type="number"
                name="withdraw"
                label="You will pay"
                tabindex={0}
                typeValue="CLS"
                isSuccess={inputs.withdraw.isSuccess}
                isError={inputs.withdraw.isError}
                error={inputs.withdraw.error}
                maxValueFunc={maxValueFunc}
                maxValue={Number(balanceCLS)}
                placeholder="Enter an amount"
              />
            </div>

            {withdrawalResult ? `You will roughly get ${withdrawalResult} CLS` : null}

            <br />
            <br />

            <div className={style.description}>
              That the minimum for withdrawal for {selectedNetwork.toUpperCase()} is{" "}
              {minimumWithdrawal[selectedNetwork]} CLS. Current gas fees will be subtracted from the withdrawal sum. If
              you don't receive CLS tokens in your wallet within 4 hours, please contact{" "}
              <Link href="/dashboard/support">support</Link>.
            </div>
          </div>
        </CoreModal>
      )}
      {isSuccess && (
        <CoreModal
          title=""
          titleMargin="0"
          closeOutClick={true}
          onClose={() => {
            setInputs(initialInputs);
            setIsSuccess(false);
            onClose();
          }}
          visible={true}
          footer={<></>}
        >
          <div className={style.pendingWrapper}>
            <div className={style.pendingIcon}>
              <SvgSuccess />
            </div>
            <div className={style.pendingTitle}>Submitted withdrawal request</div>
            <div className={style.pendingSubtitle}>
              If you will not get CLS tokens on your wallet in 4 hours, please contact{" "}
              <LinkComponent href="/dashboard/support">support</LinkComponent>.
            </div>
          </div>
        </CoreModal>
      )}
    </>
  );
};

export default WithdrawModal;
