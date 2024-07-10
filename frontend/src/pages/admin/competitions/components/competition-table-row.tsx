import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { syncWcif } from "@/lib/competitions";
import { Competition } from "@/lib/interfaces";
import { toast } from "react-hot-toast";

interface CompetitionTableRowProps {
    competition: Competition;
}

const CompetitionTableRow = ({
    competition,
}: CompetitionTableRowProps) => {

    const handleSync = async () => {
        const status = await syncWcif(competition.id);
        if (status === 200) {
            toast.success("Competition synced successfully");
        } else {
            toast.error("Something went wrong");
        }
    };
    return (
        <TableRow>
            <TableCell>{competition.wcaId}</TableCell>
            <TableCell>{competition.name}</TableCell>
            <TableCell>
                {competition.events.map((eventId) => (
                    <span className={`cubing-icon event-${eventId}`} />
                ))}
            </TableCell>
            <TableCell>{competition.isPublic ? "Yes" : "No"}</TableCell>
            <TableCell>
                <Button onClick={handleSync}>
                    Sync with WCA
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default CompetitionTableRow;