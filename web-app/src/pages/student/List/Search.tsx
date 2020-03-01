import React, { useState, useEffect, CSSProperties } from 'react';
import { Select } from 'antd';

const { Option } = Select;

export interface IOption {
  name: string;
}

export interface ISearchProp {
  fetch: Function;
  fetchOptions: Function;
  options?: IOption[];
  placeholder?: string;
  style?: CSSProperties;
}

function SearchLine({ fetch, fetchOptions, options, placeholder, style }: ISearchProp) {
  const [value, setValue] = useState<string | undefined>(undefined);

  const handleSearch = (v: string) => {
    fetchOptions(v);
  };

  const handleChange = (v: string) => {
    setValue(v);
  };

  useEffect(() => {
    fetch(value);
  }, [value]);

  const optionsEles = options?.map(d => <Option key={d.name}>{d.name}</Option>);
  return (
    <Select
      showSearch
      allowClear
      value={value}
      placeholder={placeholder}
      style={style}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
    >
      {optionsEles}
    </Select>
  );
}

export default SearchLine;
