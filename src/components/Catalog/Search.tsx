import React from 'react';
import { Input } from 'antd';
import { useSearchParams } from 'react-router-dom';
const { Search } = Input;

const SearchFilter = ({ callback }: { callback: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [search, setSearch] = useSearchParams();
  const onSearch = (value: string) => {
    if (value.trim()) {
      setSearch({
        ...Object.fromEntries(search),
        text: value.trim(),
      });
    } else {
      setSearch((params) => {
        params.delete('text');
        return params;
      });
    }

    callback(() => false);
  };
  return (
    <Search
      onSearch={onSearch}
      allowClear
      defaultValue={search.get('text')}
      placeholder="Catalog search. E.g. 'laptop'"
    ></Search>
  );
};

export default SearchFilter;
