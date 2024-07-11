import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/home/Home";
import Layout from "./Layout/Layout";
import Competitions from "./pages/competitions/Competitions";
import Login from "./pages/auth/login/Login";
import { Toaster } from "react-hot-toast";
import AdminCompetitions from "./pages/admin/competitions/AdminCompetitions";
import ManageCompetition from "./pages/admin/competitions/manage-competition/ManageCompetition";
import Ranking from "./pages/ranking/Ranking";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
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
        },
        {
          path: "admin/competitions/:id",
          element: <ManageCompetition />,
        }
      ]
    },
    {
      path: "ranking",
      element: <Ranking />,
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