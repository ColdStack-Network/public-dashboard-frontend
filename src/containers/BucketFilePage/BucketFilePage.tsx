import React, { useMemo } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import FilePage from "../FilePage/FilePage";
import BucketPage from "../BucketPage/BucketPage";

const BucketFilePage: React.FC = () => {
  const { search, pathname } = useLocation();
  const path: string = pathname;
  const query = queryString.parse(search);
  const file = String(query?.file || "");
  const nameBucket = useMemo(() => path.split("/")?.[3], [path]);
  const pathFolder = useMemo(() => {
    return path.slice(nameBucket.length + "/dashboard/buckets/".length + 1);
  }, [nameBucket, path]);

  return (
    <React.Fragment>
      {file?.length > 0 ? (
        <FilePage data={{ file, nameBucket, pathFolder }} />
      ) : (
        <BucketPage data={{ nameBucket, pathFolder }} />
      )}
    </React.Fragment>
  );
};

export default BucketFilePage;
