import { CoreModal } from "components/UI/Modal/Modal";
import styles from "./helperAuthModal.module.scss";
import step1 from "images/step1.png";
import step2 from "images/step2.png";

type HelperAuthModalProps = {
  opened: boolean;
  close: () => void;
};

export const HelperAuthModal: React.FC<HelperAuthModalProps> = ({ close, opened }) => {
  return (
    <CoreModal
      className={styles.modal}
      title="Please complete login process"
      closeOutClick={true}
      onClose={close}
      visible={opened}
    >
      <div className={styles.body}>
        <span className={styles.step}>Step one</span>
        <span>Open Metamask extension</span>
        <img className={styles.img} src={step1} alt="step1" />
        <span className={styles.step}>Step two</span>
        <span>Click to Metamask box and complete auth</span>
        <img className={styles.img} src={step2} alt="step2" />
      </div>
    </CoreModal>
  );
};
