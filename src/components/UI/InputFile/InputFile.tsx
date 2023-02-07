import React, { FC, useRef } from "react";
import style from "./inputFile.module.scss";

export interface IInputFileProps {
  id: string;
  onInputChangeHandler: (fileList: FileList) => void;
  acceptTypes?: string[];
}

export const InputFile: FC<IInputFileProps> = ({ id, onInputChangeHandler, children }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const onChangeFile = (fileList: FileList | null) => fileList && onInputChangeHandler(fileList);

  const open = () => {
    const $input = inputFileRef.current;
    $input?.click();
  };

  return (
    <div className={style.wrapperButton}>
      <label onClick={open} htmlFor={id} className={style.container}>
        <div>{children}</div>
      </label>
      <input
        type="file"
        id={id}
        ref={inputFileRef}
        multiple={true}
        hidden={true}
        onChange={(e) => onChangeFile(e?.target?.files)}
      />
    </div>
  );
};
