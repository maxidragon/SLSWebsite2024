import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/home/Home";
import Layout from "./Layout/Layout";
import Competitions from "./pages/competitions/Competitions";
import Login from "./pages/auth/login/Login";
import { Toaster } from "react-hot-toast";
import AdminCompetitions from "./pages/admin/competitions/AdminCompetitions";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "competitions",
          element: <Competitions />,
        },
        {
          path: "auth/login",
          element: <Login />,
        },
        {
          path: "admin/competitions",
          element: <AdminCompetitions />
        }
      ]
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
};

export default App;