import HomePage from "@/pages/HomePage/HomePage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/rooms',
    element: <div>rooms</div>
  },
  {
    path: '/rooms/:id',
    element: <div>asd</div>,
    errorElement: <div>error</div>
  }
])