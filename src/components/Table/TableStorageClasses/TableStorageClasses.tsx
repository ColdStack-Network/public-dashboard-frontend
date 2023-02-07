import React, { useEffect, useMemo, useState } from "react";
import style from "../table.module.scss";
import { IStorageClassesListItem } from "../types";
import { isFull } from "../../../helpers/common";

interface IProps {
  data: IStorageClassesListItem[];
}

const TableStorageClasses: React.FC<IProps> = ({ data }: IProps) => {
  const [width, setWidth] = useState(null as null | number | string);
  const resizeHandler = () => {
    const w = window.innerWidth;
    if (w < 1440 && w >= 768) {
      setWidth(w - 80 - 50);
    } else if (w < 768) {
      setWidth(w - 30);
    } else {
      setWidth("100%");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const columnNames = useMemo(() => {
    if (isFull(data)) {
      return data.map((el) => el.name);
    } else {
      return [];
    }
  }, [data]);

  const itemsFormed = useMemo(() => {
    let mas = [] as any;
    if (!isFull(data)) return [];
    const keys = Object.keys(data[0]);
    /* [Glacier Deep Archive, Glacier Flexible Retrieval, Glacier Instant Retrieval, Intelligent-Tiering, Standard, Standard-IA, name ]*/
    for (let i = 0; i < keys.length; i++) {
      const nameTariff = keys[i];

      mas[i] = {
        name: nameTariff,
      };
      for (let j = 0; j < data.length; j++) {
        mas[i][data[j]?.name] = data[j][nameTariff];
      }
    }
    const idx = mas.findIndex((el) => el?.name === "name");
    if (idx >= 0) {
      mas.splice(idx, 1);
    }

    return mas;
  }, [data]);

  return (
    <div className={style.tableWrapper}>
      {width ? (
        <div className={style.scroll} style={{ maxWidth: width }}>
          <div className={style.table}>
            <div className={style.tableHeadRow}>
              <div className={style.tableHeadItem} />
              {data &&
                data.map((el) => (
                  <div key={el?.name} className={`${style.tableHeadItem} ${style.tableTdCenter}`}>
                    {el?.name}
                  </div>
                ))}
            </div>
            {itemsFormed &&
              itemsFormed.map((item) => {
                return <TableRow key={item.name} item={item} columnNames={columnNames} />;
              })}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TableStorageClasses;

const TableRow = ({ item, columnNames }) => {
  const width = useMemo(() => {
    if (!isFull(columnNames)) {
      return "20%";
    }
    const count = columnNames?.length;
    return `${100 / (count + 1)}%`;
  }, [columnNames]);
  return (
    <div className={style.tableRow}>
      <div className={`${style.tableTd}`} style={{ width: width }}>
        {item.name}
      </div>
      {columnNames.map((key) => {
        return (
          <div key={item[key]} className={`${style.tableTd} ${style.tableTdCenter}`} style={{ width: width }}>
            {item[key]}
          </div>
        );
      })}
    </div>
  );
};
