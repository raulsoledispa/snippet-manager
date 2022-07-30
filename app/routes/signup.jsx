import { Form, useTransition } from "@remix-run/react";
import { createUser } from "../models/user.server";
import { createUserSession } from "../session.server";
import { safeRedirect } from "~/utils";
import Layout from "./layout";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const user = await createUser(email, password);
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/home");

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo,
  });
};

export const meta = () => {
  return {
    title: "Sign up",
  };
};

const Signup = () => {
  const transition = useTransition();
  return (
    <Layout>
      <div className="flex flex-col justify-center bg-white py-12 px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 sm:px-10">
            <Form className="mb-0 space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full min-w-0 appearance-none rounded-md border border-2 bg-white px-4
                       py-2 text-base text-gray-900 placeholder-gray-500 focus:placeholder-gray-400
                        focus:outline-none focus:ring-1 focus:ring-gray-800 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="w-full min-w-0 appearance-none rounded-md border border-2 bg-white px-4
                       py-2 text-base text-gray-900 placeholder-gray-500 focus:placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-gray-800 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={transition.submission}
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-black bg-black
                px-8 py-3 text-base font-medium text-white text-white
                no-underline hover:bg-blue-600
                md:py-3 md:px-10 md:text-lg md:leading-6"
                >
                  {transition.submission ? "Registering..." : "Sign up"}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
