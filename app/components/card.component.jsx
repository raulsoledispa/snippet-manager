import { Link, NavLink } from "@remix-run/react";


const CardComponent = ({ title, description, createdAt, id}) => {

  return (
    <Link to={`/dashboard/snippets/${id}/details`} key={id} className="p-6 w-full rounded-xl shadow-lg flex flex-col items-center">
      <h3 className="text-xl font-medium text-black font-extrabold">{title}</h3>
      <p>{description}</p>
      <div className="flex">
        <div className="flex shrink-0 items-center">
          <img className="h-6 w-6" src="/github.svg" alt="Avatar" />
        </div>
        <div>
          <div className="text-sm text-black">{title}</div>
          <p className="text-sm text-slate-500">{createdAt}</p>
        </div>
      </div>
    </Link>
  )
}


export default CardComponent;