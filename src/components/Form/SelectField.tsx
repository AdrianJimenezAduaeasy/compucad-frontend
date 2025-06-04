import Select from "react-select";


const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#fff" : "rgb(243 244 246)",
    borderColor: state.isFocused ? "#000" : "#000",
    boxShadow: state.isFocused ? "0 0 0 1px #000" : "none",
    "&:hover": {
      borderColor: state.isFocused ? "#000" : "#000",
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "gray" : "#fff",
    color: state.isFocused ? "#fff" : "#000",
    "&:hover": {
      backgroundColor: "gray",
      color: "#fff",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    borderColor: "gray",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#000",
  }),
};


function SelectField({ id, label, value, setValue, options, ...props }: any) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-900 dark:text-gray-200">
        {label}
      </label>
      <Select
      styles={customStyles}
        placeholder={label}
        id={id}
        name={id}
        
        value={options.find((option: any) => option.value === value)}
        onChange={(e: any) => setValue(e.value)}
        options={options} 
        className=""
        {...props}
      />
    </div>
  );
}

export default SelectField;
