import { t } from "i18next";

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import events from "@/lib/events";
import { ResultByCompetition } from "@/lib/interfaces";

import ResultRow from "./result-row";

interface ResultsTableProps {
    resultsByCompetition: ResultByCompetition[];
}

const ResultsTable = ({ resultsByCompetition }: ResultsTableProps) => {
    return (
        <Table className="bg-slate-900 bg-opacity-70">
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center">
                        {t("competition")}
                    </TableHead>
                    {events.map((event) => (
                        <TableHead key={event.id} className="text-center">
                            <span className={`cubing-icon event-${event.id}`} />
                        </TableHead>
                    ))}
                    <TableHead className="text-center">{t("score")}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {resultsByCompetition.map((result) => (
                    <ResultRow key={result.competition.id} result={result} />
                ))}
            </TableBody>
        </Table>
    );
};

export default ResultsTable;
