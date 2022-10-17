import React from 'react';
import style from './dashboardCard.module.scss';
import SvgVerticalAlt from "../../../icons/VerticalAlt";
import SvgArrowTopDown from "../../../icons/ArrowTopDown";
import { Link } from 'react-router-dom'

export interface IDashboardCard{
  title: string,
  number: number,
  numberPostfix?: string,
  direction: boolean,
  link: string,
  setCardClick: (item: number)=>void,
  tabs: number

}

const DashboardCard: React.FC<IDashboardCard> = ({title, number, numberPostfix, direction, link, setCardClick, tabs}: IDashboardCard) =>{
  return (
    <div className={style.container}>
      <div className={style.inner}>
        <div className={style.titleCardRow}>
          <div className={style.title}>{title}</div>
          {link === '/buckets' && <Link to={link}><SvgVerticalAlt/></Link>}
          {link === '#analytics' && <a href={link}  onClick={() => setCardClick(tabs)}><SvgVerticalAlt/></a>}
        </div>
        <div className={style.bottomRow}>
          <div className={style.number}>
            <div className={style.numberValue}>
              {number}
            </div>
            { numberPostfix && <div className={style.numberPostfix}>{numberPostfix}</div> }
          </div>
          <div className={style.arrow}>
           <SvgArrowTopDown direction={direction} color={direction ? "#1FCF90" : "#FF002E"}/>
          </div>
        </div>
      </div>
    </div>
  )

}

export default DashboardCard;
