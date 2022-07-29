import { addLikedToSnippet, getDataSnippetById } from "../../../models/snippets.server";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import Prism from "prismjs";

export const loader = async({params}) =>{
  console.log("llega por id")
  const snippetId = params.snippetId;
  const snippetData = await getDataSnippetById(snippetId);
  return json({snippetData})
}

export const action = async ({request, params}) => {
  const formData = await request.formData();
  const state = formData.get("state");
  const snippetId = params.snippetId;
  console.log("snippetID ", snippetId)
  console.log("state ", state)
  await addLikedToSnippet(snippetId, state)
  return null
}

const SnippetDetail = () => {
  const submit = useSubmit();
  const { snippetData } = useLoaderData();
  const [ liked, setLike] = useState(snippetData.liked > 0);

  console.log(liked)
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div className="flex w-full">
      <div className="w-full mr-4 ml-4 mt-8">
        <h2 className="font-medium border-b-2 text-2xl">{snippetData.title}</h2>
        <span>{`By ${snippetData.userID}`}</span>
        <p className="text-base">{snippetData.description}</p>
        <div>
          <pre>
            <code className={`language-${snippetData.languageID}`}>
            {snippetData.codeSnippet}
            </code>
          </pre>

          <div className="w-full flex">
            <div className="w-2/5" />

            <Form className="w-3/5 flex gap-1 place-content-end"
            onSubmit={(e) => {
              submit(e.currentTarget)
            }}
              method="POST" action="#">

              <button type="submit" className="w-2/5 h-10 flex justify-center items-center place-content-around border-transparent bg-gray-300 rounded rounded-3xl md:hover:opacity-70" onClick={()=> setLike(liked ? !liked : liked)}>
                <img src={`/love-like-${liked ? "filled" : "outline"}.svg`} className="h-5 w-5"  alt="Love Icon"/>
                <span className="text-gray-500 font-medium">{ liked ? "Liked" : "Like"}</span>
              </button>

              <button type="submit" className="w-2/5 h-10 flex justify-center items-center place-content-around border-transparent bg-gray-300 rounded rounded-3xl md:hover:opacity-70" onClick={()=> setLike(liked ? !liked : liked)}>
                <img src={`/love-like-${liked ? "filled" : "outline"}.svg`} className="h-5 w-5"  alt="Love Icon"/>
                <span className="text-gray-500 font-medium">{ liked ? "Liked" : "Like"}</span>
              </button>

            </Form>


           {/* <button type="submit" onClick={()=> setLike(liked === "liked" ? "unlike" : "liked")} id="like"
                    className={`btn btn-lg btn-block btn-shared btn-like flex ${liked === "liked" ? "liked" : ""}`}>
              <img src="/clipboard.svg" className="h-5 w-5"  alt="Arrow Right Icon"/>
              <span className="text-base">
                {
                  liked
                }
              </span>
            </button>*/}

          </div>

        </div>
      </div>
    </div>
  )
}
export default SnippetDetail;