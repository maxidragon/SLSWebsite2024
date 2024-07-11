import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table";
import { Competition } from "@/lib/interfaces";
import CompetitionTableRow from "./competition-table-row";

interface CompetitionsTableProps {
    competitions: Competition[];
    fetchData: () => void;
}

const CompetitionsTable = ({
    competitions,
    fetchData,
}: CompetitionsTableProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Events</TableHead>
                    <TableHead>Is public</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {competitions.map((competition) => (
                    <CompetitionTableRow competition={competition} key={competition.id} fetchData={fetchData} />
                ))}
            </TableBody>
        </Table>
    );
};

export default CompetitionsTable;
