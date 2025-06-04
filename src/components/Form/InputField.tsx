
function InputField({ id, label, value, setValue, type = "text", ...props }: any) {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-900 dark:text-gray-200">
          {label}
        </label>
        <input
          id={id}
          name={id}
          accessKey={id}
          type={type}
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
          className="bg-gray-100 appearance-none border-2 border-black rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black"
          {...props}
        />
      </div>
    );
  }

  export function InputFieldTextArea({ id, label, value, setValue, type = "text", ...props }: any) {
    return (
      <div className="col-span-2">
        <label htmlFor={id} className="block text-sm font-medium text-gray-900 dark:text-gray-200">
          {label}
        </label>
        <textarea
          id={id}
          name={id}
          accessKey={id}
          type={type}
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
          className="bg-gray-100 appearance-none border-2 border-black rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black"
          {...props}
        />
      </div>
    );
  }

  export function InputFieldCheckbox({ id, label, value, setValue, ...props }: any) {
    return (
      <div className="col-span-1">
        <label htmlFor={id} className="block text-sm font-medium text-gray-900 dark:text-gray-200">
          {label}
        </label>
      
        <div className="flex items-center justify-center h-10">
        <input
          id={id}
          name={id}
          accessKey={id}
          type="checkbox"
          checked={value}
          onChange={(e: any) => setValue(e.target.checked)}
          className="bg-gray-100 border-2  border-black rounded w-8 h-8 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black"
          {...props}
        /> 
        </div>
      </div>
    );
  }

  export default InputField;