import { Menu, Transition } from '@headlessui/react'
import { Form, NavLink } from "@remix-run/react";
import { Fragment } from 'react'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = () => {


  return (

    <Menu as="div" className="relative inline-block text-left md:w-1/4 md:sticky">
      <div className="border-b-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
        <Menu.Button className="inline-flex justify-center rounded-none px-4 py-2 bg-gray text-sm font-medium text-gray-700 hover:bg-gray-50">
          <img src="/arrow-right.svg" className="h-4 w-4"  alt="Arrow Right Icon"/> Menu
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
        <Menu.Items className="origin-top-right absolute right-0 mt-0 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <NavLink
                  to=""
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Dashboard
                </NavLink>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <NavLink
                  to="snippets"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Snippet
                </NavLink>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>

  )
}

export default Navbar;