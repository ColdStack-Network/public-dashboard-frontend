import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleForcedLogoutModal } from "Redux/ui/uiActions";
import { CoreModal } from "../Modal";
import styles from "./ForcedLogoutModal.module.scss";
import Button from "../../Button/Button";
import {deleteToken} from "../../../../helpers/common";
import {useWeb3} from "../../../../helpers/web3/useWeb3";
import {resetUserStateAction} from "../../../../Redux/user/Actions/userActions";

export const ForcedLogoutModal: React.FC<{isOpen: boolean}> = ({isOpen}) => {
    const dispatch = useDispatch();
    const close = () => dispatch(toggleForcedLogoutModal(false));
    const { deactivate } = useWeb3();

    useEffect(() => {
        !isOpen && close();
    }, [isOpen, close]);

    const logout = () => {
        deleteToken();
        deactivate();
        dispatch(resetUserStateAction());
        close()
    }

    useEffect(() => {
        setTimeout(() => {
            logout();
        }, 100000)
    }, [logout])

    return (
        <CoreModal titleMargin="0px" className={styles.successModal} closeOutClick={false} showClose={false} onClose={close} visible={isOpen}>
            <div className={styles.inner}>
                <span className={styles.text}>You have changed your wallet, and for security reasons, you have to re-login again.</span>
                <Button onClickHandler={logout}>OK</Button>
            </div>
        </CoreModal>
    );
};
