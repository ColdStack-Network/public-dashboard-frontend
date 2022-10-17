import React, {useCallback} from 'react';
import SelectPagination from "./SelectPagination/SelectPagination";
import {SelectItemPagination} from "./SelectPagination/types";
import Pages from "./Pages/Pages";
import style from "./pagination.module.scss"

interface IProps {
 dropdowns?: SelectItemPagination[],
 valueDropdown?: SelectItemPagination,
 hasSelect: boolean,
 count: number,
 onClickPage: (page: number)=>void,
 activePage: any,
 onSelect: (option: SelectItemPagination)=>void,
}
const Pagination: React.FC<IProps > = ({dropdowns, hasSelect, count, onClickPage, onSelect, activePage, valueDropdown }: IProps) => {
  //const [perPage, setPerpage] = useState(dropdowns?.[0]?.id || 10000000)
  //const numberPages = count / perPage;
  const onSelectFunc = useCallback((a)=>{
    onSelect(a)
  }, [onSelect])

  if (count < 1) {
    return null
  }

  return(
    <div className={style.container}>
      {hasSelect && dropdowns && <SelectPagination items={dropdowns} value={valueDropdown} label={"Rows per page:"} onSelect={onSelectFunc}/> }
      <Pages onClickPage={onClickPage} activePage={activePage} pages={count}/>
    </div>
  )
}
export default Pagination;
