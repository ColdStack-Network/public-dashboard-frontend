import React, {useEffect} from 'react';
import style from './storageClassesPage.module.scss'
import TableStorageClasses from "../../components/Table/TableStorageClasses/TableStorageClasses";
import SvgInfo from "../../icons/Info";
/*import {getStorageClassesInfo} from "../../modules/account/actions";
import {TStore} from "../../reducers";
import {useDispatch} from "react-redux";
*/

const StorageClassesPage: React.FC<any> = () => {

  const isLoading = false;
  //const dispatch = useDispatch();
  useEffect(()=>{
    //dispatch(getStorageClassesInfo());
  },
    //eslint-disable-next-line
    [])

  //const list = useSelector((state: TStore)=>state.account.storageClassesInfo);
  const list = [{"name":"Minimum capacity charge per object","Standard":"128 KB","Intelligent-Tiering":"128 KB","Standard-IA":"1,024 KB","Glacier Instant Retrieval":"10 Mb","Glacier Flexible Retrieval":"10 Mb","Glacier Deep Archive":"10 Mb"},{"name":"Minimum storage duration charge","Standard":"30 days","Intelligent-Tiering":"30 days","Standard-IA":"30 days","Glacier Instant Retrieval":"90 days","Glacier Flexible Retrieval":"90 days","Glacier Deep Archive":"180 days"},{"name":"Storage fee, per Gb","Standard":"$0.004","Intelligent-Tiering":"$0.0035","Standard-IA":"$0.003","Glacier Instant Retrieval":"$0.002","Glacier Flexible Retrieval":"$0.0017","Glacier Deep Archive":"$0.00099"},{"name":"Bandwith fee, per Gb","Standard":"$0.001","Intelligent-Tiering":"$0.001","Standard-IA":"$0.0015","Glacier Instant Retrieval":"$0.037","Glacier Flexible Retrieval":"$0.032","Glacier Deep Archive":"$0.015"}];

  return (
    <React.Fragment>
      {!isLoading && (
        <React.Fragment>
          <div className={`${style.headerRow} ${style.headerRowCenter}`}>
            <div className={`${style.pageTitleCommon} ${style.pageTitleStorage}`}>
              Storage Classes
            </div>
          </div>
          <div className={style.containerWarning}>
            <div className={style.left}>
              <div className={style.icon}>
                <SvgInfo/>
              </div>
              <div className={style.text}>
                Please Note: For our Public Beta stage, only the Standard Storage Class is supported. Prices may change depending on market conditions and further project development.
              </div>
            </div>
          </div>
          <div className={style.content}>
            <TableStorageClasses data={list} />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default StorageClassesPage;

