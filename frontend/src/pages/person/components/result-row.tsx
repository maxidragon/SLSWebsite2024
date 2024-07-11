import { TableCell, TableRow } from "@/components/ui/table";
import events from "@/lib/events";
import { ResultByCompetition } from "@/lib/interfaces";

interface ResultRowProps {
    result: ResultByCompetition;
}

const ResultRow = ({ result }: ResultRowProps) => {
    return (
        <TableRow key={result.competition.id}>
            <TableCell className="text-center">
                {result.competition.name}
            </TableCell>
            {events.map((event) => {
                const score = result.results.find(
                    (r) => r.eventId === event.id
                )?.score;
                return (
                    <TableCell key={event.id} className="text-center">
                        {score! >= 0 ? score : ""}
                    </TableCell>
                );
            })}
            <TableCell className="text-center">{result.score}</TableCell>
        </TableRow>
    );
};

export default ResultRow;
