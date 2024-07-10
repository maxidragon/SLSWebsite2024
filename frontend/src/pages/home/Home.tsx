import CompetitionsList from "@/components/competitions-list";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { getAllCompetitions } from "@/lib/competitions";
import { Competition } from "@/lib/interfaces";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { t } from "i18next";

const Home = () => {
  const [upcomingCompetitions, setUpcomingCompetitons] = useState<Competition[]>([]);

  useEffect(() => {
    getAllCompetitions().then((competitions) => {
      setUpcomingCompetitons(competitions.upcomingCompetitions);
    });
  }, []);

  return (
    <>
      <CompetitionsList title={t('upcomingCompetitions')} competitions={upcomingCompetitions} />
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 1, delay: 2, type: "spring" },
        }}
        className="2xl:text-xl lg:text-lg text-md tracking-tighter text-muted-foreground lg:w-1/3 md:w-2/5 w-full sm:px-16 px-8 text-center font-rubik drop-shadow-md"
      >
        Lorem ipsum de amet
      </motion.p>
      <BackgroundBeams />
    </>
  );
};

export default Home;
