import { Outlet } from "react-router-dom";

import Footer from "@/components/footer";
import Header from "@/components/header";

const Layout = () => {
    return (
        <>
            <Header />
            <div className="flex flex-col mb-5">
                <div className="w-screen h-screen flex flex-col pt-[5rem] items-center gap-8 bg-dot-sky-400/[0.4] relative">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Layout;
