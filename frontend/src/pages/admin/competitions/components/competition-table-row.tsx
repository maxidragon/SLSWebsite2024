import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { getEventName } from "@/lib/events";
import { Competition } from "@/lib/interfaces";

interface CompetitionTableRowProps {
    competition: Competition;
}

const CompetitionTableRow = ({ competition }: CompetitionTableRowProps) => {
    const navigate = useNavigate();

    return (
        <TableRow
            onClick={() => navigate(`/admin/competitions/${competition.id}`)}
            className="cursor-pointer"
        >
            <TableCell>{competition.wcaId}</TableCell>
            <TableCell>{competition.name}</TableCell>
            <TableCell>
                {competition.events.map((eventId) => (
                    <span
                        className={`cubing-icon event-${eventId}`}
                        title={getEventName(eventId)}
                        key={eventId}
                    />
                ))}
            </TableCell>
            <TableCell>{competition.isPublic ? "Yes" : "No"}</TableCell>
            <TableCell className="flex gap-2">
                <Button
                    onClick={() =>
                        navigate(`/admin/competitions/${competition.id}`)
                    }
                >
                    Manage
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default CompetitionTableRow;
