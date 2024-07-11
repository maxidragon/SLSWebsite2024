import { motion } from "framer-motion";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <>
            <motion.h1
                initial={{
                    opacity: 0,
                    y: 100,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 1,
                        type: "spring",
                    },
                }}
                className="text-4xl"
            >
                {t("pageNotFound")}
            </motion.h1>
            <motion.div
                initial={{
                    opacity: 0,
                    y: 100,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 1,
                        type: "spring",
                    },
                }}
            >
                <Button onClick={() => navigate("/")}>{t("goBack")}</Button>
            </motion.div>
        </>
    );
};

export default NotFound;
