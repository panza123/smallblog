import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./layout/Layout";
import Signup from "./auth/Signup";
import axios from "axios";
import { Login } from "./auth/Login";
import Home from "./pages/Home";
import Account from "./layout/Account";
import { Create } from "./pages/Create";
import { Profile } from "./pages/Profile";
import Blog from "./pages/Blog";
import {Edit} from "./pages/Edit";
import DetailsPage from "./pages/DetailsPage";

// Set Axios default baseURL and credentials
axios.defaults.baseURL ="http://localhost:8000" 
axios.defaults.withCredentials = true;

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "signup", // Use relative paths for child routes
          element: <Signup />,
        },
        {
          path: "login", // Use relative paths for child routes
          element: <Login />,
        },
        {
          path: "/", // You might want to use this only if it's the homepage
          element: <Home />,
        },
        {
          path: "blogs/:id",
          element: <DetailsPage/>

        },
        {
          path: "account",
          element: <Account />,
          children: [
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "create",
              element: <Create />,
            },
            {
              path: "blog",
              element: <Blog />,
              
            },
            {
              path: "blog/edit/:id",
              element: <Edit />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
