import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import JobDetails from "../pages/JobDetails";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/job/:id",
        element: <JobDetails />,
        loader: ({params})=>fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
      },
    ],
  },
]);
