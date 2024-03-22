import { useDebounce } from "hooks";
import { setSearchText } from "libs/redux/slices/global.slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function useSearch(searchValue = "", onClear = () => {}) {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.global.searchText);
  const debounced = useDebounce(searchValue, 500);

  useEffect(() => {
    if (searchText.length === 0) {
      onClear();
    }
  }, [searchText]);

  useEffect(() => {
    dispatch(setSearchText(searchValue));
  }, [debounced]);
}

export default useSearch;
