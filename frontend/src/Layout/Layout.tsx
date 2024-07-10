import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Header />
            <div className="flex flex-col">
                <div className="w-screen h-screen flex flex-col pt-[5rem] items-center gap-8 bg-dot-sky-400/[0.4] relative">
                <Outlet />
                </div>
            </div>
        </>
    )
};

export default Layout;