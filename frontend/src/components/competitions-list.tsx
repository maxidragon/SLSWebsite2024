import { motion } from "framer-motion";

import { Competition } from "@/lib/interfaces";

import CompetitionCard from "./competition-card";

interface CompetitionsListProps {
    title: string;
    competitions: Competition[];
}

const CompetitionsList = ({ title, competitions }: CompetitionsListProps) => {
    return (
        <>
            <h2 className="xl:text-4xl lg:text-5xl text-4xl font-bold text-white max-w-[50%] text-center">
                {title}
            </h2>
            <motion.div
                className="overflow-auto gap-7 flex flex-col sm:w-[50%]"
                initial={{ opacity: 0, y: 100 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1, type: "spring" },
                }}
            >
                {competitions.map((competition) => (
                    <CompetitionCard
                        key={competition.id}
                        competition={competition}
                    />
                ))}
            </motion.div>
        </>
    );
};

export default CompetitionsList;
