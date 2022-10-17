import React, {useMemo, useState} from 'react';
import style from "./pages.module.scss";
import {SvgArrowLeft, SvgArrowRight} from "../../../../icons/ArrowsLeftRight";


interface IProps {
  pages: number,
  activePage: number,
  onClickPage: (n: number)=>void;
}
const Pages: React.FC<IProps > = ({pages, activePage, onClickPage}: IProps) => {
 /* const pagesMas = useMemo(()=>{
    let mas = [] as number [];
    for (let i=0; i<4; i++){
      mas[i] = i+1;
    }
    if (pages >= 5){
      mas[4] = pages
    }
    return mas
  }, [pages])*/
  const [points, setPoints] = useState(false);
  const pagesMas = useMemo(()=>{
    let mas = [] as number [];
    for (let i=0; i< pages; i++){
      mas[i] = i+1;
    }
    if (pages > 5){
      let first;
      let last;
      if (activePage <=3){
        first = 1;
        last = 5;
        setPoints(true)
      }else{
        console.log("activePage + 4 <=pages", activePage + 4 <=pages);
        if (activePage + 2 >=pages){

          setPoints(false)
          first = pages-5;
          last = pages+1;
          console.log(first, last);
        }else {
          first = activePage - 2;
          last = Math.min((activePage + 2), pages)
          if (activePage + 2 < pages) {
            setPoints(true)
          } else {
            setPoints(false)
          }
        }
      }
      mas = mas.slice(first - 1, last)
    }else{
      setPoints(false)
    }
    return mas
  }, [pages, activePage])
  //console.log("pagesMas", pagesMas);
  return(
    <div className={style.container}>

      <div className={style.button}  onClick={
        ()=>{
          if (activePage - 1 > 0){
          onClickPage(activePage -1)}
        }
      }>
        <SvgArrowLeft/>
      </div>

      {/*{pagesMas.map((page, index, array)=>{
          if (index > 0 && array[index - 1] + 1 !== page){
            return <React.Fragment> <div className={style.button}>...</div> <div className={style.button}>{page}</div> </React.Fragment>
          }else{
            return  <div className={`${style.button} ${activePage === page ? style.buttonActive : ""}`}>{page}</div>
          }
      })}*/}
      {pagesMas.map((page, index, array)=>{
            return  <div className={`${style.button} ${activePage === page ? style.buttonActive : ""}`} onClick={()=>{onClickPage(page)}}>{page}</div>
      })}
      {points && <div className={`${style.button} `}>...</div> }
      <div className={style.button}  onClick={
        ()=>{
          if (activePage + 1 <= pages){
            onClickPage(activePage + 1)}
        }
      }>
        <SvgArrowRight color={"main"}/>
      </div>

    </div>
  )
}
export default Pages;


