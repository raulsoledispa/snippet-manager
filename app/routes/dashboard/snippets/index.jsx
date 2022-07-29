import { Link, useLoaderData } from "@remix-run/react";
import { getSnippetsByUserId } from "../../../models/snippet.server";
import { getUser } from "../../../session.server";
import { json } from "@remix-run/node";
import CardComponent from "../../../components/card.component";


export const loader = async ({request}) => {
  const { id } = await getUser(request);
  const snippets = await getSnippetsByUserId(id);
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
              snippets.map(({id, title, description, createdAt}) =>
                <CardComponent key={id} title={title} description={description} createdAt={createdAt} id={id} />
              )
            }
          </div>
        ) :(
            <div>
              <h3>No snippet found</h3>
            </div>
          )
      }
    </div>
  )
}