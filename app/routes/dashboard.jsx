import { getUser } from "../session.server";
import { redirect } from "@remix-run/node";
import { Link, NavLink, Outlet } from "@remix-run/react";
import Navbar from "../components/navbar.component";
import Layout from "./layout";

// eslint-disable-next-line no-unused-vars
import Prism from "prismjs";
import jsStyles from 'prismjs/components/prism-javascript';
import defaultThemeStyles from 'prism-themes/themes/prism-vs.css';
import jsonStyles from 'prismjs/components/prism-json';
import customEditorStyles from "~/styles/editor.css"
import buttonStyles from "~/styles/button.css"

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: jsStyles
    },
    {
      rel: "stylesheet",
      href: defaultThemeStyles
    },
    {
      rel: "stylesheet",
      href: jsonStyles
    },
    {
      rel: "stylesheet",
      href: customEditorStyles
    },
    {
      rel: "stylesheet",
      href: buttonStyles
    }
  ]
}


export const loader = async ({request}) =>{
  return (await getUser(request)) === null ? redirect("/") :  null;
}


const Dashboard = () => {
  return (
    <Layout>
      <div className="w-full flex flex-col md:flex-row md:gap-2 bg-transparent">
        <Navbar />
      <div className="ml-2 mr-2 md:w-full">
        <Outlet />
      </div>
      </div>
    </Layout>
  )
}

export  default Dashboard;