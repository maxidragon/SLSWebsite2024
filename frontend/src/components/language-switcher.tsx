import { Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        i18n.language = lng;
        localStorage.setItem("slsLng", lng);
        window.location.reload();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Globe />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage("pl")}>
                    Polski
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("en")}>
                    English
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageSwitcher;