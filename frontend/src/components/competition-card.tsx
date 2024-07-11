import { Competition } from "@/lib/interfaces";
import { BackgroundGradient } from "./ui/background-gradient";
import wca from "@/assets/wca.svg";
import MagicButton from "./ui/magic-button";
import { t } from "i18next";
import { getEventName } from "@/lib/events";

interface CompetitionCardProps {
  competition: Competition;
}

const CompetitionCard = ({ competition }: CompetitionCardProps) => {
  const formattedDates = competition.startDate === competition.endDate ? new Date(competition.startDate).toLocaleDateString() : `${new Date(competition.startDate).toLocaleDateString()} - ${new Date(competition.endDate).toLocaleDateString()}`;
  const isPast = new Date(competition.endDate).getTime() < new Date().getTime();
  return (
    <div>
      <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-slate-900  md:flex flex-col md:flex-row gap-3 md:justify-between">
        <div className="text-center md:text-left">
          <h1 className="text-2xl sm:text-4xl font-bold text-black dark:text-neutral-200">
            {competition.name}
          </h1>
          <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
            {formattedDates}
          </p>
          <p className="text-3xl text-neutral-600 dark:text-neutral-400">
            {competition.events.map((eventId) => (
              <span className={`cubing-icon event-${eventId}`} title={getEventName(eventId)} />
            ))}
          </p>
        </div>
        <div className="flex flex-col gap-3 mt-4 md:mt-0 md:justify-center">
          <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent flex gap-2 items-center text-center justify-center hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
            <img src={wca} width="25" height="25" />
            <span>{t('website')}</span>
          </button>
          <MagicButton text={isPast ? t('results') : t('register')} onClick={() => {}} />
        </div>
      </BackgroundGradient>
    </div>
  );
};

export default CompetitionCard;