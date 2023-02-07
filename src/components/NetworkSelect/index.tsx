import React, { useEffect, useRef, useState } from "react";
import style from "./networkSelect.module.scss";
import { Down } from "../../icons/Down";

interface IProps {
  label: string;
  isConnected: boolean;
  connectedIcon?: React.ReactNode;
  icon: React.ReactNode;
  title: string;
  dropdowns: any[];
  onSelect: (elem: any) => void;
  selected: any;
  mobile: string;
}

const NetworkSelect: React.FC<IProps> = ({
  label,
  isConnected,
  connectedIcon,
  icon,
  title,
  dropdowns,
  onSelect,
  selected,
  mobile,
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

  return (
    <div className={`${style.itemWrap}`}>
      <div className={style.label}>{label}</div>
      <div className={`${style.block} ${style.item}`}>
        <div className={style.topPart}>
          <div className={style.icon}>{icon}</div>
          {isConnected && (
            <div className={style.wrapConnected}>
              <div className={style.iconConnected}>{connectedIcon}</div>
              <div className={style.labelConnected}>Connected</div>
            </div>
          )}
        </div>
        <div className={style.bottomPart}>
          <div className={style.title}>{title}</div>
          <div className={style.select} ref={rootEl}>
            <div
              className={`${style.arrow} ${open && style.arrowOpen}`}
              onClick={() => {
                setOpen(!open);
              }}
            >
              <Down />
            </div>
            {open && (
              <div
                className={`${style.dropdown} ${
                  mobile === "left" ? style.dropdownMobileLeft : style.dropdownMobileRight
                }`}
              >
                {dropdowns.map((el, key) => {
                  return (
                    <div
                      key={key}
                      className={style.itemDropdown}
                      onClick={() => {
                        onSelect(el);
                        setOpen(false);
                      }}
                    >
                      <div className={style.dropdownText}>{el.name}</div>
                      {selected === el.id && (
                        <div className={style.selectedDropdown}>
                          <svg viewBox="0 -1.5 16 16" style={{ width: "12px", color: "#0053F1" }}>
                            <path d="M16 1.98L5.86 12.223l-1.289-1.304L0 6.297l1.29-1.313 4.57 4.622L14.703.667 16 1.98z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkSelect;
