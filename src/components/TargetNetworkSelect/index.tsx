import React, { useEffect, useRef, useState } from "react";
import style from "./networkSelect.module.scss";

interface IProps {
  connectedIcon?: React.ReactNode;
  icon: React.ReactNode;
  title: string;
  onSelect: (elem: any) => void;
  network: string;
  mobile: string;
  isSelected: boolean;
}

const TargetNetworkSelect: React.FC<IProps> = ({
  connectedIcon,
  icon,
  title,
  onSelect,
  network,
  mobile,
  isSelected,
}: IProps) => {
  const [open, _setOpen] = useState(false);
  const openRef = useRef(open);
  const rootEl = useRef(null);
  const setOpen = (data: boolean) => {
    // its for openRef to be up to date in eventListener
    openRef.current = data;
    _setOpen(data);
  };
  const handleClickOutside = (event: any) => {
    if (
      !rootEl ||
      !rootEl?.current ||
      // @ts-ignore
      (rootEl?.current && !rootEl?.current?.contains(event.target))
    ) {
      setOpen(false);
    }
  };

  useEffect(
    () => {
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, false);
      };
    },
    // eslint-disable-next-line
    []
  );

  const selectNetwork = () => {
    onSelect(network);
  };

  return (
    <div className={`${style.itemWrap}`} onClick={selectNetwork}>
      <div className={`${style.block} ${style.item} ${isSelected ? style.selected : ""}`}>
        <div className={style.topPart}>
          <div className={style.icon}>{icon}</div>
        </div>
        <div className={style.bottomPart}>
          <div className={style.title}>{title}</div>
          <div className={style.select} ref={rootEl} />
        </div>
      </div>
    </div>
  );
};

export default TargetNetworkSelect;
