import { Form, useTransition } from "@remix-run/react";
import { createUser } from "../models/user.server";
import { createUserSession } from "../session.server";
import { safeRedirect } from "~/utils";
import Layout from "./layout";

export const action = async ({request}) => {
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
}

export const meta = () => {
  return {
    title: "Sign up",
  };
};

const Signup = () => {
  const transition = useTransition();
  return (
    <Layout>
      <div className="bg-white flex flex-col justify-center py-12 px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 sm:px-10">
            <Form className="mb-0 space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <div className="mt-1">
                  <input id="email" name="email" type="email" autoComplete="email" required
                         className="w-full min-w-0 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white
                       border border-2 rounded-md appearance-none sm:text-sm
                        focus:outline-none focus:ring-1 focus:ring-gray-800 focus:placeholder-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1">
                  <input id="password" name="password" type="password" autoComplete="current-password" required
                         className="w-full min-w-0 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white
                       border border-2 rounded-md appearance-none sm:text-sm
                        focus:outline-none focus:ring-2 focus:ring-gray-800 focus:placeholder-gray-400" />
                </div>
              </div>

              <div>
                <button type="submit"
                        disabled={transition.submission}
                        className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white
                no-underline bg-black border border-transparent rounded-md bg-black
                text-white hover:bg-blue-600
                md:py-3 md:text-lg md:px-10 md:leading-6">
                  {
                    transition.submission ? "Registering..." : "Sign up"
                  }
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Signup;