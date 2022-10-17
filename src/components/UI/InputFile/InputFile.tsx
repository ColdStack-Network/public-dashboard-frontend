import React, { FC, useRef } from "react";
import style from "./inputFile.module.scss";

export interface IInputFileProps {
  id: string;
  onInputChangeHandler: (evt: React.FormEvent<HTMLInputElement>) => void;
  children: any;
  acceptTypes?: string[];
}

export const InputFile: FC<IInputFileProps> = ({
                                                 id,
                                                 onInputChangeHandler,
                                                 children
                                               }) => {
  const inputFileRef = useRef(null);
  const onChangeFile = (files) => {
    //console.log("files", files);
    if (files) {
      onInputChangeHandler(files);
    }
  };

  return (
    <div className={style.wrapperButton}>
      <label htmlFor={id} className={style.container}>
        <div style={{pointerEvents: "none"}}>
        {children}
        </div>
      </label>
      <input
        type={"file"}
        id={id}
        ref={inputFileRef}
        multiple={true}
        hidden={true}
        onChange={(e) => {
          /*@ts-ignore*/
          onChangeFile(e?.target?.files);
        }}
      />
    </div>
  );
};

