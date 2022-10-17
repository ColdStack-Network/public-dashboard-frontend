import React from "react";
import style from "./searchBoxPanel.module.scss";
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { getSearchedFilesList } from "../../modules/buckets/actions";
import EmptySearchList from "../../components/EmptySearchList/EmptySearchList";
import SvgEmptySearchFiles from "../../icons/EmptySearchFiles";

const SearchBoxItem = ({ object, close }) => {
  let filePath = `${object.Key !== object.FileName ? object.Key.replace(`/${object.FileName}`, '') : ''}`;
  filePath = `${object.Bucket}/${filePath}`.replace(/\/$/, '');

  return (
    <Link
      className={style.link}
      to={`/buckets/${filePath}?file=${object.FileName}`}
      onClick={close}
    >
      <div className={style.searchBoxItem}>
        <div className={style.searchBoxFilePath}>
          {filePath}
        </div>
        <div className={style.searchBoxFileName}>
          {object.FileName}
        </div>
      </div>
    </Link>
  )
}

const SearchBoxPanel = ({ dropRef, items = [], searchValue, searchPage, close, onScroll }) => {
  const dispatch = useDispatch();

  const handleScroll = (e) => {
    const node = e.target;
    const bottom = node.scrollHeight - Math.floor(node.scrollTop) === node.clientHeight;

    if (bottom) {
      const page = searchPage + 1;

      dispatch(getSearchedFilesList({ filename: searchValue, pagination: { Page: page, PerPage: 10 } }));

      onScroll(page)
    }
  }

  return (
    <div className={style.dropdownPanel} ref={dropRef}>
      <div className={style.searchBox} onScroll={handleScroll}>
        {
          items?.length
            ?
            items.map((object, key) =>
              <SearchBoxItem object={object} key={key} close={close} />
            )
            :
            <EmptySearchList icon={<SvgEmptySearchFiles />}>
              No files were found...
            </EmptySearchList>
        }
      </div>
    </div>
  )
}

export default SearchBoxPanel;