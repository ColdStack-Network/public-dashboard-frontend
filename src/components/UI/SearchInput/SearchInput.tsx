import React, { useState } from "react";
import style from "./SearchInput.module.scss";
import SvgSearch from "../../../icons/Search";
import SvgCloseIcon from "../../../icons/Close";

interface IProps {
  onSearch: (val: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value: string;
  onClear: () => void;
}
/*interface IPropsMobile{
  onSearch: (val: string)=>void,
  onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void,
  onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>)=>void,
  value: string
}*/
const SearchInput: React.FC<IProps> = ({ onSearch, onChange, onKeyUp, value, onClear }: IProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={style.container}>
      <div
        className={style.searchIcon}
        onClick={() => {
          onSearch(value);
        }}
      >
        <SvgSearch />
      </div>
      <input
        type="text"
        className={style.input}
        value={value}
        onChange={onChange}
        placeholder={"Search"}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setTimeout(() => setFocused(false), 500);
        }}
        onKeyUp={onKeyUp}
      />
      {focused && (
        <div className={style.searchIconClose} onClick={onClear}>
          <SvgCloseIcon />
        </div>
      )}
    </div>
  );
};

export default SearchInput;

interface IMobileProps {
  onSearch: (val: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value: string;
  isOpen: boolean;
}

const MobileSearch: React.FC<IMobileProps> = ({ onSearch, onChange, onKeyUp, value, isOpen }: IMobileProps) => {
  return (
    <input
      type="text"
      className={`${style.mobileInput} ${!isOpen ? style.mobileInputHidden : ""}`}
      value={value}
      onChange={onChange}
      onKeyUp={onKeyUp}
      placeholder={"Search"}
    />
  );
};

export { MobileSearch };
