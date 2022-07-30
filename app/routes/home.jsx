import { useState } from "react";

import {
  Form,
  Link,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { requireUserSession } from "../session.server";
import { json } from "@remix-run/node";
import { Tab } from "@headlessui/react";
import Layout from "./layout";
import {
  getLastPublished,
  getTrendingSnippets,
} from "../models/snippet.server";
import CardComponent from "../components/card.component";
import { addReactionToSnippet } from "../models/reaction.server";

export const loader = async ({ request }) => {
  await requireUserSession(request);

  const url = new URL(request.url);
  const type = url.searchParams.get("filterBy");

  let snippetCodes = {};

  if (type !== "trending") snippetCodes = await getLastPublished();
  else snippetCodes = await getTrendingSnippets();

  /*const lastPublished = await getTrendingSnippets();//getLastPublished();
   */

  return json({ snippetCodes });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  console.log("formData ", JSON.stringify(formData));
  const _action = formData.get("_action");
  const snippetId = formData.get("snippetId");
  const reactionId = formData.get("reactionId");
  const total = formData.get("reactionTotal");

  if (_action === "addReaction") {
    return addReactionToSnippet(snippetId, reactionId, total);
  }

  //console.log(...values)
  //await addReactionToSnippet()
  return null;
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Home = () => {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const { snippetCodes } = useLoaderData();
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Layout>
      <Form onChange={(e) => submit(e.currentTarget)} method="GET">
        <div className="no-scrollbar m-4 overflow-x-auto overflow-y-hidden overscroll-x-contain p-2">
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List className="mt-4 flex w-max min-w-full border-b border-gray-200 border-neutral-800 pb-[1px]">
              <Tab
                as={Link}
                to="?filterBy=trending"
                key="trending"
                className={({ selected }) =>
                  classNames(
                    "text-md mr-2 mb-[-2px] select-none border-b-2 p-2 font-medium leading-5 transition-colors",
                    "rounded-[1px] focus:outline-none",
                    selected
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:border-gray-200 hover:text-black"
                  )
                }
              >
                Trending
              </Tab>

              <Tab
                as={Link}
                to="?filterBy=lastPublished"
                key="trending"
                className={({ selected }) =>
                  classNames(
                    "text-md mr-2 mb-[-2px] select-none border-b-2 p-2 font-medium leading-5 transition-colors",
                    "rounded-[1px] focus:outline-none",
                    selected
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:border-gray-200 hover:text-black"
                  )
                }
              >
                Recent
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel
                className={classNames(
                  "rounded-xl bg-white p-3",
                  "ring-white focus:outline-none"
                )}
              >
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  <Form>
                    {snippetCodes.map(
                      ({
                        id,
                        title,
                        description,
                        publishedAt,
                        language,
                        code,
                        author,
                        reactions,
                      }) => (
                        <CardComponent
                          key={id}
                          title={title}
                          description={description}
                          publishedAt={publishedAt}
                          author={author}
                          id={id}
                          language={language}
                          code={code}
                          reaction={reactions[0]}
                          type="trending"
                        />
                      )
                    )}
                  </Form>
                </div>
              </Tab.Panel>

              <Tab.Panel
                className={classNames(
                  "rounded-xl bg-white p-3",
                  "ring-white focus:outline-none"
                )}
              >
                <div>
                  {snippetCodes.map(
                    ({
                      id,
                      title,
                      description,
                      publishedAt,
                      language,
                      code,
                      author,
                      reactions,
                    }) => (
                      <CardComponent
                        key={id}
                        title={title}
                        description={description}
                        publishedAt={publishedAt}
                        author={author}
                        id={id}
                        language={language}
                        code={code}
                        reaction={reactions[0]}
                        type="lastPublished"
                      />
                    )
                  )}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </Form>
    </Layout>
  );
};

export default Home;
