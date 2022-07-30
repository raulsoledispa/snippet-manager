import { Link } from "@remix-run/react";
import { useEffect } from "react";
import Prism from "prismjs";
import { formatEmailToUsername } from "../utils";


const CardComponent = ({ title, description, publishedAt, id, code, language, author}) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div key={id} className="p-6 w-full rounded-xl shadow-lg flex flex-col items-center mb-1">
      <div className="w-full">
        <h3 className="text-left text-2xl font-medium text-black font-extrabold">{title}</h3>
      </div>
      <div className="w-full mb-4">
        <p className="text-left text-gray-400 font-bold italic">{language.description}</p>
      </div>
      <div className="w-full">
        <p className="tex-left">{description}</p>
      </div>

      <Link
        className="flex items-center justify-center w-1/2 px-4 py-2 text-base font-medium text-white
                no-underline bg-blue-600 md:bg-black border border-transparent rounded-md
                bg-black shadow-lg
                mt-4 text-white hover:bg-blue-600
                md:py-3 md:text-lg md:px-10 md:leading-6"
        to={`/dashboard/snippets/${id}/details`}>View Snippet</Link>

      <div className="w-full flex place-content-between items-center mt-4 border-t-2">
          <div className="w-1/2 text-sm text-black">{formatEmailToUsername(author.email)}</div>
        <button type="submit" className="w-1/2 h-10 flex justify-end items-center
        place-content-around border-transparent bg-transparent rounded rounded-3xl md:hover:opacity-70">
          <img src="/love-like-filled.svg" className="h-5 w-5 mr-1"  alt="Love Icon"/>
          <span className="text-gray-500 font-medium">{11}</span>
        </button>
      </div>

    </div>
  )
}


export default CardComponent;