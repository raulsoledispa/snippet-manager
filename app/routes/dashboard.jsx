import { getUser } from "../session.server";
import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Navbar from "../components/navbar.component";
import Layout from "./layout";

export const loader = async ({ request }) => {
  return (await getUser(request)) === null ? redirect("/") : null;
};

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex w-full flex-col bg-transparent md:flex-row md:gap-2">
        <Navbar />
        <div className="ml-2 mr-2 md:w-full">
          <Outlet />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
