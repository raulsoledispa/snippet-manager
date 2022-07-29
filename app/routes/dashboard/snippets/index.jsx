import { Link, useLoaderData } from "@remix-run/react";
import { getSnippetsByUserId } from "../../../models/snippets.server";
import { getUserId } from "../../../session.server";
import { json } from "@remix-run/node";
import CardComponent from "../../../components/card.component";


export const loader = async ({request}) => {
  //const userID = await getUserId({request});
  //console.log("userID ", userID)
  const snippets = await getSnippetsByUserId(1);
  console.log(snippets)
  return json({ snippets })

}

export default function SnippetsPage() {
  const { snippets } = useLoaderData();
  return (
    <div>
      <Link to="new" className="text-blue-600 underline">New Snippet Code</Link>
      <h2>Snippet Codes</h2>
      {
        snippets.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {
              snippets.map(({snippetID, title, description, createdAt}) =>
                <CardComponent key={snippetID} title={title} description={description} createdAt={createdAt} id={snippetID} />
              )
            }
          </div>
        ) : <p>No tiene data</p>
      }
    </div>
  )
}