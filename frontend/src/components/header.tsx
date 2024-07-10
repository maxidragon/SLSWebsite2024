import { cn } from "@/lib/utils";
import { Lock, LogOut } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { t } from "i18next";
import LanguageSwitcher from "./language-switcher";
import { isUserLoggedIn, logout } from "@/lib/auth";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="flex items-center gap-6 md:gap-10">
            <Link to="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold text-2xl">SLS</span>
            </Link>
            <nav className="flex items-center gap-6 font-poppins font-extralight text-sm h-fit">
              <NavLink
                to="/ranking"
                className={({ isActive }) =>
                  cn(
                    "text-foreground/60 hover:text-foreground/80 transition-colors sm:block hidden",
                    isActive && "text-foreground hover:text-foreground"
                  )
                }
              >
                {t('ranking')}
              </NavLink>
              <NavLink
                to="/competitions"
                className={({ isActive }) =>
                  cn(
                    "text-foreground/60 hover:text-foreground/80 transition-colors sm:block hidden",
                    isActive && "text-foreground hover:text-foreground"
                  )
                }
              >
                {t('pastCompetitions')}
              </NavLink>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <LanguageSwitcher />
            </nav>
            <nav className="flex items-center space-x-1">
              <Button variant="outline" size="icon" onClick={() => navigate(isUserLoggedIn() ? "/admin/competitions" : "/auth/login")}>
                <Lock />
              </Button>
            </nav>
            {isUserLoggedIn() && (
              <nav className="flex items-center space-x-1">
                <Button variant="outline" size="icon" onClick={handleLogout}>
                  <LogOut />
                </Button>
              </nav>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;