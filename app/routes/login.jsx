import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { json, redirect } from "@remix-run/node";
import { Form, useSubmit, useTransition } from "@remix-run/react";

import { createUserSession, getUserId } from "~/session.server";
import { verifyLogin } from "~/models/user.server";
import { safeRedirect } from "~/utils";
import FieldInput from "../components/fieldInput";
import Layout from "./layout";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be 8 characters long" }),
});

export async function loader({ request }) {
  const userId = await getUserId(request);
  if (userId) return redirect("/home");
  return json({});
}

export async function action({ request }) {
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData);
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "home");
  const result = loginSchema.safeParse(formValues);

  if (!result.success) return json({ errors: result.error.issues });

  const user = await verifyLogin(email, password);

  if (!user) {
    return json(
      { error: { message: "Invalid email or password" } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: true, //remember: remember === "on" ? true : false,
    redirectTo,
  });
}

export const meta = () => {
  return {
    title: "Login",
  };
};

export default function LoginPage() {
  const resolver = zodResolver(loginSchema);
  const { register, formState, handleSubmit } = useForm({ resolver });
  const submit = useSubmit();
  const { errors } = formState;
  const transition = useTransition();
  const isSubmitting = Boolean(transition.submission);

  console.log("errors in login ", errors);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-12 px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 sm:px-10">
            <Form
              className="mb-0 space-y-6"
              method="POST"
              onSubmit={(event) => {
                handleSubmit(() => submit(event.target))(event);
              }}
            >
              <FieldInput
                type="email"
                label="Email"
                name="email"
                register={register}
                errors={errors}
              />

              <FieldInput
                type="password"
                label="Password"
                name="password"
                register={register}
                errors={errors}
              />

              <div>
                <button
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-black bg-black
                px-8 py-3 text-base font-medium text-white text-white
                no-underline hover:bg-blue-600
                md:py-3 md:px-10 md:text-lg md:leading-6"
                >
                  {isSubmitting ? "Processing..." : "Login"}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
