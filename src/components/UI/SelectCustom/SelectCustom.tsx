import React, { useState, useRef, useEffect } from "react";
import style from "./selectCustom.module.scss";
import { isFull, usePrevious } from "../../../helpers/common";
import { SelectItem } from "./types";
import SvgExpandDown from "../../../icons/Expand_down";

interface IProps {
  items: SelectItem[];
  onSelect: (item: SelectItem) => void;
  placeholder?: string;
  initEmpty?: boolean;
  tabindex?: number;
  initValue?: SelectItem;
  isError?: boolean;
  error?: string;
  label?: string;
  size?: string;
}

const SelectCustom: React.FC<IProps> = ({
  initValue,
  items,
  isError,
  error,
  tabindex,
  placeholder,
  onSelect,
  label,
  size,
  initEmpty,
}: IProps) => {
  const [value, _setValue] = useState(initValue || initEmpty ? null : items[0]);
  const valueRef = useRef(value);
  const [open, _setOpen] = useState(false);
  const openRef = useRef(open);
  const rootEl = useRef(null);
  const [activeEl, _setActiveEl] = useState(null as null | SelectItem);
  const activeElRef = useRef(activeEl);
  const prevValue = usePrevious(value);
  const setActiveEl = (data: SelectItem | null) => {
    // its for activeEl to be up to date in eventListener (keyDown)
    activeElRef.current = data;
    _setActiveEl(data);
  };

  useEffect(
    () => {
      document.addEventListener("click", handleClickOutside, true);
      window.addEventListener("keydown", handleKeyNav, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, false);
        document.removeEventListener("keydown", handleKeyNav);
      };
    },
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    if (!open && activeEl) {
      setActiveEl(null);
    }
  }, [open, activeEl]);
  const setOpen = (data) => {
    // its for openRef to be up to date in eventListener
    openRef.current = data;
    _setOpen(data);
  };

  const setValue = (data) => {
    valueRef.current = data;
    _setValue(data);
  };
  const prevInitValue = usePrevious(initValue);

  useEffect(
    () => {
      if (prevInitValue !== initValue) {
        setValue(initValue);
        if (open) {
          setOpen(false);
        }
      }
      /* if (isFull(value)) {
        updateData(value?.name)
      }*/
    },
    // eslint-disable-next-line
    [initValue]
  );

  const handleClickOutside = (event) => {
    if (
      !rootEl ||
      !rootEl?.current ||
      // @ts-ignore
      (rootEl?.current && !rootEl?.current?.contains(event.target))
    ) {
      setOpen(false);
    }
  };

  const handleKeyNav = (e) => {
    if (openRef.current) {
      const activeEl = activeElRef.current;
      // dropdown is open
      if (e.code === "ArrowUp" || e.code === "ArrowDown") {
        e.preventDefault();
      }
      if (e.code === "Enter" && activeEl) {
        setValue(activeEl);
        setOpen(false);
      }

      if (e.code === "ArrowUp" || e.code === "ArrowDown") {
        if (!activeEl) {
          if (isFull(items)) {
            setActiveEl(items[0]);
          }
        } else {
          // already exist activeEl
          const n = items.length - 1;
          const pos = items.findIndex((currentValue) => currentValue.id === activeEl?.id);
          if (e.code === "ArrowUp") {
            if (pos - 1 >= 0) {
              setActiveEl(items[pos - 1]);
            } else {
              setActiveEl(items[n]);
            }
          }
          if (e.code === "ArrowDown") {
            if (pos + 1 <= n) {
              setActiveEl(items[pos + 1]);
            } else {
              setActiveEl(items[0]);
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    // outer func onSelect
    if (value?.name) {
      onSelect(value);
    }
    /*if ( value?.name !== prevValue?.name) {
      updateData(value)}*/
  }, [value, onSelect, prevValue?.name]);

  const onClickItem = (el) => {
    setValue(el);
    setOpen(false);
  };

  return (
    <div className={style.container} ref={rootEl}>
      <div className={style.labelInput}>{label}</div>
      <div
        className={style.wrapper}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <input
          className={`${style.input} ${size ? style[`input${size}`] : ""}`}
          tabIndex={tabindex}
          /* isError={isError && !open}*/
          value={value?.name}
          placeholder={placeholder}
          readOnly={true}
          /*isSuccess={isFull(value?.id) && open === false}*/
        />
        <div className={`${style.arrowIcon} ${size ? style[`arrowIcon${size}`] : ""}`}>
          <SvgExpandDown rotate={open} />
        </div>
      </div>

      {/*{isError ?
        <div className={style.error}>
          <div className={style.errIcon}><SvgErrorInput/></div>
          <div className={style.errorText}>{error}</div>
        </div> : ""
      }*/}

      {open && (
        <div className={style.list}>
          {items.map((el, key) => {
            return (
              <ListItem
                key={key}
                onClick={() => {
                  onClickItem(el);
                }}
                onHover={() => {
                  if (open) {
                    setActiveEl(el);
                  }
                }}
                el={el}
                isActive={activeEl ? activeEl.id === el.id : undefined}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

interface PropsItem {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onHover?: (event: React.MouseEvent<HTMLDivElement>) => void;
  isActive?: boolean;
  el: SelectItem;
}

const ListItem: React.FC<PropsItem> = ({ isActive, el, onClick, onHover }) => {
  const refEl = useRef(null);
  useEffect(() => {
    if (isActive === true && refEl && refEl.current) {
      // @ts-ignore
      refEl?.current?.focus();
    }
    if (isActive === false && refEl && refEl.current) {
      // @ts-ignore
      refEl?.current?.blur();
    }
  }, [isActive, refEl]);
  return (
    <div
      className={`${style.listItemElement} ${isActive ? style.listItemElementActive : ""}`}
      style={{ background: isActive ? "" : "" }}
      tabIndex={-1}
      ref={refEl}
      onClick={onClick}
      onMouseEnter={onHover}
    >
      {el.name}
    </div>
  );
};

export default SelectCustom;
