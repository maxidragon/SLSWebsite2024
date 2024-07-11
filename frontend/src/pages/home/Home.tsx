import CompetitionsList from "@/components/competitions-list";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { getAllCompetitions } from "@/lib/competitions";
import { Competition } from "@/lib/interfaces";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { t } from "i18next";
import Header from "@/components/header";
import sponsors from "@/assets/sponsors.png";
import Footer from "@/components/footer";

const Home = () => {
  const [upcomingCompetitions, setUpcomingCompetitons] = useState<Competition[]>([]);

  useEffect(() => {
    getAllCompetitions().then((competitions) => {
      setUpcomingCompetitons(competitions.upcomingCompetitions);
    });
  }, []);

  return (

    <>
      <Header />
      <div className="flex flex-col">
        <div className="w-screen h-screen flex flex-col pt-[5rem] items-center gap-8 bg-dot-sky-400/[0.4] relative">
          <CompetitionsList title={t('upcomingCompetitions')} competitions={upcomingCompetitions} />
          <BackgroundBeams />
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
            <h1 className="sm:text-3xl text-2xl w-full px-2 sm:px-0 leading-none font-bold tracking-tighter font-poppins text-center">
              {t('sponsors')}
            </h1>
            <p className="text-center text-neutral-600 dark:text-neutral-400">
              {t('sponsorsDescription')}
            </p>
            <img src={sponsors} alt="sponsors" className="w-full px-2 sm:px-0" />
          </motion.div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
