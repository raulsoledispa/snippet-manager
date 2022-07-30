import { Form } from "@remix-run/react";
import { useEffect } from "react";
import Prism from "prismjs";
import { formatEmailToUsername } from "../utils";

export const action = async ({ request }) => {
  console.log("adding reaction");
  return null;
};

const CardComponent = ({
  title,
  description,
  publishedAt,
  id,
  code,
  language,
  author,
  reaction,
  type,
}) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div
      key={id}
      className="mb-1 flex w-full flex-col items-center rounded-xl p-6 shadow-lg"
    >
      <div className="w-full">
        <h3 className="text-left text-2xl font-medium font-extrabold text-black">
          {title}
        </h3>
      </div>
      <div className="mb-4 w-full">
        <p className="text-left font-bold italic text-gray-400">
          {language.description}
        </p>
      </div>
      <div className="w-full">
        <p className="tex-left">{description}</p>
      </div>

      <Form method="post" className="flex w-full justify-center">
        <input type="hidden" name="snippetId" value={id} />
        <input type="hidden" name="reactionId" value={reaction?.id} />
        <input type="hidden" name="reactionTotal" value={reaction?.total} />

        <button
          type="submit"
          name="_action"
          value="addReaction"
          className="mt-4 flex w-1/2 items-center justify-center rounded-md
                border border-transparent bg-blue-600
                px-4 py-2 text-base font-medium text-white
                text-white no-underline shadow-lg
                md:py-3 md:px-10 md:text-lg md:leading-6"
        >
          View Snippet
        </button>
      </Form>

      <div className="mt-4 flex w-full place-content-between items-center border-t-2">
        <div className="w-1/2 text-sm text-black">
          {formatEmailToUsername(author.email)}
        </div>
        <button
          type="submit"
          className="flex h-10 w-1/2 place-content-around items-center
        justify-end rounded rounded-3xl border-transparent bg-transparent md:hover:opacity-70"
        >
          {type === "trending" ? (
            <>
              <img
                src="/love-like-filled.svg"
                className="mr-1 h-5 w-5"
                alt="Love Icon"
              />

              <span className="font-medium text-gray-500">
                {reaction?.total || 0}
              </span>
            </>
          ) : (
            <span className="w-1/2 text-sm text-black">
              {new Date(publishedAt).toLocaleDateString()}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default CardComponent;
