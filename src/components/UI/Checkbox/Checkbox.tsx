import React from "react";
import style from "./checkbox.module.scss";
import {
  SvgCheckboxChecked,
  SvgCheckboxUnChecked,
  SvgCheckboxCheckedGray,
  SvgCheckboxCheckedDisabled,
} from "../../../icons/Checkbox";
import clsx from "clsx";

interface IProps {
  checked: boolean;
  name: string;
  label?: string;
  id: string | number;
  onChange?: (event: React.ChangeEvent) => void;
  isGray?: boolean;
  disabled?: boolean;
}
const Checkbox: React.FC<IProps> = ({ checked, name, id, onChange, label, isGray, disabled }: IProps) => {
  return (
    <label className={clsx(style.container, disabled && style.disabled)}>
      <input
        className={style.input}
        type="checkbox"
        id={id?.toString()}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      {checked ? (
        disabled ? (
          <SvgCheckboxCheckedDisabled />
        ) : isGray ? (
          <SvgCheckboxCheckedGray />
        ) : (
          <SvgCheckboxChecked />
        )
      ) : (
        <SvgCheckboxUnChecked />
      )}
      {label ? <div className={style.label}> {label} </div> : ""}
    </label>
  );
};
export default Checkbox;
