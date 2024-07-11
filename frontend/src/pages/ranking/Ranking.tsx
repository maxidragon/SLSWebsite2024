import { motion } from "framer-motion";
import { t } from "i18next";
import { useEffect, useState } from "react";

import score from "@/assets/score.png";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { BackgroundBeams } from "@/components/ui/background-beams";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Person } from "@/lib/interfaces";
import { getRanking } from "@/lib/ranking";

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
                            initial={{ opacity: 0, y: 100 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                transition: { duration: 1, type: "spring" },
                            }}
                        >
                            <Table className="bg-slate-900 bg-opacity-70">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-center">
                                            {t("position")}
                                        </TableHead>
                                        <TableHead className="text-center">
                                            {t("name")}
                                        </TableHead>
                                        <TableHead className="text-center">
                                            {t("wcaId")}
                                        </TableHead>
                                        <TableHead className="text-center">
                                            {t("score")}
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {persons.map(
                                        (person: Person, position: number) => {
                                            if (
                                                position > 0 &&
                                                person.score ===
                                                    persons[position - 1].score
                                            ) {
                                                position = position - 1;
                                            }
                                            return (
                                                <TableRow
                                                    key={person.competitor.id}
                                                >
                                                    <TableCell>
                                                        {position + 1}
                                                    </TableCell>
                                                    <TableCell>
                                                        {person.competitor.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {person.competitor
                                                            .wcaId && (
                                                            <a
                                                                href={`https://worldcubeassociation.org/persons/${person.competitor.wcaId}`}
                                                                target="_blank"
                                                            >
                                                                {
                                                                    person
                                                                        .competitor
                                                                        .wcaId
                                                                }
                                                            </a>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {person.score}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                    )}
                                </TableBody>
                            </Table>
                        </motion.div>
                        <BackgroundBeams />
                    </div>
                </div>
                <div className="w-screen flex lg:flex-row flex-col lg:justify-evenly gap-32 items-center py-10 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.03]">
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            transition: { duration: 1, type: "spring" },
                        }}
                        viewport={{ once: true }}
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
                        <img
                            src={score}
                            alt="score"
                            className="w-full px-2 sm:px-0"
                        />
                    </motion.div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Ranking;
