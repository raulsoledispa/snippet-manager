import { Fragment } from "react";

import { Form, Link, useLoaderData, useSearchParams, useSubmit } from "@remix-run/react";
import { getUser, logout } from "../session.server";
import { json, redirect } from "@remix-run/node";
import { Tab } from '@headlessui/react'
import Layout from "./layout";
import { getLastPublished } from "../models/snippet.server";
import CardComponent from "../components/card.component";



export const loader = async ({request}) =>{
  const url = new URL(request.url);
  const type = url.searchParams.get("filterBy");

  const user = await getUser(request);

  if(user === null) return redirect("/")

  const lastPublished = await getLastPublished();

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

  return (
    <Layout>
      <Form onChange={(e) => submit(e.currentTarget)}
        method="GET" className="w-full px-2 py-16 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            <Tab
              as={Link}
              to="?filterBy=trending"
              key="trending"
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
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
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Last Published
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {
                  lastPublished.map(({snippetID, title, description, createdAt}) => (
                    <CardComponent key={snippetID} title={title} description={description} createdAt={createdAt} id={snippetID} />
                  ))
                }
              </div>
            </Tab.Panel>

            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {
                  lastPublished.map(({snippetID, title, description, createdAt}) => (
                    <CardComponent key={snippetID} title={title} description={description} createdAt={createdAt} id={snippetID} />
                  ))
                }
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </Form>
    </Layout>
  )
}

export default Home;