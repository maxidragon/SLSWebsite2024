import { motion } from "framer-motion";
import { t } from "i18next";
import { Lock, LogOut, Menu, Settings } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { isUserLoggedIn, logout } from "@/lib/auth";
import { cn } from "@/lib/utils";

import LanguageSwitcher from "./language-switcher";
import { Button } from "./ui/button";

const Header = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
                    <div className="flex items-center gap-6 md:gap-10">
                        <Link to="/" className="flex items-center space-x-2">
                            <span className="inline-block font-bold text-2xl">
                                SLS
                            </span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-6 font-poppins font-extralight text-sm h-fit">
                            <NavLink
                                to="/ranking"
                                className={({ isActive }) =>
                                    cn(
                                        "text-foreground/60 hover:text-foreground/80 transition-colors",
                                        isActive &&
                                            "text-foreground hover:text-foreground"
                                    )
                                }
                            >
                                {t("ranking")}
                            </NavLink>
                            <NavLink
                                to="/competitions"
                                className={({ isActive }) =>
                                    cn(
                                        "text-foreground/60 hover:text-foreground/80 transition-colors",
                                        isActive &&
                                            "text-foreground hover:text-foreground"
                                    )
                                }
                            >
                                {t("pastCompetitions")}
                            </NavLink>
                        </nav>
                    </div>
                    <div className="flex items-center md:hidden">
                        <LanguageSwitcher />
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={toggleMenu}
                        >
                            <Menu />
                        </Button>
                        {isUserLoggedIn() && (
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                    handleLogout();
                                    setIsMenuOpen(false);
                                }}
                            >
                                <LogOut />
                            </Button>
                        )}
                    </div>
                    <div className="hidden md:flex flex-1 items-center justify-end space-x-4">
                        <nav className="flex items-center space-x-1">
                            <LanguageSwitcher />
                        </nav>
                        <nav className="flex items-center space-x-1">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                    navigate(
                                        isUserLoggedIn()
                                            ? "/admin/competitions"
                                            : "/auth/login"
                                    )
                                }
                            >
                                <Lock />
                            </Button>
                        </nav>
                        {isUserLoggedIn() && (
                            <>
                                <nav className="flex items-center space-x-1">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => navigate("/settings")}
                                    >
                                        <Settings />
                                    </Button>
                                </nav>
                                <nav className="flex items-center space-x-1">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={handleLogout}
                                    >
                                        <LogOut />
                                    </Button>
                                </nav>
                            </>
                        )}
                    </div>
                </div>
                {isMenuOpen && (
                    <motion.div
                        className="md:hidden bg-background w-full"
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                    >
                        <nav className="flex flex-col items-start p-4 space-y-2">
                            <NavLink
                                to="/ranking"
                                className={({ isActive }) =>
                                    cn(
                                        "text-foreground/60 hover:text-foreground/80 transition-colors block w-full",
                                        isActive &&
                                            "text-foreground hover:text-foreground"
                                    )
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t("ranking")}
                            </NavLink>
                            <NavLink
                                to="/competitions"
                                className={({ isActive }) =>
                                    cn(
                                        "text-foreground/60 hover:text-foreground/80 transition-colors block w-full",
                                        isActive &&
                                            "text-foreground hover:text-foreground"
                                    )
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t("pastCompetitions")}
                            </NavLink>
                            {isUserLoggedIn() ? (
                                <NavLink
                                    to="/admin/competitions"
                                    className={({ isActive }) =>
                                        cn(
                                            "text-foreground/60 hover:text-foreground/80 transition-colors block w-full",
                                            isActive &&
                                                "text-foreground hover:text-foreground"
                                        )
                                    }
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Admin
                                </NavLink>
                            ) : (
                                <NavLink
                                    to="/auth/login"
                                    className={({ isActive }) =>
                                        cn(
                                            "text-foreground/60 hover:text-foreground/80 transition-colors block w-full",
                                            isActive &&
                                                "text-foreground hover:text-foreground"
                                        )
                                    }
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {t("login")}
                                </NavLink>
                            )}
                            <div className="flex items-center space-x-1"></div>
                        </nav>
                    </motion.div>
                )}
            </header>
        </>
    );
};

export default Header;
