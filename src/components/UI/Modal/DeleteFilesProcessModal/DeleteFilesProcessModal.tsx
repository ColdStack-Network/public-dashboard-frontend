import React from 'react'
import Modal from "../Modal";
import SvgTimeAttack from '../../../../icons/TimeAtack';
import style from "./deleteFilesProcessModal.module.scss";

interface IDeleteFilesProcessModal {
	visible: boolean;
	onClose: () => void,
}


const DeleteFilesProcessModal = ({
	                                 visible = false,
	                                 onClose
                                 }: IDeleteFilesProcessModal) => {

	return (
		<Modal title={"Deleting objects"} closeOutClick={false} onClose={onClose} visible={visible}
		>
			{() => {
				return <div>
					<div className={style.center}>
						<SvgTimeAttack />
					</div>
					<div>
						This can take from couple of seconds to several minutes
					</div>
				</div>
			}}
		</Modal>
	)
};

export default DeleteFilesProcessModal;
