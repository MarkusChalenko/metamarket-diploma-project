import cn from "classnames";
import { FC, useState } from "react";
import { default as ReactSelect } from "react-select";
import { OnChangeValue } from "react-select";
import makeAnimated from "react-select/animated";

import styles from "./Select.module.scss";
import { IOptions, ISelect } from "./select.interface";

const Select: FC<ISelect> = ({
  options,
  isMulti = false,
  field,
  isLoading,
  placeholder,
  error,
}): JSX.Element => {
  const animatedComponents = makeAnimated();

  const onChange = () => {
    return (newValue: OnChangeValue<IOptions, boolean> | unknown) =>
      field.onChange(
        isMulti
          ? (newValue as IOptions[]).map((item: any) => item.value)
          : (newValue as IOptions).value
      );
  };

  const getValue = () => {
    if (field.value) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value);
    } else {
      return isMulti ? [] : "";
    }
  };

  return (
    <div className={cn(styles.wrapper)}>
      <label>
        <span>{placeholder}</span>
        <ReactSelect
          classNamePrefix="custom-select"
          className={styles.select}
          options={options}
          value={getValue()}
          isMulti={isMulti}
          onChange={onChange()}
          components={animatedComponents}
        />
      </label>
      {error && <div className={styles.message}>{error.message}</div>}
    </div>
  );
};

export default Select;
