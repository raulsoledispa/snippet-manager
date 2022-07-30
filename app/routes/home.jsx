import { Fragment, useState } from "react";

import { Form, Link, useLoaderData, useSearchParams, useSubmit } from "@remix-run/react";
import { getUser, logout, requireUserSession } from "../session.server";
import { json, redirect } from "@remix-run/node";
import { Tab } from '@headlessui/react'
import Layout from "./layout";
import { getLastPublished } from "../models/snippet.server";
import CardComponent from "../components/card.component";



export const loader = async ({request}) =>{

  await requireUserSession(request)

  const url = new URL(request.url);
  const type = url.searchParams.get("filterBy");

  const lastPublished = await getLastPublished();

  console.log("lastPublished ", lastPublished)

  return json({lastPublished});
}

export const action = async({request}) => {
  return logout(request)
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Home = () => {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const filterBy = searchParams.getAll("filterBy");
  const { lastPublished } = useLoaderData();
  let X = 'function hello_world(){ console.log("hello")}'
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <Layout>
      {/*<Form onChange={(e) => submit(e.currentTarget)}
        method="GET" className="w-full px-2 py-16 sm:px-0">*/}
      <div className="p-2 m-4 overscroll-x-contain overflow-x-auto overflow-y-hidden no-scrollbar">
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="flex mt-4 pb-[1px] border-b border-gray-200 border-neutral-800 w-max min-w-full">
            <Tab
              as={Link}
              to="?filterBy=trending"
              key="trending"
                className={({ selected }) =>
                  classNames(
                    'p-2 mr-2 leading-5 font-medium text-md transition-colors select-none border-b-2 mb-[-2px]',
                    'focus:outline-none rounded-[1px]',
                    selected
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-600 hover:border-gray-200 border-transparent hover:text-black'
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
                  'p-2 mr-2 leading-5 font-medium text-md transition-colors select-none border-b-2 mb-[-2px]',
                  'focus:outline-none rounded-[1px]',
                  selected
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 hover:border-gray-200 border-transparent hover:text-black'
                )
              }
            >
              Recent
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white focus:outline-none'
              )}
            >
              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {
                  lastPublished.map(({id, title, description, publishedAt, language, code, author}) => (
                    <CardComponent key={id} title={title}
                                   description={description}
                                   publishedAt={publishedAt}
                                   author={author}
                                   id={id} language={language} code={code} />
                  ))
                }
              </div>
            </Tab.Panel>

            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white focus:outline-none'
              )}
            >

              <div>Panel 2</div>

            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </Layout>
  )
}

export default Home;