// router.tsx
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />, // Home loads dashboard
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default router;
