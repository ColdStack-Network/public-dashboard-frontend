import React, {useState, useRef, useEffect} from 'react';
import style from './selectPagination.module.scss';
import {isFull} from "../../../../helpers/common";
import {SelectItemPagination} from "./types";
import SvgArrowDropdown from "../../../../icons/ArrowDropdown";

interface IProps {
  items: SelectItemPagination [];
  onSelect: (item: SelectItemPagination)=>void;
  value?: SelectItemPagination;
  label?: string;
}
const SelectPagination: React.FC<IProps > = ({value, items, onSelect, label}: IProps) => {

  const [open, _setOpen] = useState(false);
  const openRef = useRef(open);
  const rootEl = useRef(null);
  const [activeEl, _setActiveEl] = useState(null as null | SelectItemPagination);
  const activeElRef = useRef(activeEl);
  const setActiveEl = (data: SelectItemPagination | null) => {
    // its for activeEl to be up to date in eventListener (keyDown)
    activeElRef.current = data;
    _setActiveEl(data);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    window.addEventListener("keydown", handleKeyNav, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
      document.removeEventListener("keydown", handleKeyNav);
    };
  },
     // eslint-disable-next-line
    []);

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


 /* const setValue = (data) => {
    //console.log("setValue");
    valueRef.current = data;
    _setValue(data);
  };
  const prevInitValue = usePrevious(initValue);

  useEffect(() => {
    if (prevInitValue?.id !== initValue?.id || prevInitValue?.name !== initValue?.name) {
      //console.log("prevInitValue !== initValue", prevInitValue, initValue);
      setValue(initValue);
      if (open) {
        setOpen(false);
      }
    }
  },
     // eslint-disable-next-line
    [initValue, prevInitValue]);*/

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
        onSelect(activeEl);
        setOpen(false);
      }

      if (e.code === "ArrowUp" || e.code === "ArrowDown") {
        if (!activeEl) {
          if (isFull(items)) {
            setActiveEl(items[0]);
          }
        } else {
          //  activeEl already exist
          const n = items.length - 1;
          const pos = items.findIndex(
            (currentValue) => currentValue.id === activeEl?.id
          );
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
  //const prevValue = usePrevious(value);
  /*useEffect(() => {
    // outer func onSelect
    //console.log("value===", value, "prevValue", prevValue);

    if (value?.name !== prevValue?.name) { onSelect(value)}
    //if (value?.name) { onSelect(value)}

  }, [value, onSelect, prevValue]);*/

  const onClickItem = (el) => {
    onSelect(el);
    setOpen(false);
  };

  return(
    <div className={style.wrap}>
      <div className={style.labelInput}>
        {label}
      </div>
      <div className={style.container} ref={rootEl}>
        <div className={style.wrapper}
             onClick={() => {
               setOpen((prev)=>!prev);
             }}
        >
          <input
            className={style.input}
            value={value?.name}
            readOnly={true}
          />
          <div className={style.arrowIcon}>
            <SvgArrowDropdown/>
          </div>
        </div>

        {open && (
          <div className={style.list}>
            {
              items.map((el, key) => {
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
              })
            }
          </div>
        )}
      </div>
    </div>
  )
}

interface PropsItem {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onHover?: (event: React.MouseEvent<HTMLDivElement>) => void;
  isActive?: boolean;
  el: SelectItemPagination
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
    <div className={`${style.listItemElement} ${isActive ? style.listItemElementActive : ""}` }
         style={{background: isActive ? "" : ""}}
         tabIndex={-1}
         ref={refEl}
         onClick={onClick}
         onMouseEnter={onHover}
    >
      {el.name}
    </div>
  );
};

export default SelectPagination;

