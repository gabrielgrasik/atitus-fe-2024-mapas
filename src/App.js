import "bootstrap/dist/css/bootstrap.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Login } from "./pagess/Login";
import { Register } from "./pagess/Register";
import { Home } from "./pagess/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
