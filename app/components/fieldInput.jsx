import FieldError from "./fieldError";
const FieldInput = ({ name, type, register, errors, label }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1">
      <input
        id={name}
        name={name}
        type={type}
        {...register(name)}
        className="w-full min-w-0 appearance-none rounded-md border-2 bg-white
               px-4 py-2 text-base text-gray-900 placeholder-gray-500
               focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-800 sm:text-sm"
      />
      <FieldError errors={errors} name={name} />
    </div>
  </div>
);

export default FieldInput;
