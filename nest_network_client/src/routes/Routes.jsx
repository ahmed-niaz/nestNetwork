import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import JobDetails from "../pages/JobDetails";
import AddJob from "../pages/AddJob";
import ErrorPage from "../pages/ErrorPage";
import MyPostedJobs from "../pages/MyPostedJobs";
import UpdateJob from "../pages/UpdateJob";
import ProtectedRoutes from "./ProtectedRoutes";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage/>,
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
        element: <ProtectedRoutes>
          <JobDetails />
        </ProtectedRoutes>,
        loader: ({params})=>fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
      },
      {
        path:'/add-job',
        element: <ProtectedRoutes>
          <AddJob/>
        </ProtectedRoutes>
      },{
        path:'/my-posted-job',
        element: <ProtectedRoutes>
          <MyPostedJobs/>
        </ProtectedRoutes>
      },
      {
        path:'/update/:id',
        element: <ProtectedRoutes>
          <UpdateJob/>
        </ProtectedRoutes>,
        loader: ({params})=>fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
      }
    ],
  },
]);
