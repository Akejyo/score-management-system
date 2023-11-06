import { RouteObject, createBrowserRouter } from "react-router-dom";

import Home from "@/pages/Home";
import Layout from "@/pages/Layout";
import ModifyScore from "@/pages/ModifyScore";
import AddScore from "@/pages/AddScore";
import CheckScore from "@/pages/CheckScore";

type CustomRouteConfig = RouteObject & { name?: string };

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", name: "成绩管理系统", element: <Home /> },
      { path: "/modify", name: "修改学生成绩", element: <ModifyScore /> },
      { path: "/add", name: "添加学生成绩", element: <AddScore /> },
      { path: "/check", name: "受理查分", element: <CheckScore /> },
    ] as CustomRouteConfig[],
  },
] as CustomRouteConfig[]);

export default router;
