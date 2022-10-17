import React, {ReactElement} from 'react'
import style from './modal.module.scss';
import SvgCloseIcon from "../../../icons/Close";
import SvgExpandDown from "../../../icons/Expand_down";

interface ModalProps {
	visible: boolean,
	title: string,
	children: (onClose: () => void) => ReactElement,
	footer?: ReactElement | string,
	footerCenter?: boolean,
	onClose: () => void,
	titleMargin?: string,
	closeOutClick: boolean,
	overflow?: string,
	uploadFiles?: number,
	disabled?: boolean;
	showClose?: boolean;
	titleClassName?: string;
}

const CoreModal = ({
	                   visible = false,
	                   title = '',
	                   children,
	                   footer = '',
	                   footerCenter = false,
	                   onClose,
	                   titleMargin,
	                   closeOutClick,
	                   overflow = 'auto',
	                   uploadFiles = 0,
	                   disabled = false,
	                   showClose = true,
	                   titleClassName,
                   }: ModalProps) => {
	const onKeydown = ({key}: KeyboardEvent) => {
		switch (key) {
			case 'Escape':
				onClose()
				break
		}
	}

	React.useEffect(() => {
			if (visible) {
				document.addEventListener('keydown', onKeydown)
			}
			if (visible) {
				document.body.classList.add('hidden');
			} else {
				document.body.classList.remove('hidden');
			}
			return () => document.removeEventListener('keydown', onKeydown)
		},
		//eslint-disable-next-line
		[visible])

	if (!visible) return null

	// const [overflow, setOverflow] = useState("visible")

	return (
		<div className={style.modal} onClick={closeOutClick ? onClose : () => {
		}}>
			<div className={style.modalDialog} onClick={e => e.stopPropagation()}>
				<div className={style.modalHeader} style={titleMargin ? {marginBottom: titleMargin} : {}}>
					<h3 className={titleClassName ? titleClassName : style.modalTitle}>{title}</h3>
					{showClose && (
						<span className={style.modalClose} onClick={onClose}>
                    {uploadFiles > 0 && disabled ? <SvgExpandDown color={"#5A5D65"} rotate={false} /> : <SvgCloseIcon />}
                </span>
					)}
				</div>
				<div className={style.modalWrapper} style={overflow === 'visible' ? {overflow: 'visible'} : {overflow: 'auto'}}>
					<div className={style.modalBody}>
						<div className={style.modalContent}>{children(onClose)}</div>
					</div>
					{footer && <div className={`${style.modalFooter} ${footerCenter ? style.modalFooterCenter : ""}`}>{footer}</div>}
				</div>
			</div>
		</div>
	)
}

export default CoreModal;
