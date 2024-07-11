import { motion } from "framer-motion";
import { t } from "i18next";
import { useEffect, useState } from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Person } from "@/lib/interfaces";
import { getRanking } from "@/lib/ranking";

import RankingInfo from "./components/ranking-info";
import RankingTable from "./components/ranking-table";

const Ranking = () => {
    const [persons, setPersons] = useState<Person[]>([]);

    useEffect(() => {
        getRanking().then((data) => {
            setPersons(data.sort((a: Person, b: Person) => b.score - a.score));
        });
    }, []);

    return (
        <>
            <Header />
            <div className="flex flex-col">
                <div className="w-screen h-screen flex flex-col pt-[5rem] items-center gap-8 bg-dot-sky-400/[0.4] relative">
                    <div className="flex flex-col gap-10 text-center items-center overflow-auto sm:w-[50%] pb-10 mx-2 sm:mx-0">
                        <h1 className="text-4xl">{t("rankingTitle")}</h1>
                        <p>{t("rankingInfo1")}</p>
                        <motion.div
                            className="overflow-auto gap-7 flex flex-col w-full"
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
                            <RankingTable persons={persons} />
                        </motion.div>
                        <BackgroundBeams />
                    </div>
                </div>
                <RankingInfo />
            </div>
            <Footer />
        </>
    );
};

export default Ranking;
