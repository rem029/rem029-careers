import React from "react";
import Select, { ControlProps, OptionProps, SingleValue } from "react-select";
import { countries } from "countries-list";
import Image from "next/image";

type CountryOption = {
  value: string;
  label: string;
  flag: string;
};

const countryOptions: CountryOption[] = Object.entries(countries).map(
  ([code, country]) => ({
    value: code,
    label: country.name,
    flag: `https://flagcdn.com/16x12/${code.toLowerCase()}.png`,
  }),
);

const customSingleValue = ({ data }: { data: any }) => (
  <div className="flex items-center gap-2 absolute left-2">
    <Image
      src={data.flag}
      alt={data?.label || "single_value"}
      width={16}
      height={12}
    />
    <span>{data.label}</span>
  </div>
);

const customOption = (props: OptionProps<CountryOption>) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex items-center p-2 hover:bg-gray-100"
    >
      <Image
        src={data.flag}
        alt={data?.label || "custom_option_alt"}
        className="mr-2"
        width={16}
        height={12}
      />
      <span>{data.label}</span>
    </div>
  );
};

interface CountrySelectProps {
  value?: CountryOption | null;
  name?: string;
  onChange?: (selectedOption: SingleValue<CountryOption>, name?: string) => void;
  required?: boolean;
  disabled?: boolean;
}

export const controlOption = (props: ControlProps<CountryOption>) => {
  const { innerRef, innerProps, children } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={`flex flex-1 items-center justify-start text-xs input input-md max-md:input-sm input-bordered rounded-full w-full`}
    >
      {children}
    </div>
  );
};

const CountrySelect: React.FC<CountrySelectProps> = ({
  name,
  value,
  onChange,
  required,
  disabled,
}) => {
  return (
    <Select<CountryOption>
      options={countryOptions}
      value={value}
      onChange={(e) => onChange && onChange(e, name)}
      components={{
        Option: customOption,
        SingleValue: customSingleValue,
        Control: controlOption,
      }}
      name={name}
      classNamePrefix="country-select"
      required={required}
      isDisabled={disabled}
      isClearable
    />
  );
};

export default CountrySelect;
