import { t } from "i18next";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Person } from "@/lib/interfaces";
import { WCA_ORIGIN } from "@/lib/request";

interface RankingTableProps {
    persons: Person[];
}

const RankingTable = ({ persons }: RankingTableProps) => {
    return (
        <Table className="bg-slate-900 bg-opacity-70">
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center">
                        {t("position")}
                    </TableHead>
                    <TableHead className="text-center">{t("name")}</TableHead>
                    <TableHead className="text-center">{t("wcaId")}</TableHead>
                    <TableHead className="text-center">{t("score")}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {persons.map((person: Person, position: number) => {
                    if (
                        position > 0 &&
                        person.score === persons[position - 1].score
                    ) {
                        position = position - 1;
                    }
                    return (
                        <TableRow key={person.competitor.id}>
                            <TableCell>{position + 1}</TableCell>
                            <TableCell>{person.competitor.name}</TableCell>
                            <TableCell>
                                {person.competitor.wcaId && (
                                    <a
                                        href={`${WCA_ORIGIN}/persons/${person.competitor.wcaId}`}
                                        target="_blank"
                                    >
                                        {person.competitor.wcaId}
                                    </a>
                                )}
                            </TableCell>
                            <TableCell>{person.score}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default RankingTable;
