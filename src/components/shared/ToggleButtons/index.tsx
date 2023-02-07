import React, { useEffect, useState } from "react";
import style from "./style.module.scss";

interface IProps {
  options: string[];
  selected?: string;
  onClick: (option: string) => void;
}

const ToggleButtons: React.FC<IProps> = ({ options, selected, onClick }: IProps) => {
  const [selectedOption, setSelectedOption] = useState(selected);

  return (
    <div className={style.container}>
      {options.map((option, key) => (
        <div
          key={key}
          className={`${style.option} ${selectedOption === option ? style.selected : ""}`}
          onClick={() => {
            setSelectedOption(option);
            onClick(option);
          }}
        >
          {option}
          {selectedOption === option ? " ✓" : ""}
        </div>
      ))}
    </div>
  );
};

export default ToggleButtons;
