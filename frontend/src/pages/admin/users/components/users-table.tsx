import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { User } from "@/lib/interfaces";

import UsersTableRow from "./users-table-row";

interface UsersTableProps {
    users: User[];
    fetchData: () => void;
}

const UsersTable = ({ users, fetchData }: UsersTableProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <UsersTableRow
                        key={user.id}
                        user={user}
                        fetchData={fetchData}
                    />
                ))}
            </TableBody>
        </Table>
    );
};

export default UsersTable;
