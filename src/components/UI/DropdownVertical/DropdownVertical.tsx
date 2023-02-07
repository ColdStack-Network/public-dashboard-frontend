import React, { useMemo, useRef, useState } from "react";
import style from "./dropdownVertical.module.scss";
import VerticalAlt from "../../../icons/VerticalAlt";
import clsx from "clsx";
import { useOnClickOutside } from "helpers/hooks/useOnClickOutside";

export interface DropItem {
  icon?: React.ReactNode;
  text: JSX.Element | string | number | null;
  isAccent?: boolean;
  onClick?: () => void;
  section: 1 | 2;
  keepOpenedAfterClick?: boolean;
}

interface IProps {
  dropdowns: DropItem[];
}
const DropdownVertical: React.FC<IProps> = ({ dropdowns }) => {
  const [open, setOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const dropPanelRef = useRef<HTMLDivElement>(null);
  const [renderPosition, setRenderPosition] = useState<"bottom" | "top">("bottom");

  const handleOpen = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const position = target.getBoundingClientRect().bottom;
    setOpen((prev) => !prev);

    if (window.innerHeight > position + 200) {
      return setRenderPosition("bottom");
    }
    setRenderPosition("top");
  };

  useOnClickOutside(dropPanelRef, () => setOpen(false));

  const handleClick = (item: DropItem) => {
    return () => {
      const { onClick, keepOpenedAfterClick } = item;
      onClick?.();
      if (!keepOpenedAfterClick) setOpen(false);
    };
  };

  const dropdownList = useMemo(() => {
    return (
      <div
        className={clsx(style.dropdown, renderPosition === "top" ? style.topPosition : style.bottomPosition)}
        ref={dropPanelRef}
      >
        <div className={style.section}>
          {dropdowns.map((item, i, arr) => {
            if (i > 0 && item.section !== arr[i - 1].section) {
              return (
                <React.Fragment key={i}>
                  <div className={style.border} />
                  <div className={style.item} onClick={handleClick(item)}>
                    {item.icon && <div className={style.icon}>{item.icon}</div>}
                    <div className={clsx(style.text, item.isAccent && style.textAccent)}>{item.text}</div>
                  </div>
                </React.Fragment>
              );
            }
            return (
              <div key={i} className={style.item} onClick={item.onClick}>
                {item.icon && <div className={style.icon}>{item.icon}</div>}
                <div className={clsx(style.text, item.isAccent && style.textAccent)}>{item.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [dropdowns, renderPosition]);

  return (
    <div className={style.container}>
      <div className={style.iconMain} ref={dropRef} onClick={handleOpen}>
        <VerticalAlt active={open} />
      </div>
      {open && dropdownList}
    </div>
  );
};
export default DropdownVertical;
