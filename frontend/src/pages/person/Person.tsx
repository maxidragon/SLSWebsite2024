import { useCallback, useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useParams } from "react-router-dom";

import { Competitor, ResultByCompetition } from "@/lib/interfaces";
import { getPersonInfoAndResults } from "@/lib/ranking";
import { WCA_ORIGIN } from "@/lib/request";

import ResultsTable from "./components/results-table";

const Person = () => {
    const { wcaId } = useParams<{ wcaId: string }>();
    const [person, setPerson] = useState<Competitor | null>(null);
    const [resultsByCompetition, setResultsByCompetition] = useState<
        ResultByCompetition[]
    >([]);

    const fetchData = useCallback(async () => {
        if (!wcaId) return;
        const data = await getPersonInfoAndResults(wcaId);
        setPerson(data.person);
        setResultsByCompetition(data.resultsByCompetition);
    }, [wcaId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (!person) return <div>Loading...</div>;
    return (
        <>
            <h1 className="text-4xl font-bold">{person.name}</h1>
            <img
                src={person.avatarUrl}
                alt={person.name}
                className="sm:w-[20%] w-[80%] rounded-lg max-h-[55%]"
            />
            <div className="flex items-center space-x-4">
                <ReactCountryFlag
                    className="emojiFlag"
                    countryCode={person.countryIso2?.toUpperCase()}
                    style={{
                        fontSize: "2em",
                    }}
                />
                <a
                    className="text-2xl font-bold text-neutral-300"
                    href={`${WCA_ORIGIN}/persons/${person.wcaId}`}
                    target="_blank"
                >
                    {person.wcaId}
                </a>
            </div>
            <div className="flex flex-col gap-4 items-center sm:w-[50%] w-full px-2 overflow-auto">
                <ResultsTable resultsByCompetition={resultsByCompetition} />
            </div>
        </>
    );
};

export default Person;
