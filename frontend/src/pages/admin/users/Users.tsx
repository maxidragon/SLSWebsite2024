import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { User } from "@/lib/interfaces";
import { getAllUsers } from "@/lib/users";

import CreateUserModal from "./components/create-user-modal";
import UsersTable from "./components/users-table";

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState(false);

    const fetchData = () => {
        getAllUsers().then((data) => setUsers(data));
    };

    const handleCloseCreateUserModal = () => {
        setIsOpenCreateUserModal(false);
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col w-[70%]">
            <Button
                className="w-fit"
                onClick={() => setIsOpenCreateUserModal(true)}
            >
                Create user
            </Button>
            <UsersTable users={users} fetchData={fetchData} />
            <CreateUserModal
                isOpen={isOpenCreateUserModal}
                handleClose={handleCloseCreateUserModal}
            />
        </div>
    );
};

export default Users;
