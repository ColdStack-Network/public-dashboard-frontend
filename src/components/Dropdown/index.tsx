import React, { useEffect, useRef, useState } from "react";
import style from "./dropdown.module.scss";
import SvgExpandDown from "../../icons/Expand_down";
import clsx from "clsx";

interface IItem {
  value: string;
  label: string;
}

interface IItemProps {
  item: IItem;
  onClick: () => void;
}

interface DropdownProps {
  items: Array<IItem>;
  placeholder: string;
  onSelect?: (value?: string) => void;
  defaultValue?: IItem;
  disabled: boolean;
}

const Item = ({ item, onClick }: IItemProps) => (
  <div className={style.dropdownItem} onClick={onClick}>
    {item.label}
  </div>
);

const Dropdown: React.FC<DropdownProps> = ({
  items = [],
  placeholder = "Select item",
  onSelect,
  defaultValue,
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(placeholder);
  const dropRefDropdown = useRef<HTMLDivElement>(null);
  const dropRefDropdownBody = useRef<HTMLDivElement>(null);

  function handleClick(e: MouseEvent) {
    const clickTarget = e.target as HTMLElement;
    if (dropRefDropdown && dropRefDropdown?.current) {
      if (!dropRefDropdownBody?.current?.contains(clickTarget) && !dropRefDropdown?.current?.contains(clickTarget)) {
        setOpen(false);
      }
    }
  }

  const selectItem = ({ value, label }: IItem) => {
    setOpen(false);
    setTitle(label);

    if (onSelect) {
      onSelect(value);
    }
  };

  useEffect(() => {
    if (defaultValue) {
      selectItem(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className={clsx(disabled && style.disabled)}>
      <div className={style.dropdown} ref={dropRefDropdown} onClick={() => setOpen(!open)}>
        {title}
        <SvgExpandDown rotate={open} />
      </div>
      {open && (
        <div
          className={style.dropdownBody}
          ref={dropRefDropdownBody}
          style={{
            width: dropRefDropdown.current?.getBoundingClientRect().width,
          }}
        >
          {items.map((item, key) => (
            <Item item={item} key={key} onClick={() => selectItem(item)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
