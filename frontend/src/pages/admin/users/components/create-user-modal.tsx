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
import { createUser } from "@/lib/users";

interface CreateUserModalProps {
    isOpen: boolean;
    handleClose: () => void;
}

const CreateUserModal = ({ isOpen, handleClose }: CreateUserModalProps) => {
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const response = await createUser(username, password);
        if (response.status === 201) {
            toast.success("User created successfully");
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
                        Create user
                    </DialogTitle>
                </DialogHeader>
                <form className="mt-3 w-fit" onSubmit={handleSubmit}>
                    <div className={"mb-4 flex w-full flex-col space-y-2"}>
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            name="username"
                            placeholder="Username"
                        />
                    </div>
                    <div className={"mb-4 flex w-full flex-col space-y-2"}>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            type="password"
                        />
                    </div>
                    <Button type="submit" className="w-fit min-w-[20%]">
                        Create
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateUserModal;
