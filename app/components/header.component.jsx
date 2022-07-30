import { Form, Link, useResolvedPath, useTransition } from "@remix-run/react";
import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const labels = new Map([
  ["login", "Login"],
  ["signup", "Sign Up"],
]);

function PendingLink({ to, children, setCurrentPath }) {
  const transition = useTransition();
  const path = useResolvedPath(to);

  const isPending =
    transition.state === "loading" &&
    transition.location.pathname === path.pathname;

  return (
    <Link
      onClick={() => setCurrentPath(to)}
      className="flex w-full items-center justify-center rounded-md border border-transparent bg-black
                          bg-black px-2 py-2 text-base font-medium text-white text-white no-underline hover:bg-blue-600
                          md:py-3 md:px-10 md:text-lg md:leading-6"
      data-pending={isPending ? "true" : null}
      to={to}
      children={children}
    />
  );
}

const Header = ({ user }) => {
  const [currentAction, setCurrentAction] = useState("signup");
  return (
    <header className="top-0 left-0 right-0 mx-auto  flex h-16 w-full items-center gap-2 border-b-2 pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
      <Disclosure as="nav" className="w-full">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex flex-1 items-center justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link
                      to={user ? "home" : ""}
                      onClick={() => setCurrentAction("signup")}
                    >
                      <img
                        className="block h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Avatar"
                      />
                    </Link>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <img
                    className="p-2 text-current"
                    src="/github.svg"
                    alt="Github"
                  />

                  {user ? (
                    <Menu
                      as="div"
                      className={`${user ? "" : "hidden"} relative ml-3`}
                    >
                      <div>
                        <Menu.Button className="flex text-sm">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8"
                            src="/menu.svg"
                            alt="Menu Icon"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-4 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="dashboard/snippets/new"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                New Snippet
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Form method="POST">
                                <button
                                  type="submit"
                                  name="_action"
                                  value="logout"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Sign out!
                                </button>
                              </Form>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <div>
                      {currentAction !== "login" ? (
                        <PendingLink
                          to="login"
                          setCurrentPath={setCurrentAction}
                        >
                          {labels.get("login")}
                        </PendingLink>
                      ) : (
                        <PendingLink
                          to="signup"
                          setCurrentPath={setCurrentAction}
                        >
                          {labels.get("signup")}
                        </PendingLink>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </header>
  );
};

export default Header;
