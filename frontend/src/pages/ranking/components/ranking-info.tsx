import { motion } from "framer-motion";
import { t } from "i18next";

import score from "@/assets/score.png";

const RankingInfo = () => {
    return (
        <div className="w-screen flex lg:flex-row flex-col lg:justify-evenly gap-32 items-center py-10 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.03]">
            <motion.div
                initial={{
                    opacity: 0,
                    y: 100,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 1,
                        type: "spring",
                    },
                }}
                viewport={{
                    once: true,
                }}
                className="flex flex-col gap-8 sm:w-[520px] w-fit"
            >
                <h2 className="sm:text-3xl text-2xl w-full px-2 sm:px-0 leading-none font-bold tracking-tighter font-poppins text-center">
                    {t("rankingInfo2")}
                </h2>
                <p className="text-xl tracking-tighter px-2 sm:px-0 text-muted-foreground text-center font-rubik drop-shadow-md">
                    1. {t("rankingInfo3")}
                </p>
                <p className="text-xl tracking-tighter px-2 sm:px-0 text-muted-foreground text-center font-rubik drop-shadow-md">
                    2. {t("rankingInfo4")}
                </p>
                <img src={score} alt="score" className="w-full px-2 sm:px-0" />
            </motion.div>
        </div>
    );
};

export default RankingInfo;
