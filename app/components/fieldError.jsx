import { useActionData } from "@remix-run/react";


const ServerError = ({name}) => {
  const errors =  useActionData()?.errors;
  const message = errors?.find(({ path }) => path[0] === name)?.message
  return (
    <>
      { message ? (
        <div className="mt-1 text-red-500" >{message}</div>
      ) : null
      }
    </>
  )
}

const FieldError = ({name, errors}) => {
  const clientErrorMessages = errors[name]?.message

  return (
    <>
      { clientErrorMessages ? (<div className="mt-1 text-red-500" >{clientErrorMessages}</div>) :
      <ServerError name={name}/>
      }
    </>
  )
}

export default FieldError;