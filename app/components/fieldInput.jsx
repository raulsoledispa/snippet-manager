import FieldError from "./fieldError";
const FieldInput = ({name, type, register, errors, label}) => (

    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        <input id={name} name={name} type={type}
               {...register(name)}
               className="w-full min-w-0 px-4 py-2 text-base text-gray-900
               placeholder-gray-500 bg-white border-2 rounded-md appearance-none
               sm:text-sm focus:outline-none focus:ring-1 focus:ring-gray-800 focus:placeholder-gray-400" />
        <FieldError errors={errors} name={name} />
      </div>
    </div>
  );

export default FieldInput