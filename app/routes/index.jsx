import { Link } from "@remix-run/react";
import Layout from "./layout";

export default function Index() {
  return (
    <Layout>
      {/*<div className="bg-white w-auto px-4 pt-16 pb-8 mx-auto sm:pt-24 lg:px-8">*/}
      <div className="w-auto px-4 pt-16 pb-8 mx-auto sm:pt-24 lg:px-8">
        <h1 className="max-w-5xl text-center mx-auto text-6xl font-extrabold tracking-tighter sm:text-7xl lg:text-8xl xl:text-8xl">
          Share code snippets easily
        </h1>
        <p className="mx-auto mt-6 font-medium leading-tight text-center text-gray-400 sm:max-w-4xl sm:text-2xl">
          Management and share your snippet code
        </p>

        <div className="max-w-xl mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
          <Link to="signup"
                className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white
                no-underline bg-black border border-transparent rounded-md bg-black
                text-white hover:bg-blue-600
                md:py-3 md:text-lg md:px-10 md:leading-6" >
            Get Started →
          </Link>
        </div>
      </div>

      <div className="mt-4 relative from-gray-50 to-gray-100">
        <div className="px-4 py-16 mx-auto sm:pt-20 sm:pb-24 lg:max-w-7xl lg:pt-24">
          <h2 className="text-4xl font-extrabold tracking-tight
          lg:text-5xl xl:text-6xl lg:text-center text-black">
            Title 2
          </h2>
          <p className="mx-auto mt-4 text-lg font-medium text-gray-400 lg:max-w-3xl lg:text-xl lg:text-center">
            Turborepo reimagines build system techniques used by Facebook and Google to remove maintenance burden and overhead.
          </p>
          <div className="grid grid-cols-1 mt-12 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            <div className="p-10 bg-white shadow-lg rounded-xl dark:bg-opacity-5">
              <div className="mt-4">
                <h3 className="text-lg font-medium dark:text-white">Share with your friend</h3>
                <p className="mt-2 text-base font-medium text-gray-500 dark:text-gray-400">
                  Building once is painful enough, Turborepo will remember what you've built and skip the stuff that's already been computed.</p>
              </div>
            </div>

            <div className="p-10 bg-white shadow-lg rounded-xl dark:bg-opacity-5">
              <div className="mt-4">
                <h3 className="text-lg font-medium dark:text-white">Share with your friend</h3>
                <p className="mt-2 text-base font-medium text-gray-500 dark:text-gray-400">
                  Building once is painful enough, Turborepo will remember what you've built and skip the stuff that's already been computed.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
