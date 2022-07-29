import { Form, useLoaderData, useSubmit, useTransition } from "@remix-run/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { createSnippet } from "../../../models/snippet.server";
import { json, redirect } from "@remix-run/node";
import { getLanguages } from "../../../models/language.server";
import { useState } from "react";
import FieldInput from "../../../components/fieldInput";
import FieldError from "../../../components/fieldError";
import CustomEditor from "../../../components/editor";
import { getUser } from "../../../session.server";


const codeSnippetSchema = z.object({
  title: z.string().nonempty({ message: "The field is required"}),
  description: z.string().nonempty({ message: "The field is required"}),
  //editor: z.string().nonempty({ message : "The field is required"})
})


export const loader = async () => {
  const languages = await getLanguages();
  return json({languages});
}

export const action = async ({request}) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const languageId = formData.get("language");
  const snippet = formData.get("editor");

  const { id } = await getUser(request)

  await createSnippet(title, description,languageId,snippet, id);
  return redirect("/home")
}



export default function NewSnippetPage() {
  const { languages } = useLoaderData();
  const submit = useSubmit();
  const transition = useTransition();
  const isSubmitting = Boolean(transition.submission)
  const [ defaultLanguage, setDefaultLanguage] = useState("javascript");
  const resolver = zodResolver(codeSnippetSchema);
  const { handleSubmit, register, formState } = useForm({resolver});
  const { errors } = formState;

  return (
    <div className="flex w-full">
      <div className="w-full mr-4 ml-4 mt-8 lg:mr-40 lg:ml-40 md:mr-24 md:ml-24">
        <h2 className="font-medium border-b-2 text-2xl">Create Code Snippet</h2>
        <Form replace={true}
              className="mt-5"
              method="post"
              onSubmit={
          event => handleSubmit(() => submit(event.target))(event)}
        >

          <FieldInput label="Title" name="title" type="text" errors={errors} register={register} />
          <FieldInput label="Description" name="description" type="text" errors={errors} register={register} />

          <div className="flex flex-col mb-4 md:w-full">
            <label className="block text-sm font-medium text-gray-700">
              Language
              <div className="mt-1">
                <select onChange={(e)=> setDefaultLanguage(e.target.value)}
                        name="language"
                        className="w-full min-w-0 px-4 py-2 text-base text-gray-900
                        placeholder-gray-500 bg-white border border-2 rounded-md appearance-none
                        sm:text-sm focus:outline-none focus:ring-1 focus:ring-gray-800 focus:placeholder-gray-400">
                  {
                    languages.map(language => (
                      <option className="text-gray-900" key={language.id} value={language.id}>{language.description}</option>
                    ))
                  }
                </select>
                <FieldError name="language" errors={errors} />
              </div>
            </label>
          </div>
          <CustomEditor name="editor" languageSelected={defaultLanguage} />


          <div className="flex mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-2/4 px-8 py-3 text-base font-medium text-white
                no-underline bg-black border border-transparent rounded-md bg-black
                text-white hover:bg-blue-600 text-center
                md:py-3 md:text-lg md:px-10 md:leading-6" >
              {
                isSubmitting ? "Creating..." : "Create"
              }
            </button>
          </div>

        </Form>
      </div>
    </div>
  )
}