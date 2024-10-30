import { useEffect, useState } from "react";
import Select from "react-select";

interface CountryOption {
  label: string;
  value: string;
}

interface Props {
  formik: any;
}

const CountrySelect = ({ formik }: Props) => {
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    null
  );

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        const initialCountry = data.countries.find(
          (country: CountryOption) => country.value === formik.values.country
        );
        setSelectedCountry(initialCountry || null);
      });
  }, []);

  useEffect(() => {
    const selected = countries.find(
      (country) => country.label === formik.values.country
    );
    setSelectedCountry(selected || null);
  }, [formik.values.country, countries]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "none" : "none",
      borderRadius: "8px",
      boxShadow: state.isFocused ? "none" : "none",
      backgroundColor: "var(--text-background)",
      height: "55px",
      "&:hover": {
        borderColor: "none",
      },
      cursor: "pointer",
    }),
  };

  return (
    <Select
      options={countries}
      value={selectedCountry}
      onChange={(selectedOption) => {
        setSelectedCountry(selectedOption);
        formik.setFieldValue(
          "country",
          selectedOption ? selectedOption.label : ""
        );
      }}
      isClearable={true}
      styles={customStyles}
    />
  );
};

export default function CountryDropDown({ formik }: Props) {
  return (
    <div className="App">
      <CountrySelect formik={formik} />
    </div>
  );
}
