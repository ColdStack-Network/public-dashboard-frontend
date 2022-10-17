import React, {useMemo} from "react";
import queryString from 'query-string'
import {useLocation} from 'react-router-dom'
import FilePage from "../FilePage/FilePage";
import BucketPage from "../BucketPage/BucketPage";

const BucketFilePage: React.FC<any> = (props: any) => {


  console.log("BucketFilePage props", props)
  const {search, pathname} = useLocation()
  const query = queryString.parse(search);
  // console.log("query", query, "window.location", window.location);

  const file = query?.file as string || "";
  const nameBucket = useMemo(() => {
    return pathname.split("/")?.[2]
  }, [pathname]);
  const pathFolder = useMemo(() => {
    return pathname.slice(nameBucket.length + 10);
  }, [nameBucket, pathname])


  return(
    <React.Fragment>
      {
        file?.length > 0 ? <FilePage data={{file, nameBucket, pathFolder}}/>
        : <BucketPage data={{nameBucket, pathFolder}} />
      }
    </React.Fragment>
  )
}

export default BucketFilePage;
