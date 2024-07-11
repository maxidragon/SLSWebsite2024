import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/lib/interfaces";
import { updateUser } from "@/lib/users";

interface EditUserModalProps {
    isOpen: boolean;
    handleClose: () => void;
    user: User;
}

const EditUserModal = ({ isOpen, handleClose, user }: EditUserModalProps) => {
    const [editedUser, setEditedUser] = useState<User>(user);
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const status = await updateUser(editedUser);
        if (status === 200) {
            toast.success("User updated successfully");
            handleClose();
        } else {
            toast.error("Something went wrong");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="overflow-hidden w-fit p-10">
                <DialogHeader className="pt-3">
                    <DialogTitle className="text-2xl font-bold">
                        Edit user
                    </DialogTitle>
                </DialogHeader>
                <form className="mt-3 w-fit" onSubmit={handleSubmit}>
                    <div className={"mb-4 flex w-full flex-col space-y-2"}>
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            value={editedUser.username}
                            onChange={(e) =>
                                setEditedUser({
                                    ...editedUser,
                                    username: e.target.value,
                                })
                            }
                            placeholder="Username"
                        />
                    </div>

                    <Button type="submit" className="w-fit min-w-[20%]">
                        Edit
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditUserModal;
