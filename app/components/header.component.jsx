import { Form, Link, useResolvedPath, useTransition } from "@remix-run/react";
import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const labels = new Map([
  ["login", "Login"],
  ["signup", "Sign Up"],
])

function PendingLink({ to, children, setCurrentPath }) {
  const transition = useTransition();
  const path = useResolvedPath(to);

  const isPending =
    transition.state === "loading" &&
    transition.location.pathname === path.pathname;

  return (
    <Link
      onClick={()=> setCurrentPath(to)}

      className="flex items-center justify-center w-full px-2 py-2 text-base font-medium
                          text-white no-underline bg-black border border-transparent rounded-md bg-black text-white hover:bg-blue-600
                          md:py-3 md:text-lg md:px-10 md:leading-6"
      data-pending={isPending ? "true" : null}
      to={to}
      children={children}
    />
  );
}


const Header = ({ user}) => {
  const [ currentAction, setCurrentAction ] = useState("signup")
  return (
    <header className="w-full top-0 flex gap-2  mx-auto items-center left-0 right-0 h-16 border-b-2 pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
      <Disclosure as="nav" className="w-full">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="flex-1 flex items-center justify-start">
                  <div className="flex-shrink-0 flex items-center">


                    <Link to={user ? "home" : ""} onClick={() => setCurrentAction("signup")}>
                      <img
                        className="block h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Avatar"
                      />
                    </Link>

                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                  <img className="text-current p-2" src="/github.svg" alt="Github" />

                  {
                    user ? (
                      <Menu as="div" className={`${user ? "" : "hidden"} ml-3 relative`}>
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
                          <Menu.Items className="origin-top-right absolute right-0 mt-4 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  Your Profile
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="dashboard/snippets/new"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  New Snippet
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Form method="POST">
                                  <button
                                    type="submit" name="_action" value="logout"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
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
                        {
                          currentAction !== "login" ? (
                            <PendingLink to="login" setCurrentPath={setCurrentAction}>{labels.get("login")}</PendingLink>
                          ) : (
                            <PendingLink to="signup" setCurrentPath={setCurrentAction}>{labels.get("signup")}</PendingLink>
                          )
                        }
                      </div>
                    )
                  }

                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </header>
  )
}

export default Header;