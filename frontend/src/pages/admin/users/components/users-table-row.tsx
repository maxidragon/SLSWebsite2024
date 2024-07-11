import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { User } from "@/lib/interfaces";
import { deleteUser } from "@/lib/users";

import EditUserModal from "./edit-user-modal";

interface UsersTableRowProps {
    user: User;
    fetchData: () => void;
}

const UsersTableRow = ({ user, fetchData }: UsersTableRowProps) => {
    const [isOpenEditUserModal, setIsOpenEditUserModal] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        const response = await deleteUser(user.id);
        if (response === 204) {
            toast.success("User deleted successfully");
            fetchData();
        } else {
            toast.error("Something went wrong");
        }
    };

    const handleCloseEditUserModal = () => {
        setIsOpenEditUserModal(false);
        fetchData();
    };

    return (
        <>
            <TableRow>
                <TableCell>{user.username}</TableCell>
                <TableCell className="flex gap-2">
                    <Button onClick={() => setIsOpenEditUserModal(true)}>
                        Edit
                    </Button>
                    <Button onClick={handleDelete} variant="destructive">
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
            <EditUserModal
                isOpen={isOpenEditUserModal}
                handleClose={handleCloseEditUserModal}
                user={user}
            />
        </>
    );
};

export default UsersTableRow;
