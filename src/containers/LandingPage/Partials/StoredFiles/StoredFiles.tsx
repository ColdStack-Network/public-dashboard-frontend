import React, { useState } from "react";
import CountUp from "react-countup";
import style from "./storedFiles.module.scss";
import { hideWidthCounter } from "helpers/common";

interface IStoredFiles {
  storedFiles: number;
  visible: boolean;
}

const StoredFiles = ({ storedFiles, visible }: IStoredFiles) => {
  const storedFilesNumber4 = storedFiles;
  const storedFilesNumber3 = storedFilesNumber4 - 70;
  const storedFilesNumber2 = storedFilesNumber4 - 1000;
  const storedFilesNumber1 = storedFiles - hideWidthCounter("1", storedFiles);
  const [roundStoredFiles, setRoundStoredFiles] = useState(1);
  const [startNumberStoredFiles, setStartNumberStoredFiles] = useState(storedFilesNumber1);
  const [endNumberStoredFiles, setEndNumberStoredFiles] = useState(storedFilesNumber2);
  const [durationStoredFiles, setDurationStoredFiles] = useState(2);

  const changeRound = (roundStoredFilesTemp) => {
    if (roundStoredFilesTemp === 1) {
      setStartNumberStoredFiles(storedFilesNumber2);
      setEndNumberStoredFiles(storedFilesNumber2);
      setRoundStoredFiles(2);
      setDurationStoredFiles(0.2);
    } else if (roundStoredFilesTemp === 2) {
      setStartNumberStoredFiles(storedFilesNumber2);
      setEndNumberStoredFiles(storedFilesNumber3);
      setRoundStoredFiles(3);
      setDurationStoredFiles(0.5);
    } else if (roundStoredFilesTemp === 3) {
      setStartNumberStoredFiles(storedFilesNumber3);
      setEndNumberStoredFiles(storedFilesNumber4);
      setRoundStoredFiles(4);
      setDurationStoredFiles(35);
    }
  };

  return (
    <div className={style.storedFiles}>
      <div className={style.storedFilesValue}>
        <div className={style.secondaryValue}>
          <CountUp
            className={style.countUpHide}
            start={hideWidthCounter("8", storedFiles)}
            end={hideWidthCounter("8", storedFiles)}
            duration={0}
            separator=" "
          />
          {visible && (
            <CountUp
              className={style.countUp}
              onEnd={roundStoredFiles < 5 ? () => changeRound(roundStoredFiles) : () => {}}
              start={startNumberStoredFiles}
              end={endNumberStoredFiles}
              duration={durationStoredFiles}
              separator=" "
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StoredFiles;
