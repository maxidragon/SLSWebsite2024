import CompetitionsList from "@/components/competitions-list";
import { getAllCompetitions } from "@/lib/competitions";
import { Competition } from "@/lib/interfaces";
import { useState, useEffect } from "react";
import { t } from "i18next";

const Competitions = () => {
    const [pastCompetitions, setPastCompetitions] = useState<Competition[]>([]);

    useEffect(() => {
        getAllCompetitions().then((competitions) => {
            setPastCompetitions(competitions.pastCompetitions);
        });
    }, []);
    return (
        <CompetitionsList title={t('pastCompetitions')} competitions={pastCompetitions} />
    );
};

export default Competitions;