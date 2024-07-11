import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/home/Home";

import Layout from "./Layout/Layout";
import AdminCompetitions from "./pages/admin/competitions/AdminCompetitions";
import ManageCompetition from "./pages/admin/competitions/manage-competition/ManageCompetition";
import Users from "./pages/admin/users/Users";
import Login from "./pages/auth/login/Login";
import Competitions from "./pages/competitions/Competitions";
import NotFound from "./pages/not-found/NotFound";
import Person from "./pages/person/Person";
import Ranking from "./pages/ranking/Ranking";
import Settings from "./pages/settings/Settings";

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
                    path: "persons/:wcaId",
                    element: <Person />,
                },
                {
                    path: "auth/login",
                    element: <Login />,
                },
                {
                    path: "admin/competitions",
                    element: <AdminCompetitions />,
                },
                {
                    path: "admin/competitions/:id",
                    element: <ManageCompetition />,
                },
                {
                    path: "users",
                    element: <Users />,
                },
                {
                    path: "settings",
                    element: <Settings />,
                },
            ],
        },
        {
            path: "ranking",
            element: <Ranking />,
        },
        {
            path: "*",
            element: <Layout />,
            children: [
                {
                    path: "*",
                    element: <NotFound />,
                },
            ],
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
