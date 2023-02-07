import React, { useState } from "react";
import style from "./buttonOval.module.scss";
import clsx from "clsx";
import { PopupButton } from "@typeform/embed-react";
import { Link } from "react-router-dom";

interface iTheme {
  size: string;
  reactRouterNav?: boolean;
  color: string;
  text: string;
  href?: string;
  typeFormId?: string;
  onClick?: () => void;
  search?: string[];
  hidden?: Record<string, any>;
}

const ButtonOval = ({ size, color, text, href, onClick, typeFormId, reactRouterNav, search, hidden }: iTheme) => {
  const [buttonState, setButtonState] = useState(``);
  const onMouseLeave = () => {
    setButtonState(`leave`);
  };
  const onMouseEnter = () => {
    setButtonState(`hover`);
  };

  return (
    <>
      {!typeFormId && (
        <div
          onMouseLeave={() => onMouseLeave()}
          className={clsx(
            buttonState === "leave" && style.wrapperLeave,
            buttonState === "hover" && style.wrapperHover,
            style.wrapper,
            color === "white" && style.wrapperWhite,
            color === "blue" && style.wrapperBlue,
            color === "green" && style.wrapperGreen,
            size === "small" && style.wrapperSmall,
            size === "medium" && style.wrapperMedium,
            size === "big" && style.buttonBig,
            color === "white" && style.wrapperWhite
          )}
        >
          {reactRouterNav ? (
            <Link
              to={href}
              onMouseLeave={() => onMouseLeave()}
              onMouseEnter={() => onMouseEnter()}
              className={clsx(
                buttonState === "leave" && style.buttonLeave,
                buttonState === "hover" && style.buttonHover,
                style.button,
                size === "small" && style.buttonSmall,
                size === "medium" && style.buttonMedium,
                size === "big" && style.buttonBig,
                color === "white" && style.buttonWhite,
                color === "blue" && style.buttonBlue,
                color === "green" && style.buttonGreen
              )}
            >
              {text}
            </Link>
          ) : (
            <a
              onMouseLeave={() => onMouseLeave()}
              onMouseEnter={() => onMouseEnter()}
              href={href}
              onClick={onClick}
              className={clsx(
                buttonState === "leave" && style.buttonLeave,
                buttonState === "hover" && style.buttonHover,
                style.button,
                size === "small" && style.buttonSmall,
                size === "medium" && style.buttonMedium,
                size === "big" && style.buttonBig,
                color === "white" && style.buttonWhite,
                color === "blue" && style.buttonBlue,
                color === "green" && style.buttonGreen
              )}
            >
              {text}
            </a>
          )}

          {typeFormId && (
            <PopupButton
              id={typeFormId}
              transitiveSearchParams={search || []}
              hidden={hidden || {}}
              className={clsx(
                buttonState === "leave" && style.buttonLeave,
                buttonState === "hover" && style.buttonHover,
                style.button,
                size === "small" && style.buttonSmall,
                size === "medium" && style.buttonMedium,
                size === "big" && style.buttonBig,
                color === "white" && style.buttonWhite,
                color === "blue" && style.buttonBlue,
                color === "green" && style.buttonGreen
              )}
            >
              {text}
            </PopupButton>
          )}
          <div
            className={`
            ${style.backgroundRound}
            ${color === "white" ? style.backgroundRoundWhite : ""}
            ${color === "blue" ? style.backgroundRoundBlue : ""}
            ${color === "green" ? style.backgroundRoundGreen : ""}
           `}
          />
        </div>
      )}

      {typeFormId && (
        <div
          className={clsx(
            style.wrapperHover,
            style.wrapper,
            color === "white" && style.wrapperWhite,
            color === "blue" && style.wrapperBlue,
            color === "green" && style.wrapperGreen,
            size === "small" && style.wrapperSmall,
            size === "medium" && style.wrapperMedium,
            size === "big" && style.buttonBig,
            color === "white" && style.wrapperWhite
          )}
        >
          <PopupButton
            id={typeFormId}
            transitiveSearchParams={search || []}
            hidden={hidden || {}}
            className={clsx(
              style.buttonHoverTypeform,
              style.button,
              size === "small" && style.buttonSmall,
              size === "medium" && style.buttonMedium,
              size === "big" && style.buttonBig,
              color === "white" && style.buttonWhite,
              color === "blue" && style.buttonBlue,
              color === "green" && style.buttonGreen
            )}
          >
            {text}
          </PopupButton>
          <div
            className={`
            ${style.backgroundRound}
            ${color === "white" ? style.backgroundRoundWhite : ""}
            ${color === "blue" ? style.backgroundRoundBlue : ""}
            ${color === "green" ? style.backgroundRoundGreen : ""}
           `}
          />
        </div>
      )}
    </>
  );
};

export default ButtonOval;
